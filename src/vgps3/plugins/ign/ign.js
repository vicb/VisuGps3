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
 * @fileoverview
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.ign.Map');

goog.require('vgps3.IPlugin');
goog.require('vgps3.Map');



/**
 * @constructor
 * @implements {vgps3.IPlugin}
 */
vgps3.ign.Map = function() {
};


/**
 * @override
 */
vgps3.ign.Map.prototype.init = function(vgps) {
  var gMap = vgps.getGoogleMap();
  gMap.mapTypes.set('ign_terrain', this.getIgnMapType_());
};


/**
 * @return {google.maps.ImageMapType}
 * @private
 */
vgps3.ign.Map.prototype.getIgnMapType_ = function() {
  return new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      var numTiles = 1 << zoom;
      if (coord.y < 0 || coord.y >= numTiles) {
        return null;
      }
      return vgps3.ign.TILES_URL
                .replace('{zoom}', zoom)
                .replace('{x}', (((coord.x % numTiles) + numTiles) % numTiles).toString(10))
                .replace('{y}', coord.y)
                .replace('{layer}', 'GEOGRAPHICALGRIDSYSTEMS.MAPS');

    },
    tileSize: new google.maps.Size(256, 256),
    minZoom: 6,
    maxZoom: 17,
    name: 'IGN',
    alt: 'Cartes IGN France'
  });
};


/**
 * @define {string}
 */
vgps3.ign.API_KEY = 'tyujsdxmzox31ituc2uw0qwl';


/**
 * @define {string}
 */
vgps3.ign.TILES_URL = 'http://gpp3-wxs.ign.fr/' + vgps3.ign.API_KEY + '/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER={layer}&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={zoom}&TILEROW={y}&TILECOL={x};';



