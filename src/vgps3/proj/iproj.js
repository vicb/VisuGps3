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
 * @fileoverview interface for projection.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.proj.IProj');



/**
 * Interface for projections.
 *
 * @interface
 */
vgps3.proj.IProj = function() {};


/**
 * Forward transformation
 *
 * @param {number} lat The latitude.
 * @param {number} lng The longitude.
 *
 * @return {{x: number, y: number}}
 *
 */
vgps3.proj.IProj.prototype.forward = function(lat, lng) {};


/**
 * Backward transformation
 *
 * @param {number} x
 * @param {number} y
 *
 * @return {{lat: number, lng: number}}
 */
vgps3.proj.IProj.prototype.inverse = function(x, y) {};


/**
 * Projection origin
 *
 * @return {{x: number, y: number}}
 */
vgps3.proj.IProj.prototype.getOrigin = function() {};


/**
 * @const {{A: number, B: number, IF: number}}
 */
vgps3.proj.IProj.wgs84 = {
  A: 6378137,
  B: 6356752.314,
  IF: 298.257220143
};
