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
 * @fileoverview Iberpix projection.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.proj.Iberpix');

goog.require('vgps3.proj.TransverseMercator');



/**
 * Iberpix projection
 *
 * @param {number} zone The tm projection zone.
 *
 * @constructor
 * @extends {vgps3.proj.TransverseMercator}
 */
vgps3.proj.Iberpix = function(zone) {
  goog.base(this, this.getTmParameters_(zone));
};
goog.inherits(vgps3.proj.Iberpix, vgps3.proj.TransverseMercator);


/**
 * @param {number} zone The tm zone.
 */
vgps3.proj.Iberpix.prototype.setZone = function(zone) {
  this.setParameters(this.getTmParameters_(zone));
};


/**
 *  Returns the rm parameters for the given zone.
 *
 * @param zone
 * @return {Object.<string, *>}
 * @private
 */
vgps3.proj.Iberpix.prototype.getTmParameters_ = function(zone) {
  return {
    semi_major: vgps3.proj.IProj.wgs84.A,
    inverse_flattening: vgps3.proj.IProj.wgs84.IF,
    unit: 1,
    scale_factor: 0.9996,
    false_easting: 500000,
    latitude_of_origin: 0,
    false_northing: 0,
    central_meridian: zone * 6 - 183
  };
};
