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
 * @fileoverview Swisstopo projection.
 * @see http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/projections.html
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.proj.Swisstopo');



/**
 * Swisstopo projection
 *
 * @constructor
 * @implements {vgps3.proj.IProj}
 */
vgps3.proj.Swisstopo = function() {};


/**
 * @override
 */
vgps3.proj.Swisstopo.prototype.forward = function(lat, lng) {
  lat = (this.toSecSex_(lat) - 169028.66) / 10000;
  lng = (this.toSecSex_(lng) - 26782.5) / 10000;

  var lat2 = Math.pow(lat, 2),
      lat3 = lat * lat2,
      lng2 = Math.pow(lng, 2),
      lng3 = lng * lng2;

  return {
    x: 600072.37 + 211455.93 * lng - 10938.51 * lng * lat - 0.36 * lng * lat2 - 44.54 * lng3,
    y: 200147.07 + 308807.95 * lat + 3745.25 * lng2 + 76.63 * lat2 - 194.56 * lng2 * lat + 119.79 * lat3
  };
};


/**
 * @override
 */
vgps3.proj.Swisstopo.prototype.inverse = function(x, y) {
  x = (x - 600000) / 1000000;
  y = (y - 200000) / 1000000;

  var y2 = Math.pow(y, 2),
      y3 = y * y2,
      x2 = Math.pow(x, 2),
      x3 = x * x2;

  return {
    lat: 100 / 36 * (16.9023892 + 3.238272 * y - 0.270978 * x2 - 0.002528 * y2 - 0.0447 * x2 * y - 0.0140 * y3),
    lng: 100 / 36 * (2.6779094 + 4.728982 * x + 0.791484 * x * y + 0.1306 * x * y2 - 0.0436 * x3)
  };
};


/**
 * @override
 */
vgps3.proj.Swisstopo.prototype.getOrigin = function() {
  return {x: 420000, y: 350000};
};


/**
 * Converts degree to sexagecimal seconds.
 *
 * @param {number} degree The value expressed in decimal degree.
 *
 * @return {number} The value expressed in sexagecimal second.
 * @private
*/
vgps3.proj.Swisstopo.prototype.toSecSex_ = function(degree) {
  var deg = parseInt(degree, 10),
      min = parseInt((degree - deg) * 60, 10),
      sec = (((degree - deg) * 60) - min) * 60;

  return sec + min * 60 + deg * 3600;
};
