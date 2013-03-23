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
 * @fileoverview Decorates an IProj for google maps.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.proj.GProj');

goog.require('vgps3.proj.IProj');



/**
 * @param {vgps3.proj.IProj} projection
 * @param {number=} opt_scale0 The resolution at zoom level 0 = world width in meters.
 * @constructor
 */
vgps3.proj.GProj = function(projection, opt_scale0) {
  /**
   * @type {vgps3.proj.IProj}
   * @private
   */
  this.projection_ = projection;

  /**
   * @type {number} The resolution at zoom level 0
   * @private
   */
  this.scale0_;

  /**
   * @type {number}
   * @private
   */
  this.x0_ = projection.getOrigin().x;

  /**
   * @type {number}
   * @private
   */
  this.y0_ = projection.getOrigin().y;

  this.setScale0(opt_scale0);
};


/**
 * Forward projection
 *
 * @param {google.maps.LatLng} latLng The coordinates.
 *
 * @return {google.maps.Point} The projected coordinates.
 */
vgps3.proj.GProj.prototype.fromLatLngToPoint = function(latLng) {
  var coord = this.projection_.forward(latLng.lat(), latLng.lng());
  return new google.maps.Point(
      (coord.x - this.x0_) / this.scale0_,
      (this.y0_ - coord.y) / this.scale0_
  );
};


/**
 * Inverse projection
 *
 * @param {google.maps.Point} point The projected coordinates.
 * @param {boolean=} opt_nowrap Whether to wrap the coordinates.
 *
 * @return {google.maps.LatLng} latLng The coordinates.
 */
vgps3.proj.GProj.prototype.fromPointToLatLng = function(point, opt_nowrap) {
  var coord = this.projection_.inverse(
      this.x0_ + point.x * this.scale0_,
      this.y0_ - point.y * this.scale0_
      );
  return new google.maps.LatLng(coord.lat, coord.lng, opt_nowrap);
};


/**
 * @param {number=} scale0
 */
vgps3.proj.GProj.prototype.setScale0 = function(scale0) {
  this.scale0_ = scale0 ? scale0 : 1;
};

goog.exportSymbol('vgps3.proj.GProj', vgps3.proj.GProj);
goog.exportSymbol('vgps3.proj.GProj.fromLatLngToPoint', vgps3.proj.GProj.prototype.fromLatLngToPoint);
goog.exportSymbol('vgps3.proj.GProj.fromPointToLatLng', vgps3.proj.GProj.prototype.fromPointToLatLng);
