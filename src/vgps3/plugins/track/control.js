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

goog.provide('vgps3.track.Control');

goog.require('goog.dom');
goog.require('goog.soy');
goog.require('vgps3.track.templates');



/**
 * @param {google.maps.Map} map
 * @param {string} template
 * @param {google.maps.ControlPosition} position
 * @constructor
 */
vgps3.track.Control = function(map, template, position) {
  /**
  * @type {!Element}
  * @private
  */
  this.dom_ = goog.dom.createDom('div', 'map-ctrl');

  /**
   * @type {string}
   * @private
   */
  this.template_ = template;

  map.controls[position].push(this.dom_);
};


/**
 * @param {Object.<string, *>} templateData
 */
vgps3.track.Control.prototype.update = function(templateData) {
  goog.soy.renderElement(
      this.dom_,
      vgps3.track.templates[this.template_],
      templateData
  );
};




