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
 * @fileoverview Google Earth integration on top of google Maps
 * @author Victor Berchet <victor@suumit.com>
 *
 * @note some code is inspired by the Earth API library for Maps v3 authored by Josh Livni:
 * http://code.google.com/p/google-maps-utility-library-v3/source/browse/trunk/googleearth/src/googleearth.js
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
goog.require('goog.math');
goog.require('goog.functions');


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
   * @type {number}
   * @private
   */
  this.currentTrackIndex_;

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
   * @type {goog.async.Deferred} Triggered when the first track has been added
   * @private
   */
  this.trackAdded_ = new goog.async.Deferred();

  /**
   * Mouse down event used to discriminate click vs drag
   * @private
   */
  this.downEvent_;

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

  this.vgps_.addEventListener(vgps3.track.EventType.LOAD, goog.bind(this.trackLoadHandler_, this));
  this.vgps_.addEventListener(vgps3.track.EventType.SELECT, goog.bind(this.trackSelectHandler_, this));

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
    this.mapCreated_.addCallback(function() {
        this.currentMapTypeId_ = this.gMap_.getMapTypeId();
      },
      this
    );
  } else {
    //this.switchToMapView_();
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
  goog.style.showElement(this.earthDom_, true);
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
        that.installClickHandler_();
        google.earth.executeBatch(ge, function() {
          ge.getWindow().setVisibility(true);
          var navControl = ge.getNavigationControl();
          navControl.setVisibility(ge.VISIBILITY_AUTO);
          var screen = navControl.getScreenXY();
          screen.setYUnits(ge.UNITS_INSET_PIXELS);
          screen.setXUnits(ge.UNITS_PIXELS);
          // BUG: must wait a little before using the plugin !
          goog.Timer.callOnce(goog.bind(that.mapCreated_.callback, that.mapCreated_), 100);
        })
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
 * @param {boolean=} setCenter
 * @param {number=} zoomOffset
 * @notypecheck
 */
vgps3.earth.Earth.prototype.moveTo = function(position, setCenter, zoomOffset) {
  this.trackAdded_.addCallback(function() {
      // Return if the earth is not currently visible or if no track is currently selected
        this.logger_.log(goog.string.format('mt %d %s', this.currentTrackIndex_, this.currentMapTypeId_));
      if (!(goog.isDef(this.currentTrackIndex_) && vgps3.earth.MapTypeId.EARTH === this.currentMapTypeId_)) {
        return;
      }
      var that = this;
      google.earth.executeBatch(this.ge_, function() {
        var kmlLine = that.ge_.getElementById('track-' + that.currentTrackIndex_),
            kmlCoordinates = kmlLine.getCoordinates(),
            lineMaxIndex = kmlCoordinates.getLength() - 1,
            index = Math.round(position * lineMaxIndex),
            location = kmlCoordinates.get(index);

        that.location_.setLatLngAlt(location.getLatitude(), location.getLongitude(), location.getAltitude());

        var nextIndex = Math.min(index + 1, lineMaxIndex),
            nextLocation = kmlCoordinates.get(nextIndex),
            heading;

        heading = google.maps.geometry.spherical.computeHeading(
          new google.maps.LatLng(location.getLatitude(), location.getLongitude()),
          new google.maps.LatLng(nextLocation.getLatitude(), nextLocation.getLongitude())
        );

        // Apply model origin (255deg)
        that.orientation_.setHeading(goog.math.standardAngle(heading + 255));

        var lookAt = that.ge_.getView().copyAsLookAt(that.ge_.ALTITUDE_ABSOLUTE);

        if (setCenter) {
          lookAt.setLatitude(location.getLatitude());
          lookAt.setLongitude(location.getLongitude());
          lookAt.setAltitude(location.getAltitude());
        }

        if (zoomOffset) {
          lookAt.setRange(Math.pow(2, zoomOffset) * lookAt.getRange());
        }

        (setCenter || zoomOffset) && that.ge_.getView().setAbstractView(lookAt);
      });
    },
    this
  );
};

/**
 * @private
 * @notypecheck
 */
vgps3.earth.Earth.prototype.installClickHandler_ = function() {
  var that = this;

  google.earth.addEventListener(this.ge_.getWindow(), 'mousedown', function(e) {
    if (0 === e.getButton()) {
      that.downEvent_ = e;
    }
  });

  google.earth.addEventListener(this.ge_.getWindow(), 'mouseup', function(e) {
    if (0 === e.getButton()) {
      var de = that.downEvent_,
          distPx = Math.pow(2, de.getClientX() - e.getClientX()) + Math.pow(2, de.getClientY() - e.getClientY());
      if (distPx < 10 * 10) {
        that.clickHandler_.call(that, de);
      }
    }
  });
}

/**
 * @param {Object} event
 *
 * @private
 * @notypecheck
 */
vgps3.earth.Earth.prototype.clickHandler_ = function(event) {
  this.logger_.info(goog.string.format('Click %.5f %.5f', event.getLatitude(), event.getLongitude()));
  var mdEvent = {
    latLng: new google.maps.LatLng(event.getLatitude(), event.getLongitude()),
    stop: goog.functions.NULL
  };
  google.maps.event.trigger(this.gMap_, 'click', mdEvent);
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
  this.logger_.info(goog.string.format('Track[%d] selected', event.index));

  this.currentTrackIndex_ = event.index;

  this.trackAdded_.addCallback(function() {
      var that = this;
      // Create the 3D model
      if (!goog.isDef(this.orientation_)) {
        this.logger_.info(goog.string.format('Creating 3D model', event.index));
        google.earth.executeBatch(this.ge_, function() {
          var placemark = that.ge_.createPlacemark('model');
          var model = that.ge_.createModel('');
          placemark.setGeometry(model);
          var link = that.ge_.createLink('');
          link.setHref(vgps3.earth.MODEL_URL)
          model.setLink(link);
          model.setLocation(that.location_);
          model.setOrientation(that.orientation_ = that.ge_.createOrientation(''));
          var scale = that.ge_.createScale('');
          scale.set(50, 50, 50);
          model.setScale(scale);
          model.setAltitudeMode(that.ge_.ALTITUDE_ABSOLUTE);
          that.ge_.getFeatures().appendChild(placemark);
        });
      }
      // Set tracks style
      google.earth.executeBatch(this.ge_, function() {
        var trackIdx = event.index,
            previousTrackIndex = event.previousIndex,
            lineStyle;
        lineStyle = that.ge_.getElementById('trackStyle-' + trackIdx).getLineStyle();
        lineStyle.getColor().setA(256);
        lineStyle.setWidth(3);
        if (!goog.isNull(previousTrackIndex)) {
          lineStyle = that.ge_.getElementById('trackStyle-' + previousTrackIndex).getLineStyle();
          lineStyle.getColor().setA(128);
          lineStyle.setWidth(2);
        }
      });
    },
    this
  );
};

/**
 * Displays a track on the earth map.
 * Note: Using several batches as a single big one would not work.
 *
 * @param {number} index
 * @param {vgps3.track.GpsFixes} fixes
 * @param {string} color
 * @private
 * @notypecheck
 */
vgps3.earth.Earth.prototype.displayTrack_ = function(index, fixes, color) {
  var that = this,
      lineString = that.ge_.createLineString('track-' + index),
      lineStringPm = that.ge_.createPlacemark('trackPm-' + index);

  this.logger_.info(goog.string.format('Displaying track[%d]', index));

  lineStringPm.setGeometry(lineString);
  lineString.setTessellate(false);

  google.earth.executeBatch(this.ge_, function() {
    var points = lineString.getCoordinates();
    var getElevation = goog.bind(that.estimateElevation_, that, (fixes.nbChartPt - 1) / (fixes.nbTrackPt - 1));
    for (var i = 0; i < fixes.nbTrackPt; i++) {
      points.pushLatLngAlt(fixes.lat[i], fixes.lon[i], getElevation(fixes, i));
    }
  });

  google.earth.executeBatch(this.ge_, function() {
    that.ge_.getFeatures().appendChild(lineStringPm);
    lineString.setAltitudeMode(that.ge_.ALTITUDE_ABSOLUTE);

    lineStringPm.setStyleSelector(that.ge_.createStyle('trackStyle-' + index));
    var lineStyle = lineStringPm.getStyleSelector().getLineStyle();
    lineStyle.setWidth(2);
    // color format: aabbggrr
    lineStyle.getColor().set(goog.color.parse(color).hex.replace(/#(..)(..)(..)/, '7f$3$2$1'));
  });

  if (!goog.isDef(that.location_)) {
    that.location_ = null;
    google.earth.executeBatch(this.ge_, function() {
      // Location where to first display the 3D model
      that.location_ = that.ge_.createLocation('');
      that.location_.setLatitude(fixes.lat[0]);
      that.location_.setLongitude(fixes.lon[0]);
      that.location_.setAltitude(fixes.elev[0]);
      // fly to that location
      var lookAt = that.ge_.getView().copyAsLookAt(that.ge_.ALTITUDE_ABSOLUTE);
      var range = Math.pow(2, vgps3.earth.MAX_EARTH_ZOOM_ - 12);
      lookAt.setRange(range);
      lookAt.setLatitude(fixes.lat[0]);
      lookAt.setLongitude(fixes.lon[0]);
      lookAt.setHeading(0);
      lookAt.setAltitude(fixes.elev[0]);
      lookAt.setTilt(60);
      that.ge_.getView().setAbstractView(lookAt);
    });
    that.trackAdded_.callback();
  }
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
vgps3.earth.MapTypeId = {
  EARTH: 'vgps3-earth-3d'
};