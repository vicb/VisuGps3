/**
 * Copyright Victor Berchet
 *
 * This file is part of VisuGps3
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

/**
 * @fileoverview Google Earth integration on top of google Maps.
 * @author Victor Berchet <victor@suumit.com>
 *
 * Some code is inspired by the Earth API library for Maps v3 authored by Josh Livni:
 * http://code.google.com/p/google-maps-utility-library-v3/source/browse/trunk/googleearth/src/googleearth.js
 */

goog.provide('vgps3.earth.Earth');

goog.require('goog.Timer');
goog.require('goog.array');
goog.require('goog.async.Deferred');
goog.require('goog.color');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Trace');
goog.require('goog.dom');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.iframe');
goog.require('goog.functions');
goog.require('goog.math');
goog.require('goog.object');
goog.require('goog.string.format');
goog.require('goog.structs.Map');
goog.require('goog.style');
goog.require('vgps3.Map');
goog.require('vgps3.PluginBase');
goog.require('vgps3.loader');



/**
 *
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.earth.Earth = function() {

  /**
  * @type {GEPlugin} The GE plugin
  * @private
  */
  this.ge_;

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
   * @type {boolean} Whether the earth is visible
   * @private
   */
  this.visible_ = false;

  /**
   * @type {goog.structs.Map} Listeners to ge events
   * @private
   */
  this.geListeners_ = new goog.structs.Map();

  /**
   * @type {function(function())}
   * @private
   */
  this.batchExecutor_;

  goog.base(this);

  /**
   * @type {goog.debug.Logger} The logger
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.earth.Earth');
};
goog.inherits(vgps3.earth.Earth, vgps3.PluginBase);


/**
 * @override
 */
vgps3.earth.Earth.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);

  this.currentMapTypeId_ = this.gMap_.getMapTypeId();

  this.getHandler()
    .listen(vgps, vgps3.track.EventType.LOAD, this.trackLoadHandler_)
    .listen(vgps, vgps3.track.EventType.SELECT, this.trackSelectHandler_);

  vgps3.loader.load('earth', 1, vgps3.earth.geApiLoaded_);

  // Ideally this should be done in the cb below but it seems not to work every time then !
  this.gMap_.mapTypes.set(vgps3.earth.MapTypeId.EARTH, this.getMapType_());

  vgps3.earth.geApiLoaded_.addCallback(
      function() {
        this.logger_.info('Google Earth API loaded');
        if (google.earth.isSupported()) {
          this.logger_.info('GE Plugin supported');
          google.maps.event.addListener(
              this.gMap_,
              'maptypeid_changed',
              goog.bind(this.mapTypeChangeHandler_, this)
          );
        } else {
          this.gMap_.mapTypes.set(vgps3.earth.MapTypeId.EARTH, null);
          this.getHandler().removeAll();
        }
      },
      this
  );
};


/**
 * @override
 */
vgps3.earth.Earth.prototype.requireGoogleMapLibs = function() {
  return ['geometry'];
};


/**
 * Shows the plugin when the earth map type is selected.
 *
 * @private
 */
vgps3.earth.Earth.prototype.mapTypeChangeHandler_ = function() {
  if (this.gMap_.getMapTypeId() === vgps3.earth.MapTypeId.EARTH) {
    if (!this.ge_) {
      vgps3.loadMask.setMessage('Chargement de Google Earth', undefined, true);
      this.createEarth_();
    }
    this.mapCreated_.addCallback(function() {
      this.currentMapTypeId_ = this.gMap_.getMapTypeId();
    });
    this.showEarth_(true);
  } else {
    this.showEarth_(false);
    this.currentMapTypeId_ = this.gMap_.getMapTypeId();
  }
};


/**
 * Makes the map type controls available when the GE plugin is in use.
 *
 * @param {boolean} visible
 * @private
 */
vgps3.earth.Earth.prototype.showEarth_ = function(visible) {
  if (visible === this.visible_) {
    return;
  }

  if (visible) {
    // Sets the z-index of all controls except for the map type control so that they appear behind Earth.
    goog.array.forEach(this.earthDom_.parentNode.childNodes, function(sibling) {
      sibling['__gme_ozi'] = sibling.style.zIndex;
      if (sibling === this.mapControlDiv_ || null !== goog.dom.getAncestorByClass(sibling, 'vgps3-earth-control')) {
        sibling.style.zIndex = 0;
      } else {
        sibling.style.zIndex = -10;
      }
    });
    this.earthDom_.style.zIndex = -1;
    // Create a shim so that controls appear in front of the plugin
    if (!this.shim_) {
      this.shim_ = goog.dom.iframe.createBlank(new goog.dom.DomHelper());
      goog.style.setStyle(this.shim_, {
        zIndex: -100000,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      });
      goog.dom.appendChild(this.mapControlDiv_, this.shim_);
    }
  } else {
    // Restore saved zIndexes
    goog.array.forEach(this.earthDom_.parentNode.childNodes, function(sibling) {
      sibling.style.zIndex = sibling['__gme_ozi'];
    });
  }

  this.visible_ = visible;
  goog.style.setElementShown(this.earthDom_, visible);
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
  goog.style.setSize(inner, goog.style.getSize(/** @type {Element} */(this.gMap_.getDiv())));
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
        that.batchExecutor_ = vgps3.earth.DEBUG_BATCH
          ? function(cb) {cb.call(that);}
            : function(cb) {google.earth.executeBatch(ge, goog.bind(cb, that)); };
        that.installClickHandler_(ge.getWindow());
        that.batchExecutor_(function() {
          that.ge_.getWindow().setVisibility(true);
          var navControl = that.ge_.getNavigationControl();
          navControl.setVisibility(that.ge_.VISIBILITY_AUTO);
          var screen = navControl.getScreenXY();
          screen.setYUnits(that.ge_.UNITS_INSET_PIXELS);
          screen.setXUnits(that.ge_.UNITS_PIXELS);
          goog.Timer.callOnce(that.mapCreated_.callback, 0, that.mapCreated_);
        });
      },
      /**
       * @param {string} error
       */
      function(error) {
        that.logger_.severe('GE Plugin failed to start: ' + error);
        vgps3.loadMask.close();
        // If not installed, let the plugin show the download GE link
        if (google.earth.isInstalled()) {
          that.gMap_.setMapTypeId(that.currentMapTypeId_);
        }
      }
  );
};


/**
 * Moves the pilot to the given location.
 *
 * @param {number} position [0...1].
 * @param {boolean=} opt_setCenter Whether to center the view.
 * @param {number=} opt_zoomOffset Zoom direction.
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

    this.batchExecutor_(function() {
      var kmlLine = this.ge_.getElementById('track-' + this.currentTrackIndex_),
          kmlCoordinates = kmlLine.getCoordinates(),
          lineMaxIndex = kmlCoordinates.getLength() - 1,
          index = Math.round(position * lineMaxIndex),
          location = kmlCoordinates.get(index);

      this.location_.setLatLngAlt(location.getLatitude(), location.getLongitude(), location.getAltitude());

      var nextIndex = Math.min(index + 1, lineMaxIndex),
          nextLocation = kmlCoordinates.get(nextIndex),
          heading;

      heading = google.maps.geometry.spherical.computeHeading(
          new google.maps.LatLng(location.getLatitude(), location.getLongitude()),
          new google.maps.LatLng(nextLocation.getLatitude(), nextLocation.getLongitude())
          );

      // Apply model origin (255deg)
      this.orientation_.setHeading(goog.math.standardAngle(heading + vgps3.earth.MODEL_ORIGIN_ANGLE));

      if (opt_setCenter) {
        var lookAt = this.ge_.getView().copyAsLookAt(this.ge_.ALTITUDE_CLAMP_TO_SEA_FLOOR);
        lookAt.setLatitude(location.getLatitude());
        lookAt.setLongitude(location.getLongitude());
        lookAt.setAltitude(location.getAltitude());
        this.ge_.getView().setAbstractView(lookAt);
      }

      if (opt_zoomOffset) {
        var lookAt = this.ge_.getView().copyAsLookAt(this.ge_.ALTITUDE_CLAMP_TO_SEA_FLOOR);
        lookAt.setRange(Math.pow(2, opt_zoomOffset) * lookAt.getRange());
        this.ge_.getView().setAbstractView(lookAt);
      }
    });
  }
  );
};


/**
 * @override
 */
vgps3.earth.Earth.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  delete this.mapControlDiv_;
  goog.dom.removeNode(this.earthDom_);
  delete this.earthDom_;
  goog.dom.removeNode(this.shim_);
  delete this.shim_;
  goog.object.forEach(this.geListeners_.toObject(), function(listeners, source) {
    goog.object.forEach(listeners, function(listener, event) {
      google.earth.removeEventListener(source, event, listener);
    });
  });
  delete this.geListeners_;
};


/**
 * @return {google.maps.MapType}
 * @private
 */
vgps3.earth.Earth.prototype.getMapType_ = function() {
  return /** @type {google.maps.MapType} */ ({
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 19,
    name: vgps3.earth.TITLE_,
    alt: vgps3.earth.TITLE_,
    getTile: function(tileCoord, zoom, ownerDocument) {
      var div = ownerDocument.createElement('div');
      return div;
    }
  });
};


/**
 * Installs the click handler.
 *
 * The click handle is able to discriminate click and drag events.
 *
 * @param {GEEventEmitter} source The event source.
 *
 * @private
 */
vgps3.earth.Earth.prototype.installClickHandler_ = function(source) {
  var de, that = this;

  var mdListener = function(e) {0 === e.getButton() && (de = e);};
  google.earth.addEventListener(source, 'mousedown', mdListener);

  var muListener = function(e) {
    if (0 === e.getButton()) {
      var distPx = Math.pow(2, de.getClientX() - e.getClientX()) + Math.pow(2, de.getClientY() - e.getClientY());
      if (distPx < 10 * 10) {
        that.clickHandler_.call(that, de);
      }
    }
  };
  google.earth.addEventListener(source, 'mouseup', muListener);

  this.geListeners_.set(source, {'mouseup': muListener, 'mousedown': mdListener});
};


/**
 * Triggers a click on the google map when the earth gets clicked.
 *
 * @param {Object} e
 *
 * @private
 */
vgps3.earth.Earth.prototype.clickHandler_ = function(e) {
  this.logger_.info(goog.string.format(
      'Click event lat=%.4f lon=%.4f alt=%d on %s',
      e.getLatitude(), e.getLongitude(), e.getAltitude(), e.getTarget().getType())
  );
  var mdEvent = {
    latLng: new google.maps.LatLng(e.getLatitude(), e.getLongitude()),
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
    // Create the 3D model
    if (!this.orientation_) {
      vgps3.loadMask.close();
      this.logger_.info('Creating 3D model');
      this.batchExecutor_(function() {
        var placemark = this.ge_.createPlacemark('modelPm');
        var model = this.ge_.createModel('model');
        placemark.setGeometry(model);
        var link = this.ge_.createLink('link');
        link.setHref(vgps3.earth.MODEL_URL);
        model.setLink(link);
        model.setLocation(this.location_);
        this.orientation_ = this.ge_.createOrientation('orient');
        model.setOrientation(this.orientation_);
        var scale = this.ge_.createScale('');
        scale.set(5, 5, 5);
        model.setScale(scale);
        model.setAltitudeMode(this.ge_.ALTITUDE_ABSOLUTE);
        this.ge_.getFeatures().appendChild(placemark);
      });
    }
    // Set tracks style
    this.batchExecutor_(function() {
      var trackIdx = event.trackIndex,
          previousTrackIndex = event.previousTrackIndex,
          lineStyle;
      lineStyle = this.ge_.getElementById('trackStyle-' + trackIdx).getLineStyle();
      lineStyle.getColor().setA(256);
      lineStyle.setWidth(3);
      if (!goog.isNull(previousTrackIndex)) {
        lineStyle = this.ge_.getElementById('trackStyle-' + previousTrackIndex).getLineStyle();
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
 * @param {number} trackIndex The track index.
 * @param {vgps3.track.GpsFixes} fixes
 * @param {string} trackColor
 * @private
 */
vgps3.earth.Earth.prototype.displayTrack_ = function(trackIndex, fixes, trackColor) {
  var lineString = this.ge_.createLineString('track-' + trackIndex),
      lineStringPm = this.ge_.createPlacemark('trackPm-' + trackIndex),
      getElevation = goog.bind(this.estimateElevation_, this, (fixes['nbChartPt'] - 1) / (fixes['nbTrackPt'] - 1)),
      elev = [];

  vgps3.loadMask.setMessage('Chargement de la trace');
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

  this.batchExecutor_(function() {
    this.ge_.getFeatures().appendChild(lineStringPm);
    lineString.setAltitudeMode(this.ge_.ALTITUDE_ABSOLUTE);
    lineStringPm.setStyleSelector(this.ge_.createStyle('trackStyle-' + trackIndex));
    var lineStyle = lineStringPm.getStyleSelector().getLineStyle();
    lineStyle.setWidth(2);
    // color format: aabbggrr
    lineStyle.getColor().set(goog.color.parse(trackColor).hex.replace(/^#(..)(..)(..)/, '7f$3$2$1'));
    this.installClickHandler_(lineString);
  });

  this.logger_.info(goog.string.format('Track[%d] added', trackIndex));

  if (!goog.isDef(this.location_)) {
    this.location_ = null;
    this.batchExecutor_(function() {
      // Location where to first display the 3D model
      this.ge_.getOptions().setFlyToSpeed(this.ge_.SPEED_TELEPORT);
      this.ge_.getOptions().setScaleLegendVisibility(true);
      this.location_ = this.ge_.createLocation('');
      this.location_.setLatLngAlt(fixes['lat'][0], fixes['lon'][0], fixes['elev'][0]);
      // fly to this location
      var lookAt = this.ge_.getView().copyAsLookAt(this.ge_.ALTITUDE_ABSOLUTE);
      lookAt.set(
          fixes['lat'][0], fixes['lon'][0], fixes['elev'][0],
          this.ge_.ALTITUDE_ABSOLUTE,
          0,                                             // heading
          80,                                            // tilt
          Math.pow(2, vgps3.earth.MAX_EARTH_ZOOM_ - 14)  // range
      );
      this.ge_.getView().setAbstractView(lookAt);
    });
    goog.Timer.callOnce(this.trackAdded_.callback, 0, this.trackAdded_);
  }
};


/**
 * Interpolates the elevation for the given position.
 *
 * @param {number} factor The ratio (elevation samples - 1) / (track samples -1).
 * @param {vgps3.track.GpsFixes} fixes
 * @param {number} index [0...fixes['nbTrackPt']].
 * @return {number} The elevation.
 * @private
 */
vgps3.earth.Earth.prototype.estimateElevation_ = function(factor, fixes, index) {
  index *= factor;
  var chartIndex = Math.round(index),
      nextChartIndex = chartIndex + 1 < fixes['nbTrackPt'] ? chartIndex + 1 : chartIndex;
  return fixes['elev'][chartIndex] + (index - chartIndex) * (fixes['elev'][nextChartIndex] - fixes['elev'][chartIndex]);
};


/**
 * @type {string}
 * @const
 * @private
 */
vgps3.earth.TITLE_ = 'Earth3D';


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


/**
 * @define {boolean} Set to true to ease debugging batch calls.
 */
vgps3.earth.DEBUG_BATCH = false;

goog.exportSymbol('vgps3.earth.Earth', vgps3.earth.Earth);
goog.exportSymbol('vgps3.earth.Earth.init', vgps3.earth.Earth.prototype.init);
