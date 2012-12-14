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
 * @fileoverview Cesium WebGL maps
 * @see http://cesium.agi.com/
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.cesium.Cesium');

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
 * @notypecheck
 */
var Cesium;

/**
 *
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.cesium.Cesium = function() {

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
   * @type {Element} The earth map selection control div
   * @private
   */
  this.mapControlDiv_;

  /**
   * @type {goog.async.Deferred}
   * @private
   */
  this.globeCreated_ = new goog.async.Deferred(null, this);

  /**
   * @type {goog.async.Deferred} Triggered when the first track has been added
   * @private
   */
  this.trackAdded_ = new goog.async.Deferred(null, this);

  /**
   * @type {Array} The cesium track polylines
   * @private
   */
  this.polylines_ = [];

  /**
   * @type {?}
   */
  this.scene_;

  goog.base(this);
  /**
   * @type {goog.debug.Logger} The logger
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.cesium.Cesium');
};
goog.inherits(vgps3.cesium.Cesium, vgps3.PluginBase);


/**
 * @override
 */
vgps3.cesium.Cesium.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);

  this.gMap_.mapTypes.set(vgps3.cesium.MapTypeId.EARTH, this.getMapType_());

  this.getHandler()
    .listen(vgps, vgps3.track.EventType.LOAD, this.trackLoadHandler_)
    .listen(vgps, vgps3.track.EventType.SELECT, this.trackSelectHandler_);

  google.maps.event.addListener(
      this.gMap_,
      'maptypeid_changed',
      goog.bind(this.mapTypeChangeHandler_, this)
  );
};


/**
 * Shows the plugin when the earth map type is selected.
 *
 * @private
 */
vgps3.cesium.Cesium.prototype.mapTypeChangeHandler_ = function() {
  if (this.gMap_.getMapTypeId() === vgps3.cesium.MapTypeId.EARTH) {
    if (!vgps3.cesium.cesiumLoaded_) {
      vgps3.loadMask.setMessage('Chargement de Cesium', undefined, true);
      vgps3.cesium.cesiumLoaded_ = goog.net.jsloader.load(vgps3.cesium.CESIUM_URL);
      vgps3.cesium.cesiumLoaded_.addCallback(this.createEarth_, this);
    } else {
      this.showEarth_(true);
    }
  } else {
    this.showEarth_(false);
  }
};


/**
 * Makes the map type controls available when the GE plugin is in use.
 *
 * @param {boolean} visible
 * @private
 */
vgps3.cesium.Cesium.prototype.showEarth_ = function(visible) {
  if (visible) {
    // Sets the z-index of all controls except for the map type control so that they appear behind cesium.
    goog.array.forEach(this.earthDom_.parentNode.childNodes, function(sibling) {
      sibling['__gme_ozi'] = sibling.style.zIndex;
      if (sibling === this.mapControlDiv_ || null !== goog.dom.getAncestorByClass(sibling, 'vgps3-earth-control')) {
        sibling.style.zIndex = 10;
      } else {
        sibling.style.zIndex = -10
      }
    });
    this.earthDom_.style.zIndex = -1;
  } else {
    // Restore saved zIndexes
    goog.array.forEach(this.earthDom_.parentNode.childNodes, function(sibling) {
      sibling.style.zIndex = sibling['__gme_ozi'];
    });
  }

  this.visible_ = visible;
  goog.style.showElement(this.earthDom_, visible);
};


/**
 * Adds a google maps control to host the earth view and start the plugin on supported platforms.
 *
 * @private
 * @notypecheck
 */
vgps3.cesium.Cesium.prototype.createEarth_ = function() {
  var canvas = goog.dom.createElement('canvas');
  goog.style.setStyle(canvas, {top: 0, left: 0, position: 'absolute', zIndex: -1});
  this.earthDom_ = goog.dom.createDom('div', {index: 0}, canvas);
  goog.style.setStyle(this.earthDom_, { position: 'absolute', zIndex: -1 });

  this.gMap_.controls[google.maps.ControlPosition.TOP_LEFT].push(this.earthDom_);

  this.mapControlDiv_ = goog.dom.findNode(
    this.gMap_.getDiv(),
    function(node) {return vgps3.cesium.TITLE_ === node.innerHTML;}
  );

  var ellipsoid = Cesium.Ellipsoid.WGS84;
  this.scene_ = new Cesium.Scene(canvas);
  var primitives = this.scene_.getPrimitives();

  // Bing Maps
  var bing = new Cesium.BingMapsImageryProvider({
      url: 'http://dev.virtualearth.net',
      mapStyle : Cesium.BingMapsStyle.AERIAL
  });

  var terrainProvider = new Cesium.CesiumTerrainProvider({
    url : 'http://cesium.agi.com/smallterrain',
    credit : 'Terrain data courtesy Analytical Graphics, Inc.'
  });

  var cb = new Cesium.CentralBody(ellipsoid);
  cb.getImageryLayers().addImageryProvider(bing);
  cb.terrainProvider = terrainProvider;
  cb.oceanNormalMapUrl = 'lib/cesium/Source/Assets/Textures/waterNormals.jpg';

  primitives.setCentralBody(cb);

  var that = this;

  function onResize() {
    var size = goog.style.getSize(that.gMap_.getDiv());
    canvas.width = size.width;
    canvas.height = size.height;
    that.scene_.getCamera().frustum.aspectRatio = size.aspectRatio();
  };

  google.maps.event.addListener(this.gMap_, 'resize', onResize);

  var tick = function() {
    that.scene_.initializeFrame();
    that.scene_.render();
    Cesium.requestAnimationFrame(tick);
  }
  onResize();
  tick();

  (this.gMap_.getMapTypeId() === vgps3.cesium.MapTypeId.EARTH) && this.showEarth_(true);
  this.globeCreated_.callback();

  vgps3.loadMask.close();
};


/**
 * Moves the pilot to the given location.
 *
 * @param {number} position [0...1].
 * @param {boolean=} opt_setCenter Whether to center the view.
 * @param {number=} opt_zoomOffset Zoom direction.
 */
vgps3.cesium.Cesium.prototype.moveTo = function(position, opt_setCenter, opt_zoomOffset) {
  if (!this.visible_) {
    return;
  }
};


/**
 * @override
 */
vgps3.cesium.Cesium.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  delete this.mapControlDiv_;
  goog.dom.removeNode(this.earthDom_);
  delete this.earthDom_;
};


/**
 * @return {google.maps.MapType}
 * @private
 */
vgps3.cesium.Cesium.prototype.getMapType_ = function() {
  return /** @type {google.maps.MapType} */ ({
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 19,
    name: vgps3.cesium.TITLE_,
    alt: vgps3.cesium.TITLE_,
    getTile: function(tileCoord, zoom, ownerDocument) {
      var div = ownerDocument.createElement('div');
      return div;
    }
  });
};


/**
 * Triggers a click on the google map when the earth gets clicked.
 *
 * @param {Object} e
 *
 * @private
 */
vgps3.cesium.Cesium.prototype.clickHandler_ = function(e) {
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
 * @notypecheck
 */
vgps3.cesium.Cesium.prototype.trackLoadHandler_ = function(event) {
  this.logger_.info(goog.string.format('Track[%d] loaded', event.trackIndex));

  this.globeCreated_.addCallback(function() {
    var fixes = event.fixes;
    var polylines = new Cesium.PolylineCollection();
    var polyline = polylines.add();

    var getElevation = goog.bind(this.estimateElevation_, this, (fixes['nbChartPt'] - 1) / (fixes['nbTrackPt'] - 1));

    var points = [];

    for (var i = 0; i < fixes['nbTrackPt']; i++) {
      points.push(Cesium.Cartographic.fromDegrees(fixes['lon'][i], fixes['lat'][i], getElevation(fixes, i)));
    }

    polyline.setPositions(Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(points));
    polyline.setWidth(2);

    var rgb = goog.color.hexToRgb(event.trackColor);

    polyline.setColor({
      red   : rgb[0] / 255.0,
      green : rgb[1] / 255.0,
      blue  : rgb[2] / 255.0,
      alpha : 0.5
    });

    this.scene_.getPrimitives().add(polylines);
    this.polylines_[event.trackIndex] = polyline;

    if (!this.trackAdded_.hasFired()) {
      this.trackAdded_.callback();
    }
  });
};


/**
 * Sets tracks color when a track gets selected.
 *
 * @param {vgps3.track.TrackSelectEvent} event
 *
 * @private
 */
vgps3.cesium.Cesium.prototype.trackSelectHandler_ = function(event) {
  this.logger_.info(goog.string.format('Track[%d] selected', event.trackIndex));

  this.trackAdded_.addCallback(function() {
    var polyline = this.polylines_[event.trackIndex],
        color = polyline.getColor();
    polyline.setWidth(2);
    color.alpha = 1;
    polyline.setColor(color);

    if (event.previousTrackIndex) {
      polyline = this.polylines_[event.previousTrackIndex];
      color = polyline.getColor();
      polyline.setWidth(1);
      color.alpha = 0.5;
      polyline.setColor(color);
    }
  });

  this.currentTrackIndex_ = event.trackIndex;

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
vgps3.cesium.Cesium.prototype.displayTrack_ = function(trackIndex, fixes, trackColor) {
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
vgps3.cesium.Cesium.prototype.estimateElevation_ = function(factor, fixes, index) {
  index *= factor;
  var chartIndex = Math.round(index),
      nextChartIndex = chartIndex + 1 < fixes['nbTrackPt'] ? chartIndex + 1 : chartIndex;
  return fixes['elev'][chartIndex] + (index - chartIndex) * (fixes['elev'][nextChartIndex] - fixes['elev'][chartIndex]);
};


/**
 * @enum {string}
 */
vgps3.cesium.MapTypeId = {
  EARTH: 'vgps3-cesium-3d'
};

/**
 * @type {string}
 * @const
 * @private
 */
vgps3.cesium.TITLE_ = 'wgl3D';


/**
 * @define {string} URL of the cesium script
 */
vgps3.cesium.CESIUM_URL = 'lib/cesium/Build/Cesium/Cesium.js';

/**
 * @type {goog.async.Deferred}
 * @private
 */
vgps3.cesium.cesiumLoaded_;

goog.exportSymbol('vgps3.cesium.Cesium', vgps3.cesium.Cesium);
goog.exportSymbol('vgps3.cesium.Cesium.init', vgps3.cesium.Cesium.prototype.init);
