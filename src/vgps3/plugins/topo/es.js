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
 * @fileoverview Spain topo map.
 * @see http://grysz.com/2011/04/12/how-ign-tile-servers-work/
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.topo.es.Map');

goog.require('vgps3.IPlugin');
goog.require('vgps3.Map');
goog.require('vgps3.proj.GProj');
goog.require('vgps3.proj.Iberpix');



/**
 * @constructor Spain IGN map type for google maps.
 * @implements {vgps3.IPlugin}
 */
vgps3.topo.es.Map = function() {
  /**
   * The google map
   * @type {google.maps.Map}
   * @private
   */
  this.gMap_;

  /**
   * @type {google.maps.MapsEventListener} Listen to zoom changes
   * @private
   */
  this.zoomListener_;

  /**
   * @type {google.maps.MapsEventListener} Listen to map moves
   * @private
   */
  this.moveListener_;

  /**
   * @type {number} TM zone
   * @private
   */
  this.zone_ = 30;

  /**
   * @type {vgps3.proj.Iberpix}
   * @private
   */
  this.projection_ = new vgps3.proj.Iberpix(this.zone_);
};


/**
 * Registers this map type in google maps.
 *
 * @override
 */
vgps3.topo.es.Map.prototype.init = function(vgps) {
  this.gMap_ = vgps.getGoogleMap();
  this.gMap_.mapTypes.set(vgps3.topo.es.MapTypeId.TERRAIN, /** @type {?} */ (this.getMapType_()));
  google.maps.event.addListener(
      this.gMap_,
      'maptypeid_changed',
      goog.bind(this.mapTypeChangeHandler_, this)
  );
};


/**
 * Handling map show / hide
 * @private
 */
vgps3.topo.es.Map.prototype.mapTypeChangeHandler_ = function() {
  if (this.gMap_.getMapTypeId() === vgps3.topo.es.MapTypeId.TERRAIN) {
    this.enable_();
  } else {
    this.disable_();
  }
};


/**
 * Should be called when the map gets shown
 * @private
 */
vgps3.topo.es.Map.prototype.enable_ = function() {
  this.updateProjection_(true);

  this.zoomListener_ = google.maps.event.addListener(
      this.gMap_,
      'zoom_changed',
      goog.bind(this.updateProjection_, this)
      );

  this.moveListener_ = google.maps.event.addListener(
      this.gMap_,
      'center_changed',
      goog.bind(this.updateProjection_, this)
      );
};


/**
 * Should be called when the map gets hidden
 *
 * @private
 */
vgps3.topo.es.Map.prototype.disable_ = function() {
  google.maps.event.removeListener(this.zoomListener_);
  google.maps.event.removeListener(this.moveListener_);
};


/**
 * Updates the projection when the map moves.
 *
 * @param {boolean=} opt_force Whether to force the update.
 *
 * @private
 */
vgps3.topo.es.Map.prototype.updateProjection_ = function(opt_force) {
  var previousZone = this.zone_,
      zoom = this.gMap_.getZoom(),
      center = this.gMap_.getCenter();

  if (zoom < 11) {
    this.zone_ = 30;
  } else {
    var centerLng = center.lng();
    if (centerLng < -6) {
      this.zone_ = 29;
    } else if (centerLng < 0) {
      this.zone_ = 30;
    } else {
      this.zone_ = 31;
    }
  }

  if (opt_force || this.zone_ !== previousZone) {
    this.projection_.setZone(this.zone_);
    this.gMap_.setCenter(center);
  }
};


/**
 * @return {google.maps.ImageMapType} The map type.
 * @private
 */
vgps3.topo.es.Map.prototype.getMapType_ = function() {
  var mapType = new google.maps.ImageMapType({
    getTileUrl: goog.bind(this.getTileUrl_, this),
    tileSize: new google.maps.Size(256, 256),
    minZoom: 6,
    maxZoom: 18,
    name: 'TopoES',
    alt: 'Cartes IGN Espagne'
  });

  mapType.projection = new vgps3.proj.GProj(this.projection_, 2048 * Math.pow(2, vgps3.topo.es.ZOOM_OFFSET_));

  return mapType;
};


/**
 * Returns the URL of a tile.
 *
 * @param {google.maps.Point} coord
 * @param {number} zoom
 * @return {?string}
 *
 * @private
 */
vgps3.topo.es.Map.prototype.getTileUrl_ = function(coord, zoom) {
  var numTiles = 1 << zoom,
      y = -coord.y - 1;
  if (y < 0 || y >= numTiles) {
    return null;
  }
  return vgps3.topo.es.TILES_URL
        .replace('{server}', (vgps3.topo.es.serverIndex_++ % 5).toString(10))
        .replace('{layer}', this.getLayerName_(zoom))
        .replace('{zone}', this.zone_.toString(10))
        .replace('{scale}', (2048 / Math.pow(2, zoom - 6) * 1000).toString(10))
        .replace('{x}', (((coord.x % numTiles) + numTiles) % numTiles).toString(10))
        .replace('{y}', y.toString(10));

};


/**
 * Returns the layer name according to the zoom level.
 *
 * @param {number} zoomLevel
 * @return {string}
 */
vgps3.topo.es.Map.prototype.getLayerName_ = function(zoomLevel) {
  if (zoomLevel < 11) {
    return vgps3.topo.es.LAYER_NAMES_[0];
  }
  if (zoomLevel < 13) {
    return vgps3.topo.es.LAYER_NAMES_[1];
  }
  if (zoomLevel < 15) {
    return vgps3.topo.es.LAYER_NAMES_[2];
  }
  return vgps3.topo.es.LAYER_NAMES_[3];
};


/**
 * @define {string} The url for tiles.
 */
vgps3.topo.es.TILES_URL = 'http://ts{server}.iberpix.ign.es/tileserver/n={layer};z={zone};r={scale};i={x};j={y}.jpg';


/**
 * @enum {string} The supported map types
 */
vgps3.topo.es.MapTypeId = {
  TERRAIN: 'vgps3-topo-es-terrain'
};


/**
 * The layer names according to zoom level [<11, <13, <15, >=15]
 * @const
 * @type {Array.<string>}
 * @private
 */
vgps3.topo.es.LAYER_NAMES_ = ['mapa_millon', 'mapa_mtn200', 'mapa_mtn50', 'mapa_mtn25'];


/**
 * @const
 * @type {number}
 * @private
 */
vgps3.topo.es.ZOOM_OFFSET_ = Math.round(Math.log(2 * Math.PI * 6378137 / (2048 * 256)) / Math.LN2);


/**
 * @type {number}
 * @private
 */
vgps3.topo.es.serverIndex_ = 0;

goog.exportSymbol('vgps3.topo.es.Map', vgps3.topo.es.Map);
goog.exportSymbol('vgps3.topo.es.Map.init', vgps3.topo.es.Map.prototype.init);
