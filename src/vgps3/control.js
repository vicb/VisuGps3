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
 * @fileoverview Google maps control.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.Control');

goog.require('goog.dom');
goog.require('goog.soy');
goog.require('vgps3.track.templates');



/**
 * @param {google.maps.Map} map
 * @param {!Function} template
 * @param {google.maps.ControlPosition} position
 * @constructor
 */
vgps3.Control = function(map, template, position) {
  /**
  * @type {!Element}
  * @private
  */
  this.dom_ = goog.dom.createDom('div', 'map-ctrl');

  /**
   * @type {!Function}
   * @private
   */
  this.template_ = template;

  map.controls[position].push(this.dom_);
};


/**
 * @param {Object.<string, *>} templateData
 */
vgps3.Control.prototype.update = function(templateData) {
  goog.soy.renderElement(
      this.dom_,
      this.template_,
      templateData
  );
};


/**
 * @return {!Element}
 */
vgps3.Control.prototype.getElement = function() {
  return this.dom_;
};


