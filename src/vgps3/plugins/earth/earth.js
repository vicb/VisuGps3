/**
 * Copyright 2012 Victor Berchet
 *
 * This file is part of VisuGps3
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

/**
 * @fileoverview
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.earth.Earth');

goog.require('goog.async.Deferred');
goog.require('goog.net.jsloader');
goog.require('vgps3.IPlugin');
goog.require('vgps3.Map');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Trace');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.color');
goog.require('goog.Timer');
goog.require('goog.string.format');


/**
 *
 * @constructor
 * @implements {vgps3.IPlugin}
 */
vgps3.earth.Earth = function() {

  /**
  * @type {google.earth.GEPlugin} The GE plugin
  * @private
  */
  this.ge_;

  /**
  * @type {google.maps.Map} The google map
  * @private
  */
  this.gMap_;

  /**
   * @type {Element} The div hierarchy where the earth get rendered
   * @private
   */
  this.earthDom_;

  /**
  * @type {vgps3.Map} The vgps map
  * @private
  */
  this.vgps_;

  /**
  * @type {Object} The pilot location
  * @private
  */
  this.location_;

  /**
  * @type {Object} The pilot orientation
  * @private
  */
  this.orientation_;

  /**
   * @type {google.maps.MapTypeId|string} The current map type
   * @private
   */
  this.currentMapTypeId_;

  /**
  * @type {goog.async.Deferred} Triggered when the plugin is loaded
  * @private
  */
  this.pluginLoaded_ = new goog.async.Deferred();

  /**
   * @type {goog.async.Deferred} Triggered when the earth is first displayed
   * @private
   */
  this.mapCreated_ = new goog.async.Deferred();

  /**
   * @type {goog.debug.Logger} The logger
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.earth.Earth');

  if (google && google.load) {
    this.apiLoadHandler_();
  } else {
    goog.net.jsloader.load(vgps3.earth.LOADER_URL).addCallback(this.apiLoadHandler_, this);
  }
};


/**
 * @override
 */
vgps3.earth.Earth.prototype.init = function(vgps) {
  this.gMap_ = vgps.getGoogleMap();
  this.vgps_ = vgps;

  this.currentMapTypeId_ = this.gMap_.getMapTypeId();

  this.vgps_.addEventListener(
      vgps3.track.EventType.LOAD,
      goog.bind(this.trackLoadHandler_, this)
  );

  this.vgps_.addEventListener(
      vgps3.track.EventType.LOAD,
      goog.bind(this.trackSelectHandler_, this)
  );


  this.gMap_.mapTypes.set(vgps3.earth.MapTypeId.EARTH, vgps3.earth.EarthMapType_);

  this.pluginLoaded_.addCallback(
      function() {
        this.logger_.info('Google Earth API loaded');
        if (google.earth.isSupported()) {
          this.logger_.info('GE Plugin supported');
          this.gMap_.mapTypes.set(vgps3.earth.MapTypeId.EARTH, vgps3.earth.EarthMapType_);
          google.maps.event.addListener(
              this.gMap_,
              'maptypeid_changed',
              goog.bind(this.mapTypeChanged_, this)
          );
        }
      },
      this
  );
};

/**
 * @private
 */
vgps3.earth.Earth.prototype.mapTypeChanged_ = function() {
  if (this.gMap_.getMapTypeId() === vgps3.earth.MapTypeId.EARTH) {
    this.showEarth_();
  } else {
    //this.switchToMapView_();
  }

  if (this.mapCreated_.hasFired()) {
    // The map creation is asynchronous (@see google.earth.createInstance())
    this.currentMapTypeId_ = this.gMap_.getMapTypeId();
  }
};

/**
 * @private
 */
vgps3.earth.Earth.prototype.showEarth_ = function() {
  if (!goog.isDef(this.ge_)) {
    this.createEarthControl_();
  }

}

/**
 * Add a google maps control to host the earth view.
 *
 * @private
 */
vgps3.earth.Earth.prototype.createEarthControl_ = function() {
  var that = this;

  this.earthDom_ = goog.dom.createDom('div', { index: 0 });
  goog.style.setStyle(this.earthDom_, {
    position: 'absolute',
    width: 0,
    height: 0
  });

  var inner = goog.dom.createElement('div');
  goog.style.setStyle(inner, {
    width: goog.style.getSize(/** @type {Element} */(this.gMap_.getDiv())).width + 'px',
    height: goog.style.getSize(/** @type {Element} */(this.gMap_.getDiv())).height + 'px',
    position: 'absolute'
  });

  goog.dom.appendChild(this.earthDom_, inner);

  var earthDiv = goog.dom.createElement('div');
  goog.style.setStyle(earthDiv, {
    width: '100%',
    height: '100%',
    position: 'absolute'
  });

  goog.dom.appendChild(inner, earthDiv);

  // todo does not work
  google.maps.event.addListener(this.gMap_, 'resize', function() {
    goog.style.setStyle(inner, {
      width: goog.style.getSize(/** @type {Element} */(that.gMap_.getDiv())).width + 'px',
      height: goog.style.getSize(/** @type {Element} */(that.gMap_.getDiv())).height + 'px'
    });
  });

  this.gMap_.controls[google.maps.ControlPosition.TOP_LEFT].push(this.earthDom_);

  this.logger_.info('Starting the GE Plugin');
  google.earth.createInstance(
      earthDiv,
      /**
       * @param {google.earth.GEPlugin} ge
       * @notypecheck
       */
      function(ge) {
        that.logger_.info('GE Plugin started');
        that.ge_ = /** @type {google.earth.GEPlugin} */(ge);
        ge.getWindow().setVisibility(true);
//        google.earth.addEventListener(
//            ge.getWindow(),
//            'mousedown',
//            goog.bind(that.clickHandler_, that)
//        );
        var navControl = ge.getNavigationControl();
        navControl.setVisibility(ge.VISIBILITY_AUTO);
        var screen = navControl.getScreenXY();
        screen.setYUnits(ge.UNITS_INSET_PIXELS);
        screen.setXUnits(ge.UNITS_PIXELS);
        // BUG: must wait a little before using the plugin !
        goog.Timer.callOnce(goog.bind(that.mapCreated_.callback, that.mapCreated_), 100);
      },
      function(error) {
        that.logger_.severe('GE Plugin failed to start: ' + error);
        that.gMap_.setMapTypeId(that.currentMapTypeId_);
      }
  );
}


/**
 *
 * @param {number} position [0...1].
 * @notypecheck
 */
vgps3.earth.Earth.prototype.moveTo = function(position) {
  var trackIdx = Math.round((this.fixes_.nbTrackPt - 1) * position),
      nextIdx = Math.min(this.track_.nbTrackPt - 1, trackIdx + 1),
      deltaLat = this.track_.lat[nextIdx] - this.track_.lat[trackIdx],
      deltaLon = this.track_.lon[nextIdx] - this.track_.lon[trackIdx],
      angle;


  this.location_.setLatLngAlt(
      this.track_.lat[trackIdx],
      this.track_.lon[trackIdx],
      this.track_.elev[Math.round((this.track_.nbChartPt - 1) * position)]
  );

  if (0 === deltaLon) {
    angle = deltaLat > 0 ? Math.PI / 2 : 3 * Math.PI / 2;
  } else {
    angle = Math.atan(deltaLat / deltaLon);
    if (deltaLon < 0) {
      angle += Math.PI;
    }
  }
  // Convert angle (radian) to heading (degree, 0deg = North)
  angle = angle * 180 / Math.PI;
  angle = 90 - angle;
  // Apply model origin (255deg)
  angle = angle + 255;
  if (angle < 0) angle += 360;
  if (angle > 360) angle -= 360;
  this.orientation_.setHeading(angle);
};


/**
 * @param {Object} event
 *
 * @private
 * @notypecheck
 */
vgps3.earth.Earth.prototype.clickHandler_ = function(event) {
  // todo: trigger a click event (and remove the public click())
  //google.maps.event.trigger(overlay, 'click');
  //this.vgps_.click(new google.maps.LatLng(event.getLatitude(), event.getLongitude()));
//  var mdEvent = new google.maps.MouseEvent();
//  mdEvent.latLng = new google.maps.LatLng(event.getLatitude(), event.getLongitude());
//  google.maps.event.trigger(
//      this.gMap_,
//      'mousedown',
//      mdEvent
//  );
//  var lookAt = this.ge.getView().copyAsLookAt(this.ge.ALTITUDE_ABSOLUTE);
//  lookAt.setLatitude(this.track.lat[idx]);
//  lookAt.setLongitude(this.track.lon[idx]);
//  this.ge.getView().setAbstractView(lookAt);
};


/**
 * @param {vgps3.track.LoadEvent} event
 *
 * @private
 * @notypecheck
 */
vgps3.earth.Earth.prototype.trackLoadHandler_ = function(event) {
  var fixes = event.track,
      index = event.index,
      color = event.color,
      that = this;
  this.logger_.info(goog.string.format('Track[%d] loaded', index));
  this.mapCreated_.addCallback(goog.partial(this.displayTrack_, index, fixes, color), this);

};

/**
 * @param {vgps3.track.TrackSelectEvent} event
 *
 * @private
 * @notypecheck
 */
vgps3.earth.Earth.prototype.trackSelectHandler_ = function(event) {
  var that = this;

  this.logger_.info(goog.string.format('Track[%d] selected', event.index));

  this.mapCreated_.addCallback(function() {
      if (!goog.isDef(this.orientation_)) {
        this.logger_.info(goog.string.format('Creating 3D model', event.index));
        var placemark = this.ge_.createPlacemark('model');
        var model = this.ge_.createModel('');
        placemark.setGeometry(model);
        var link = this.ge_.createLink('');
        link.setHref(vgps3.earth.MODEL_URL)
        model.setLink(link);
        model.setLocation(this.location_);
        model.setOrientation(this.orientation_ = this.ge_.createOrientation(''));
        var scale = this.ge_.createScale('');
        scale.set(50, 50, 50);
        model.setScale(scale);
        model.setAltitudeMode(this.ge_.ALTITUDE_ABSOLUTE);
        this.ge_.getFeatures().appendChild(placemark);
      }
    },
    this
  );
};

/**
 * @param {number} index
 * @param {vgps3.track.GpsFixes} fixes
 * @param {string} color
 * @private
 * @notypecheck
 */
vgps3.earth.Earth.prototype.displayTrack_ = function(index, fixes, color) {
  var that = this;

  this.logger_.info(goog.string.format('Displaying track[%d]', index));

  var lineString = this.ge_.createLineString('track-' + index),
      lineStringPm = this.ge_.createPlacemark('');

  lineStringPm.setGeometry(lineString);
  lineString.setTessellate(false);

  if (!goog.isDef(this.location_)) {
    // Location where to first display the 3D model
    this.location_ = this.ge_.createLocation('');
    this.location_.setLatitude(fixes.lat[0]);
    this.location_.setLongitude(fixes.lon[0]);
    this.location_.setAltitude(fixes.elev[0]);
    // fly to this location
    var lookAt = this.ge_.getView().copyAsLookAt(this.ge_.ALTITUDE_ABSOLUTE);
    var range = Math.pow(2, vgps3.earth.MAX_EARTH_ZOOM_ - 12);
    lookAt.setRange(range);
    lookAt.setLatitude(fixes.lat[0]);
    lookAt.setLongitude(fixes.lon[0]);
    lookAt.setHeading(0);
    lookAt.setAltitude(fixes.elev[0]);
    lookAt.setTilt(45);
    this.ge_.getView().setAbstractView(lookAt);
  }

  google.earth.executeBatch(this.ge_, function() {
    var points = lineString.getCoordinates();
    var getElevation = goog.bind(that.estimateElevation_, that, (fixes.nbChartPt - 1) / (fixes.nbTrackPt - 1));
    for (var i = 0; i < fixes.nbTrackPt; i++) {
      points.pushLatLngAlt(fixes.lat[i], fixes.lon[i], getElevation(fixes, i));
    }
  });

  this.ge_.getFeatures().appendChild(lineStringPm);
  lineString.setAltitudeMode(this.ge_.ALTITUDE_ABSOLUTE);

  lineStringPm.setStyleSelector(this.ge_.createStyle(''));
  var lineStyle = lineStringPm.getStyleSelector().getLineStyle();
  lineStyle.setWidth(2);
  // color format: aabbggrr
  lineStyle.getColor().set(goog.color.parse(color).hex.replace(/#(..)(..)(..)/, 'ff$3$2$1'));
};

/**
 * Interpolates the elevation for the given position
 * @param {number} factor The ratio elevation points / track points
 * @param {vgps3.track.GpsFixes} fixes
 * @param {number} index [0...fixes.nbTrackPt]
 * @return {number}
 * @private
 */
vgps3.earth.Earth.prototype.estimateElevation_ = function(factor, fixes, index) {
  index = index * factor;
  var chartIndex = Math.round(index),
      nextChartIndex = chartIndex + 1 < fixes.nbTrackPt ? chartIndex + 1 : chartIndex;
  return fixes.elev[chartIndex] + (index - chartIndex) * (fixes.elev[nextChartIndex] - fixes.elev[chartIndex]);
};

/**
 * @private
 */
vgps3.earth.Earth.prototype.apiLoadHandler_ = function() {
  this.logger_.info('Loading google earth JS API');
  google.load('earth', '1', { callback: goog.bind(this.pluginLoaded_.callback, this.pluginLoaded_) });
};

/**
 * @type {google.maps.MapType}
 * @const
 * @private
 */
vgps3.earth.EarthMapType_ = /** @type {google.maps.MapType} */ {
  tileSize: new google.maps.Size(256, 256),
  maxZoom: 19,
  name: 'Earth',
  alt: 'Earth',
  getTile: function(tileCoord, zoom, ownerDocument) {
    var div = ownerDocument.createElement('div');
    return div;
  }
};

/**
 * @define {string}
 */
vgps3.earth.LOADER_URL = 'https://www.google.com/jsapi';

/**
 * @define {string}
 */
// todo
vgps3.earth.MODEL_URL = 'http://victorb.fr/visugps/img/paraglider.dae';


/**
 * @const
 * @private
 * @type {number}
 */
vgps3.earth.MAX_EARTH_ZOOM_ = 27;

/**
 * @enum {string}
 */
vgps3.earth.EventType = {
  CLICK: 'vgps3.earth.click'
};

/**
 * @enum {string}
 */
vgps3.earth.MapTypeId = {
  EARTH: 'vgps3-earth-3d'
};