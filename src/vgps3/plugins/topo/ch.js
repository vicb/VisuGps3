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
 * @fileoverview Switzerland topo map.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.topo.ch.Map');

goog.require('goog.math');
goog.require('vgps3.Map');
goog.require('vgps3.proj.GProj');
goog.require('vgps3.proj.Swisstopo');
goog.require('vgps3.topo.AbstractTopo');



/**
 * @constructor Switzerland map type for google maps.
 * @extends {vgps3.topo.AbstractTopo}
 */
vgps3.topo.ch.Map = function() {
  /**
   * @type {google.maps.MapsEventListener} Listen to zoom changes
   * @private
   */
  this.zoomListener_;

  /**
   * @type {number} Previous zoom level
   * @private
   */
  this.previousZoom_;

  /**
   * @type {vgps3.proj.GProj}
   * @private
   */
  this.projection_;

  /**
   * @type {google.maps.LatLng}
   * @private
   */
  this.center_;

  goog.base(this);
};
goog.inherits(vgps3.topo.ch.Map, vgps3.topo.AbstractTopo);


/**
 * @override
 */
vgps3.topo.ch.Map.prototype.init = function(vgps) {
  var that = this;
  goog.base(this, 'init', vgps);
  this.setBounds_([[45.3981, 5.1402, 48.2306, 11.4774]]);
  this.registerMapType_(vgps3.topo.ch.MapTypeId.TERRAIN);
  this.setCopyright_('img/topo.ch.png', 'http://www.swisstopo.ch/');

  this.center_ = this.gMap_.getCenter();
  this.previousZoom_ = this.gMap_.getZoom();
  // Capture the center value when the map becomes idle
  // This is required to apply this value when the zoom level changes as consecutive zoom
  // resolution ratio is not 2 as expected by the google maps API
  google.maps.event.addListener(
      this.gMap_,
      'idle',
      function() {that.center_ = that.gMap_.getCenter();}
  );
};


/**
 * @override
 */
vgps3.topo.ch.Map.prototype.showHandler_ = function() {
  goog.base(this, 'showHandler_');
  this.updateProjection_();
  this.zoomListener_ = google.maps.event.addListener(
      this.gMap_,
      'zoom_changed',
      goog.bind(this.updateProjection_, this)
      );
};


/**
 * @override
 */
vgps3.topo.ch.Map.prototype.hideHandler_ = function() {
  goog.base(this, 'hideHandler_');
  google.maps.event.removeListener(this.zoomListener_);
};


/**
 * Updates the projection when the zoom changes.
 *
 * @private
 */
vgps3.topo.ch.Map.prototype.updateProjection_ = function() {
  var zoom = this.gMap_.getZoom();

  if (this.previousZoom_ && 10 === zoom) {
    // Skip zoom level 10 which is not supported
    this.gMap_.setZoom(zoom + (goog.math.sign(zoom - this.previousZoom_) || 1));
  }
  this.previousZoom_ = zoom;

  this.projection_.setScale0(
      vgps3.topo.ch.PARAMETERS[zoom].scale * Math.pow(2, zoom)
  );
  this.gMap_.setCenter(this.center_);
};


/**
 * @override
 */
vgps3.topo.ch.Map.prototype.getMapType_ = function() {
  var mapType = new google.maps.ImageMapType({
    getTileUrl: goog.bind(this.getTileUrl_, this),
    tileSize: new google.maps.Size(256, 256),
    minZoom: 5,
    maxZoom: 18,
    name: 'Suisse',
    alt: 'Cartes de Suisse'
  });

  this.projection_ = new vgps3.proj.GProj(new vgps3.proj.Swisstopo());
  mapType.projection = this.projection_;

  return mapType;
};


/**
 * @override
 */
vgps3.topo.ch.Map.prototype.getTileUrl_ = function(coord, zoom) {
  var numTiles = Math.pow(2, zoom);

  if (!this.isTileVisible_(coord, zoom)) {
    return null;
  }
  return vgps3.topo.ch.TILES_URL
      .replace('{server}', (vgps3.topo.ch.serverIndex_++ % 5 + 5).toString())
      .replace('{y}', coord.y.toString())
      .replace('{x}', (coord.x).toString())
      .replace('{proj}', '21781')
      .replace('{zoom}', vgps3.topo.ch.PARAMETERS[this.previousZoom_].zoom.toString())
      .replace('{date}', '20151231')
      .replace('{layer}', 'ch.swisstopo.pixelkarte-farbe');
};


/**
 * @define {string} The url for tiles.
 */
vgps3.topo.ch.TILES_URL = 'https://wmts{server}.geo.admin.ch/1.0.0/{layer}/default/{date}/{proj}/{zoom}/{y}/{x}.jpeg';


/**
 * @enum {string} The supported map types
 */
vgps3.topo.ch.MapTypeId = {
  TERRAIN: 'vgps3-topo-ch-terrain'
};


/**
 * The scales and zoom levels map for swisstopo
 *
 * @const
 * @type {Object.<number, {scale: number, zoom: number}>}
 */
vgps3.topo.ch.PARAMETERS = {
  5: {scale: 4000, zoom: 0},
  6: {scale: 2500, zoom: 6},
  7: {scale: 1250, zoom: 11},
  8: {scale: 650, zoom: 14},
  9: {scale: 250, zoom: 16},
  10: {scale: 200, zoom: 17},
  11: {scale: 100, zoom: 17},
  12: {scale: 50, zoom: 18},
  13: {scale: 20, zoom: 19},
  14: {scale: 10, zoom: 20},
  15: {scale: 5, zoom: 21},
  16: {scale: 2.5, zoom: 22},
  17: {scale: 1.5, zoom: 24},
  18: {scale: 0.5, zoom: 26}
};


/**
 * @type {number}
 * @private
 */
vgps3.topo.ch.serverIndex_ = 0;

goog.exportSymbol('vgps3.topo.ch.Map', vgps3.topo.ch.Map);
goog.exportSymbol('vgps3.topo.ch.Map.init', vgps3.topo.ch.Map.prototype.init);
