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
 * Some code is inspired by the Earth API library for Maps v3 authored by Josh Livni:
 * http://code.google.com/p/google-maps-utility-library-v3/source/browse/trunk/googleearth/src/googleearth.js
 */

goog.provide('vgps3.earth.Earth');

goog.require('goog.async.Deferred');
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
goog.require('goog.array');
goog.require('vgps3.loader');



/**
 *
 * @constructor
 * @implements {vgps3.IPlugin}
 */
vgps3.earth.Earth = function() {

  /**
  * @type {GEPlugin} The GE plugin
  * @private
  */
  this.ge_;

  /**
   * @type {vgps3.Map} The vgps map
   * @private
   */
  this.vgps_;

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
   * @type {number} The current track index
   * @private
   */
  this.currentTrackIndex_;

  /**
   * @type {goog.async.Deferred} Triggered when the earth is first displayed
   * @private
   */
  this.mapCreated_ = new goog.async.Deferred(null, this);

  /**
   * @type {goog.async.Deferred} Triggered when the first track has been added
   * @private
   */
  this.trackAdded_ = new goog.async.Deferred(null, this);

  /**
   * @type {Element} The earth map selection control div
   * @private
   */
  this.mapControlDiv_;

  /**
   * @type {Node} Iframe shim used to overlay the map control on top of the GE plugin
   * @private
   */
  this.shim_;

  /**
   * @type {KmlEvent} Mouse down event used to discriminate click vs drag
   * @private
   */
  this.downEvent_;

  /**
   * @type {boolean} Whether the earth is visible
   * @private
   */
  this.visible_;

  /**
   * @type {goog.debug.Logger} The logger
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.earth.Earth');
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

  vgps3.loader.load('earth', 1, vgps3.earth.geApiLoaded_);

  vgps3.earth.geApiLoaded_.addCallback(
      function() {
        this.logger_.info('Google Earth API loaded');
        if (google.earth.isSupported()) {
          this.logger_.info('GE Plugin supported');
          this.gMap_.mapTypes.set(vgps3.earth.MapTypeId.EARTH, vgps3.earth.EarthMapType_);
          google.maps.event.addListener(
            this.gMap_,
            'maptypeid_changed',
            goog.bind(this.mapTypeChangeHandler_, this)
          );
        }
      },
      this
  );
};

/**
 * Shows the plugin when the earth map type is selected.
 *
 * @private
 */
vgps3.earth.Earth.prototype.mapTypeChangeHandler_ = function() {
  if (this.gMap_.getMapTypeId() === vgps3.earth.MapTypeId.EARTH) {
    if (!goog.isDef(this.ge_)) {
      vgps3.loadMask.setMessage('Chargement de Google Earth');
      this.mapCreated_.addCallback(goog.partial(vgps3.loadMask.setMessage, 'Chargement de la trace'));
      this.trackAdded_.addCallback(vgps3.loadMask.close);
      this.createEarth_();
    }
    this.mapCreated_.addCallback(function() {
      this.currentMapTypeId_ = this.gMap_.getMapTypeId();
      this.visible_ = true;
    });
    goog.style.showElement(this.earthDom_, true);
    this.showControls_(true);
  } else {
    this.visible_ = false;
    this.showControls_(false);
    goog.style.showElement(this.earthDom_, false);
    this.currentMapTypeId_ = this.gMap_.getMapTypeId();
  }
};

/**
 * Makes the map type controls available when the GE plugin is in use.
 *
 * @param {boolean} show
 * @private
 */
vgps3.earth.Earth.prototype.showControls_ = function(show) {
  if (show) {
    // Sets the z-index of all controls except for the map type control so that they appear behind Earth.
    var oldIndex = this.mapControlDiv_.style.zIndex;
    // Sets the zIndex of all controls to be behind Earth
    goog.array.forEach(this.earthDom_.parentNode.childNodes, function(sibling) {
      sibling['__gme_ozi'] = sibling.style.zIndex;
      sibling.style.zIndex = -10;
    });
    this.mapControlDiv_['__gme_ozi'] = oldIndex;
    this.earthDom_.style.zIndex = -1;
    this.mapControlDiv_.style.zIndex = 0;
    // Create a shim so that controls appear in front of the plugin
    if (!goog.isDef(this.shim_)) {
      this.shim_ = goog.dom.createDom('iframe', {src: 'javascript:false;', scrolling: 'no', frameBorder: 0});
      goog.style.setStyle(this.shim_, {zIndex: -100000, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0});
      goog.dom.appendChild(this.mapControlDiv_, this.shim_);
    }
  } else {
    // Restore saved zIndexes
    goog.array.forEach(this.earthDom_.parentNode.childNodes, function(sibling) {
      sibling.style.zIndex = sibling['__gme_ozi'];
    });
  }
};

/**
 * Adds a google maps control to host the earth view and start the plugin on supported platforms.
 *
 * @private
 */
vgps3.earth.Earth.prototype.createEarth_ = function() {
  var that = this;

  var earthDiv = goog.dom.createElement('div');
  goog.style.setStyle(earthDiv, { width: '100%', height: '100%', position: 'absolute' });
  var inner = goog.dom.createDom('div', null, earthDiv);
  goog.style.setStyle(inner, {position: 'absolute'});
  goog.style.setSize(inner, goog.style.getSize(/** @type {Element} */(that.gMap_.getDiv())));
  this.earthDom_ = goog.dom.createDom('div', {index: 0}, inner);
  goog.style.setStyle(this.earthDom_, { position: 'absolute', width: 0, height: 0, zIndex: 0 });
  this.gMap_.controls[google.maps.ControlPosition.TOP_LEFT].push(this.earthDom_);

  google.maps.event.addListener(this.gMap_, 'resize', function() {
    goog.style.setSize(inner, goog.style.getSize(/** @type {Element} */(that.gMap_.getDiv())));
  });

  var title = 'title=[\'\"]?' + vgps3.earth.TITLE_ + '[\"\']?';
  var regex = new RegExp(title);
  this.mapControlDiv_ = goog.array.find(this.earthDom_.parentNode.childNodes, function(sibling) {
    return regex.test(sibling.innerHTML);
  });

  this.logger_.info('Starting the GE Plugin');
  google.earth.createInstance(
      earthDiv,
      /**
       * @param {GEPlugin} ge
       */
      function(ge) {
        that.logger_.info('GE Plugin started');
        that.ge_ = /** @type {GEPlugin} */(ge);
        that.installClickHandler_();
        google.earth.executeBatch(ge, function() {
          ge.getWindow().setVisibility(true);
          var navControl = ge.getNavigationControl();
          navControl.setVisibility(ge.VISIBILITY_AUTO);
          var screen = navControl.getScreenXY();
          screen.setYUnits(ge.UNITS_INSET_PIXELS);
          screen.setXUnits(ge.UNITS_PIXELS);
          // BUG: wait before using the ge plugin
          // Note: Trust me, do not play too much with this init code !
          goog.Timer.callOnce(that.mapCreated_.callback, 100, that.mapCreated_);
        })
      },
      /**
       * @param {string} error
       */
      function(error) {
        vgps3.loadMask.close();
        if (google.earth.isInstalled()) {
          that.logger_.severe('GE Plugin failed to start: ' + error);
          that.gMap_.setMapTypeId(that.currentMapTypeId_);
        }
      }
  );
}

/**
 * Moves the pilot to the given location.
 *
 * @param {number} position [0...1].
 * @param {boolean=} opt_setCenter Whether to center the view
 * @param {number=} opt_zoomOffset Zoom direction
 */
vgps3.earth.Earth.prototype.moveTo = function(position, opt_setCenter, opt_zoomOffset) {
  if (!this.visible_) {
    return;
  }

  this.trackAdded_.addCallback(function() {
      // Return if the earth is not currently visible or if no track is currently selected
      if (!goog.isDef(this.currentTrackIndex_) || vgps3.earth.MapTypeId.EARTH !== this.currentMapTypeId_) {
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
        that.orientation_.setHeading(goog.math.standardAngle(heading + vgps3.earth.MODEL_ORIGIN_ANGLE));

        if (opt_setCenter) {
          var lookAt = that.ge_.getView().copyAsLookAt(that.ge_.ALTITUDE_ABSOLUTE);
          lookAt.setLatitude(location.getLatitude());
          lookAt.setLongitude(location.getLongitude());
          lookAt.setAltitude(location.getAltitude());
          that.ge_.getView().setAbstractView(lookAt);
        }

        if (opt_zoomOffset) {
          var lookAt = that.ge_.getView().copyAsLookAt(that.ge_.ALTITUDE_ABSOLUTE);
          lookAt.setRange(Math.pow(2, opt_zoomOffset) * lookAt.getRange());
          that.ge_.getView().setAbstractView(lookAt);
        }
      });
    }
  );
};

/**
 * Installs the click handler.
 *
 * The click handle is able to discriminate click and drag events.
 *
 * @private
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
 * Triggers a click on the google map when the earth gets clicked.
 *
 * @param {Object} event
 *
 * @private
 */
vgps3.earth.Earth.prototype.clickHandler_ = function(event) {
  var mdEvent = {
    latLng: new google.maps.LatLng(event.getLatitude(), event.getLongitude()),
    stop: goog.functions.NULL
  };
  google.maps.event.trigger(this.gMap_, 'click', mdEvent);
};


/**
 * Displays a track once it has been loaded.
 *
 * @param {vgps3.track.LoadEvent} event
 *
 * @private
 */
vgps3.earth.Earth.prototype.trackLoadHandler_ = function(event) {
  var fixes = event.fixes,
      index = event.trackIndex,
      color = event.trackColor;

  this.logger_.info(goog.string.format('Track[%d] loaded', index));
  this.mapCreated_.addCallback(goog.partial(this.displayTrack_, index, fixes, color), this);

};


/**
 * Sets tracks color when a track gets selected.
 *
 * @param {vgps3.track.TrackSelectEvent} event
 *
 * @private
 */
vgps3.earth.Earth.prototype.trackSelectHandler_ = function(event) {
  this.logger_.info(goog.string.format('Track[%d] selected', event.trackIndex));

  this.currentTrackIndex_ = event.trackIndex;

  this.trackAdded_.addCallback(function() {
      var that = this;
      // Create the 3D model
      if (!goog.isDef(this.orientation_)) {
        this.logger_.info('Creating 3D model');
        google.earth.executeBatch(this.ge_, function() {
          var placemark = that.ge_.createPlacemark('modelPm');
          var model = that.ge_.createModel('model');
          placemark.setGeometry(model);
          var link = that.ge_.createLink('link');
          link.setHref(vgps3.earth.MODEL_URL)
          model.setLink(link);
          model.setLocation(that.location_);
          that.orientation_ = that.ge_.createOrientation('orient')
          model.setOrientation(that.orientation_);
          var scale = that.ge_.createScale('');
          scale.set(5, 5, 5);
          model.setScale(scale);
          model.setAltitudeMode(that.ge_.ALTITUDE_ABSOLUTE);
          that.ge_.getFeatures().appendChild(placemark);
        });
      }
      // Set tracks style
      google.earth.executeBatch(this.ge_, function() {
        var trackIdx = event.trackIndex,
            previousTrackIndex = event.previousTrackIndex,
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
    }
  );
};

/**
 * Displays a track on the earth map.
 *
 * Note: Using several batches as a single big one would not work.
 *
 * @param {number} trackIndex The track index
 * @param {vgps3.track.GpsFixes} fixes
 * @param {string} trackColor
 * @private
 */
vgps3.earth.Earth.prototype.displayTrack_ = function(trackIndex, fixes, trackColor) {
  var that = this,
      lineString = that.ge_.createLineString('track-' + trackIndex),
      lineStringPm = that.ge_.createPlacemark('trackPm-' + trackIndex),
      getElevation = goog.bind(that.estimateElevation_, that, (fixes['nbChartPt'] - 1) / (fixes['nbTrackPt'] - 1)),
      elev = [];

  this.logger_.info(goog.string.format('Displaying track[%d]', trackIndex));

  lineStringPm.setGeometry(lineString);
  lineString.setTessellate(true);

  for (var i = 0; i < fixes['nbTrackPt']; i++) {
    elev[i] = getElevation(fixes, i);
  }

  google.earth.executeBatch(this.ge_, function() {
    var points = lineString.getCoordinates();
    for (var i = 0; i < fixes['nbTrackPt']; i++) {
      points.pushLatLngAlt(fixes['lat'][i], fixes['lon'][i], elev[i]);
    }
  });

  google.earth.executeBatch(this.ge_, function() {
    that.ge_.getFeatures().appendChild(lineStringPm);
    lineString.setAltitudeMode(that.ge_.ALTITUDE_ABSOLUTE);

    lineStringPm.setStyleSelector(that.ge_.createStyle('trackStyle-' + trackIndex));
    var lineStyle = lineStringPm.getStyleSelector().getLineStyle();
    lineStyle.setWidth(2);
    // color format: aabbggrr
    lineStyle.getColor().set(goog.color.parse(trackColor).hex.replace(/^#(..)(..)(..)/, '7f$3$2$1'));
  });

  this.logger_.info(goog.string.format('Track[%d] added', trackIndex));

  if (!goog.isDef(that.location_)) {
    that.location_ = null;
    google.earth.executeBatch(this.ge_, function() {
      // Location where to first display the 3D model
      that.ge_.getOptions().setFlyToSpeed(that.ge_.SPEED_TELEPORT);
      that.ge_.getOptions().setScaleLegendVisibility(true);
      that.location_ = that.ge_.createLocation('');
      that.location_.setLatitude(fixes['lat'][0]);
      that.location_.setLongitude(fixes['lon'][0]);
      that.location_.setAltitude(fixes['elev'][0]);
      // fly to that location
      var lookAt = that.ge_.getView().copyAsLookAt(that.ge_.ALTITUDE_ABSOLUTE);
      lookAt.setRange(Math.pow(2, vgps3.earth.MAX_EARTH_ZOOM_ - 14));
      lookAt.setLatitude(fixes['lat'][0]);
      lookAt.setLongitude(fixes['lon'][0]);
      lookAt.setHeading(0);
      lookAt.setAltitude(fixes['elev'][0]);
      lookAt.setTilt(80);
      that.ge_.getView().setAbstractView(lookAt);
    });
    goog.Timer.callOnce(that.trackAdded_.callback, 10, that.trackAdded_);
  }
};

/**
 * Interpolates the elevation for the given position.
 *
 * @param {number} factor The ratio (elevation samples - 1) / (track samples -1)
 * @param {vgps3.track.GpsFixes} fixes
 * @param {number} index [0...fixes['nbTrackPt']]
 * @return {number} The elevation
 * @private
 */
vgps3.earth.Earth.prototype.estimateElevation_ = function(factor, fixes, index) {
  index *=  factor;
  var chartIndex = Math.round(index),
      nextChartIndex = chartIndex + 1 < fixes['nbTrackPt'] ? chartIndex + 1 : chartIndex;
  return fixes['elev'][chartIndex] + (index - chartIndex) * (fixes['elev'][nextChartIndex] - fixes['elev'][chartIndex]);
};

/**
 * @type {string}
 * @const
 * @private
 */
vgps3.earth.TITLE_ = "Earth3D";

/**
 * @type {google.maps.MapType}
 * @const
 * @private
 */
vgps3.earth.EarthMapType_ = /** @type {google.maps.MapType} */ {
  tileSize: new google.maps.Size(256, 256),
  maxZoom: 19,
  name: vgps3.earth.TITLE_,
  alt: vgps3.earth.TITLE_,
  getTile: function(tileCoord, zoom, ownerDocument) {
    var div = ownerDocument.createElement('div');
    return div;
  }
};

/**
 * @define {string}
 */
vgps3.earth.MODEL_URL = 'http://victorb.fr/visugps/img/paraglider.dae';

/**
 * @define {number}
 */
vgps3.earth.MODEL_ORIGIN_ANGLE = 255;

/**
 * @const
 * @private
 * @type {number}
 */
vgps3.earth.MAX_EARTH_ZOOM_ = 27;

/**
 * @type {goog.async.Deferred} Triggered when the plugin is loaded
 * @private
 */
vgps3.earth.geApiLoaded_ = new goog.async.Deferred();

/**
 * @enum {string}
 */
vgps3.earth.MapTypeId = {
  EARTH: 'vgps3-earth-3d'
};

goog.exportSymbol('vgps3.earth.Earth', vgps3.earth.Earth);
goog.exportSymbol('vgps3.earth.Earth.init', vgps3.earth.Earth.prototype.init);
