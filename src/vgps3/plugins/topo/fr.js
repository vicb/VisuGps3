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
 * @fileoverview Topo maps for France.
 * @see http://api.ign.fr
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.topo.fr.Map');

goog.require('vgps3.Map');
goog.require('vgps3.topo.AbstractTopo');



/**
 * @constructor France IGN map type for google maps.
 * @extends {vgps3.topo.AbstractTopo}
 */
vgps3.topo.fr.Map = function() {
  goog.base(this);

  /**
   * @type {?string}
   * @private
   */
  this.tilesUrl_;

  /**
   * @type {string}
   */
  this.layerName_ = 'GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.CLASSIQUE';
};
goog.inherits(vgps3.topo.fr.Map, vgps3.topo.AbstractTopo);


/**
 * @override
 */
vgps3.topo.fr.Map.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);
  this.setBounds_([
    [42.3058, -0.7618, 46.4181, 7.9109],  // FXX
    [11.7, -64, 18.18, -59],  // ANF
    [-40, 76, -36, 79],  // ASP
    [-68.62, 132.56, -64.03, 144.54],  // ATF
    [-48, 47, -44, 55],  // CRZ
    [15.75, -63.2, 17.5, -60],  // GLP
    [-4.3, -62.1, 11.5, -46],  // GUF
    [-53, 62, -45, 76],  // KER
    [11.7, -64, 15.7, -59],  // MTQ
    [-17.5, 40, 3, 56],  //MYT
    [-24.3, 160, -17.1, 170],  // NCL
    [-28.2, -160, 11, -108],  // PYF
    [-26.2, 37.5, -17.75, 60],  // REU
    [17.75, -63, 17.99, -62.7],  // SBA
    [18, -63.19, 18.18, -62.9],  // SMA
    [43.5, -60, 52, -50],  // SPM
    [-14.6, -178.5, -12.8, -175.8] // WLF
  ]);
  this.setCopyright_('img/topo.fr.png', 'http://www.ign.fr/');
  this.registerMapType_(vgps3.topo.fr.MapTypeId.TERRAIN, this.getMapType_());
  this.registerMapType_(vgps3.topo.fr.MapTypeId.SCAN, this.getScanMapType_());
  var key = vgps.getDomainKey(vgps3.topo.fr.API_KEYS);
  this.tilesUrl_ = null == key ? null : vgps3.topo.fr.TILES_URL.replace('{API_KEY}', key);
};


/**
 * @override
 */
vgps3.topo.fr.Map.prototype.getMapType_ = function() {
  return new google.maps.ImageMapType({
    getTileUrl: goog.bind(this.getTileUrl_, this),
    tileSize: new google.maps.Size(256, 256),
    minZoom: 6,
    maxZoom: 17,
    name: 'France',
    alt: 'Cartes IGN France'
  });
};

/**
 * @return {google.maps.ImageMapType} The map type.
 * @protected
 */
vgps3.topo.fr.Map.prototype.getScanMapType_ = function() {
  return new google.maps.ImageMapType({
    getTileUrl: goog.bind(this.getTileUrl_, this),
    tileSize: new google.maps.Size(256, 256),
    minZoom: 6,
    maxZoom: 17,
    name: 'France (scan)',
    alt: 'Cartes IGN France'
  });
};

/**
 * @override
 */
vgps3.topo.fr.Map.prototype.mapTypeChangeHandler_ = function() {
  if (this.gMap_.getMapTypeId() === vgps3.topo.fr.MapTypeId.TERRAIN) {
    this.layerName_ = 'GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.CLASSIQUE';
    this.showHandler_();
  } else if (this.gMap_.getMapTypeId() === vgps3.topo.fr.MapTypeId.SCAN) {
    this.layerName_ = 'GEOGRAPHICALGRIDSYSTEMS.MAPS';
    this.showHandler_();
  } else {
    this.hideHandler_();
  }
};

/**
 * @override
 */
vgps3.topo.fr.Map.prototype.getTileUrl_ = function(coord, zoom) {
  var numTiles = Math.pow(2, zoom);
  if (!this.tilesUrl_ || !this.isTileVisible_(coord, zoom)) {
    return null;
  }

  return this.tilesUrl_
      .replace('{zoom}', zoom.toString())
      .replace('{x}', (((coord.x % numTiles) + numTiles) % numTiles).toString())
      .replace('{y}', coord.y.toString())
      .replace('{layer}', this.layerName_);
};


/**
 * @define {string} The API keys format='domain1="key1" domain2="key2" *="fallback key"'.
 * @see http://api.ign.fr/accueil
 */
vgps3.topo.fr.API_KEYS = '';


/**
 * @define {string} The url for tiles.
 */
vgps3.topo.fr.TILES_URL = 'https://wxs.ign.fr/{API_KEY}/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER={layer}&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={zoom}&TILEROW={y}&TILECOL={x}';


/**
 * @enum {string} The supported map types
 */
vgps3.topo.fr.MapTypeId = {
  TERRAIN: 'vgps3-topo-fr-terrain',
  SCAN: 'vgps3-topo-fr-scan'
};

goog.exportSymbol('vgps3.topo.fr.Map', vgps3.topo.fr.Map);
goog.exportSymbol('vgps3.topo.fr.Map.init', vgps3.topo.fr.Map.prototype.init);
