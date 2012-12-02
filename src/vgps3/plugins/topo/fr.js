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
 * @fileoverview Topo maps for France.
 * @see http://api.ign.fr
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.topo.fr.Map');

goog.require('vgps3.Map');
goog.require('vgps3.PluginBase');



/**
 * @constructor France IGN map type for google maps.
 * @extends {vgps3.PluginBase}
 */
vgps3.topo.fr.Map = function() {
  goog.base(this);

  /**
   * @type {?string}
   */
  this.tilesUrl_;
};
goog.inherits(vgps3.topo.fr.Map, vgps3.PluginBase);


/**
 * Registers this map type in google maps.
 *
 * @override
 */
vgps3.topo.fr.Map.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);
  var key = vgps.getDomainKey(vgps3.topo.fr.API_KEYS);
  this.tilesUrl_ = null == key ? null : vgps3.topo.fr.TILES_URL.replace('{API_KEY}', key);
  this.gMap_.mapTypes.set(vgps3.topo.fr.MapTypeId.TERRAIN, /** @type {?} */ (this.getMapType_()));
};


/**
 * @return {google.maps.ImageMapType} The map type.
 * @private
 */
vgps3.topo.fr.Map.prototype.getMapType_ = function() {
  return new google.maps.ImageMapType({
    getTileUrl: goog.bind(this.getTileUrl_, this),
    tileSize: new google.maps.Size(256, 256),
    minZoom: 6,
    maxZoom: 17,
    name: 'TopoFR',
    alt: 'Cartes IGN France'
  });
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
vgps3.topo.fr.Map.prototype.getTileUrl_ = function(coord, zoom) {
  var numTiles = 1 << zoom;
  if (!this.tilesUrl_) {
    return null;
  }
  if (coord.y < 0 || coord.y >= numTiles) {
    return null;
  }
  return this.tilesUrl_
      .replace('{zoom}', zoom.toString(10))
      .replace('{x}', (((coord.x % numTiles) + numTiles) % numTiles).toString(10))
      .replace('{y}', coord.y.toString(10))
      .replace('{layer}', 'GEOGRAPHICALGRIDSYSTEMS.MAPS');

};


/**
 * @define {string} The API keys format='domain1="key1" domain2="key2" *="fallback key"'.
 * @see http://api.ign.fr/accueil
 */
vgps3.topo.fr.API_KEYS = '';


/**
 * @define {string} The url for tiles.
 */
vgps3.topo.fr.TILES_URL = 'http://gpp3-wxs.ign.fr/{API_KEY}/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER={layer}&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={zoom}&TILEROW={y}&TILECOL={x}';


/**
 * @enum {string} The supported map types
 */
vgps3.topo.fr.MapTypeId = {
  TERRAIN: 'vgps3-topo-fr-terrain'
};

goog.exportSymbol('vgps3.topo.fr.Map', vgps3.topo.fr.Map);
goog.exportSymbol('vgps3.topo.fr.Map.init', vgps3.topo.fr.Map.prototype.init);
