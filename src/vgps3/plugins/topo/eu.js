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
 * @fileoverview Topo maps for Europe 4UMaps.
 * @see http://www.4umaps.eu/
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.topo.eu.Map');

goog.require('vgps3.Map');
goog.require('vgps3.topo.AbstractTopo');



/**
 * @constructor Europe topo maps for google maps.
 * @extends {vgps3.topo.AbstractTopo}
 */
vgps3.topo.eu.Map = function() {
  goog.base(this);
};
goog.inherits(vgps3.topo.eu.Map, vgps3.topo.AbstractTopo);


/**
 * @override
 */
vgps3.topo.eu.Map.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);
  this.setBounds_([
    [27.06, -33.74, 61.60, 36.58]
  ]);
  this.setCopyright_('img/topo.eu.png', 'http://www.4umaps.eu/');
  this.registerMapType_(vgps3.topo.eu.MapTypeId.TERRAIN);
};


/**
 * @override
 */
vgps3.topo.eu.Map.prototype.getMapType_ = function() {
  return new google.maps.ImageMapType({
    getTileUrl: goog.bind(this.getTileUrl_, this),
    tileSize: new google.maps.Size(256, 256),
    minZoom: 6,
    maxZoom: 15,
    name: 'Europe',
    alt: 'Cartes Europe'
  });
};


/**
 * @override
 */
vgps3.topo.eu.Map.prototype.getTileUrl_ = function(coord, zoom) {
  var numTiles = Math.pow(2, zoom);
  if (!this.isTileVisible_(coord, zoom)) {
    return null;
  }

  return vgps3.topo.eu.TILES_URL
      .replace('{zoom}', zoom.toString())
      .replace('{x}', (((coord.x % numTiles) + numTiles) % numTiles).toString())
      .replace('{y}', coord.y.toString());
};


/**
 * @define {string} The url for tiles.
 */
vgps3.topo.eu.TILES_URL = 'https://tileserver.4umaps.com/{zoom}/{x}/{y}.png';

/**
 * @enum {string} The supported map types
 */
vgps3.topo.eu.MapTypeId = {
  TERRAIN: 'vgps3-topo-eu-terrain'
};

goog.exportSymbol('vgps3.topo.eu.Map', vgps3.topo.eu.Map);
goog.exportSymbol('vgps3.topo.eu.Map.init', vgps3.topo.eu.Map.prototype.init);
