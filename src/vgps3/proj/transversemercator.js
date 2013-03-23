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
 * @fileoverview Transverse Mercator projection.
 *
 * Original code by Nianwei Liu:
 * @see http://code.google.com/p/google-maps-utility-library-v3/source/browse/trunk/arcgislink/src/arcgislink.js
 * @see http://en.wikipedia.org/wiki/Transverse_Mercator_projection
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.proj.TransverseMercator');

goog.require('goog.math');



/**
 * Create a Transverse Mercator Projection. The <code>params</code> passed in constructor should contain the
 * following properties:
 *   -wkid: well-known id
 *   -semi_major:  ellipsoidal semi-major axis in meters
 *   -unit: meters per unit
 *   -inverse_flattening: inverse of flattening of the ellipsoid where 1/f  =  a/(a - b)
 *   -Scale Factor: scale factor at origin
 *   -latitude_of_origin: phi0, latitude of the false origin
 *   -central_meridian: lamda0, longitude of the false origin  (with respect to the prime meridian)
 *   -false_easting: FE, false easting, the Eastings value assigned to the natural origin
 *   -false_northing: FN, false northing, the Northings value assigned to the natural origin
 *
 * e.g. Georgia West State Plane NAD83 Feet:
 *   var gawsp83  = new TransverseMercator({wkid: 102667, semi_major:6378137.0,
 *   inverse_flattening:298.257222101,central_meridian:-84.16666666666667, latitude_of_origin: 30.0,
 *   scale_factor:0.9999, false_easting:2296583.333333333, false_northing:0, unit: 0.3048006096012192});
 *
 * @param {Object.<string, *>} parameters
 * @constructor
 * @implements {vgps3.proj.IProj}
 */
vgps3.proj.TransverseMercator = function(parameters) {
  this.setParameters(parameters);
};


/**
 * Sets the projection parameters.
 *
 * @param {Object.<string, *>} parameters
 */
vgps3.proj.TransverseMercator.prototype.setParameters = function(parameters) {
  parameters = parameters || {};
  this.a_ = parameters.semi_major / parameters.unit;
  var f_i = parameters.inverse_flattening;
  this.k0_ = parameters.scale_factor;
  var phi0 = goog.math.toRadians(parameters.latitude_of_origin);
  this.lamda0_ = goog.math.toRadians(parameters.central_meridian);
  this.FE_ = parameters.false_easting;
  this.FN_ = parameters.false_northing;
  var f = 1.0 / f_i;
  /* e: eccentricity of the ellipsoid where e^2  =  2f - f^2 */
  this.es_ = 2 * f - f * f;
  /* e^4 */
  this.ep4_ = this.es_ * this.es_;
  /* e^6 */
  this.ep6_ = this.ep4_ * this.es_;
  /* e'  second eccentricity where e'^2  =  e^2 / (1-e^2) */
  this.eas_ = this.es_ / (1 - this.es_);
  this.M0_ = this.calc_m_(phi0, this.a_, this.es_, this.ep4_, this.ep6_);
};


/**
 * @override
 */
vgps3.proj.TransverseMercator.prototype.forward = function(lat, lng) {
  var phi = goog.math.toRadians(lat);
  var lamda = goog.math.toRadians(lng);
  var nu = this.a_ / Math.sqrt(1 - this.es_ * Math.pow(Math.sin(phi), 2));
  var T = Math.pow(Math.tan(phi), 2);
  var C = this.eas_ * Math.pow(Math.cos(phi), 2);
  var A = (lamda - this.lamda0_) * Math.cos(phi);
  var M = this.calc_m_(phi, this.a_, this.es_, this.ep4_, this.ep6_);
  var x = this.FE_ + this.k0_ * nu * (A + (1 - T + C) * Math.pow(A, 3) / 6 + (5 - 18 * T + T * T + 72 * C - 58 * this.eas_) * Math.pow(A, 5) / 120);
  var y = this.FN_ + this.k0_ * (M - this.M0_) + nu * Math.tan(phi) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * Math.pow(A, 4) / 120 + (61 - 58 * T + T * T + 600 * C - 330 * this.eas_) * Math.pow(A, 6) / 720);
  return {x: x, y: y};
};


/**
 * @override
 */
vgps3.proj.TransverseMercator.prototype.inverse = function(x, y) {
  var e1 = (1 - Math.sqrt(1 - this.es_)) / (1 + Math.sqrt(1 - this.es_));
  var M1 = this.M0_ + (y - this.FN_) / this.k0_;
  var mu1 = M1 / (this.a_ * (1 - this.es_ / 4 - 3 * this.ep4_ / 64 - 5 * this.ep6_ / 256));
  var phi1 = mu1 + (3 * e1 / 2 - 27 * Math.pow(e1, 3) / 32) * Math.sin(2 * mu1) + (21 * e1 * e1 / 16 - 55 * Math.pow(e1, 4) / 32) * Math.sin(4 * mu1) + (151 * Math.pow(e1, 3) / 6) * Math.sin(6 * mu1) + (1097 * Math.pow(e1, 4) / 512) * Math.sin(8 * mu1);
  var C1 = this.eas_ * Math.pow(Math.cos(phi1), 2);
  var T1 = Math.pow(Math.tan(phi1), 2);
  var N1 = this.a_ / Math.sqrt(1 - this.es_ * Math.pow(Math.sin(phi1), 2));
  var R1 = this.a_ * (1 - this.es_) / Math.pow((1 - this.es_ * Math.pow(Math.sin(phi1), 2)), 3 / 2);
  var D = (x - this.FE_) / (N1 * this.k0_);
  var phi = phi1 - (N1 * Math.tan(phi1) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * this.eas_) * Math.pow(D, 4) / 24 + (61 + 90 * T1 + 28 * C1 + 45 * T1 * T1 - 252 * this.eas_ - 3 * C1 * C1) * Math.pow(D, 6) / 720);
  var lamda = this.lamda0_ + (D - (1 + 2 * T1 + C1) * Math.pow(D, 3) / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * this.eas_ + 24 * T1 * T1) * Math.pow(D, 5) / 120) / Math.cos(phi1);
  return {lng: goog.math.toDegrees(lamda), lat: goog.math.toDegrees(phi)};
};


/**
 * @override
 */
vgps3.proj.TransverseMercator.prototype.getOrigin = function() {
  return {x: 0, y: 0};
};


/**
 * calc_m_
 * @param {number} phi
 * @param {number} a
 * @param {number} es
 * @param {number} ep4
 * @param {number} ep6
 * @return {number}
 *
 * @private
 */
vgps3.proj.TransverseMercator.prototype.calc_m_ = function(phi, a, es, ep4, ep6) {
  return a * ((1 - es / 4 - 3 * ep4 / 64 - 5 * ep6 / 256) * phi - (3 * es / 8 + 3 * ep4 / 32 + 45 * ep6 / 1024) * Math.sin(2 * phi) + (15 * ep4 / 256 + 45 * ep6 / 1024) * Math.sin(4 * phi) - (35 * ep6 / 3072) * Math.sin(6 * phi));
};
