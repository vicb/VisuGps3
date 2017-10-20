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
 * @fileoverview Spain topo map.
 * @see http://grysz.com/2011/04/12/how-ign-tile-servers-work/
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.topo.es.Map');

goog.require('vgps3.Map');
goog.require('vgps3.proj.GProj');
goog.require('vgps3.topo.AbstractTopo');


/**
 * @constructor Spain IGN map type for google maps.
 * @extends {vgps3.topo.AbstractTopo}
 */
vgps3.topo.es.Map = function() {
  goog.base(this);
};
goog.inherits(vgps3.topo.es.Map, vgps3.topo.AbstractTopo);


/**
 * @override
 */
vgps3.topo.es.Map.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);
  this.setBounds_([[44.0314, -21.3797, 27.1410, 5.0789]]);
  this.setCopyright_('img/topo.es.png', 'http://www.ign.es/');
  this.registerMapType_(vgps3.topo.es.MapTypeId.TERRAIN);
};

/**
 * @override
 */
vgps3.topo.es.Map.prototype.getMapType_ = function() {
  return new google.maps.ImageMapType({
    getTileUrl: goog.bind(this.getTileUrl_, this),
    tileSize: new google.maps.Size(256, 256),
    minZoom: 5,
    maxZoom: 18,
    name: 'Espagne',
    alt: 'Cartes IGN Espagne'
  });
};


/**
 * @override
 */
vgps3.topo.es.Map.prototype.getTileUrl_ = function(coord, zoom) {
  var numTiles = Math.pow(2, zoom);

  if (!this.isTileVisible_(coord, zoom)) {
    return null;
  }

  return vgps3.topo.es.TILES_URL
        .replace('{zoom}', zoom.toString())
        .replace('{x}', (((coord.x % numTiles) + numTiles) % numTiles).toString())
        .replace('{y}', coord.y.toString());
};

/**
 * @define {string} The url for tiles.
 */
vgps3.topo.es.TILES_URL = 'https://www.ign.es/wmts/mapa-raster?layer=MTN&style=default&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix={zoom}&TileCol={x}&TileRow={y}';


/**
 * @enum {string} The supported map types
 */
vgps3.topo.es.MapTypeId = {
  TERRAIN: 'vgps3-topo-es-terrain'
};

/**
 * @type {number}
 * @private
 */
vgps3.topo.es.serverIndex_ = 0;

goog.exportSymbol('vgps3.topo.es.Map', vgps3.topo.es.Map);
goog.exportSymbol('vgps3.topo.es.Map.init', vgps3.topo.es.Map.prototype.init);
