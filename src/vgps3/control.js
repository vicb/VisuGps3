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

goog.require('goog.Disposable');
goog.require('goog.dom');
goog.require('goog.soy');
goog.require('vgps3.track.templates');



/**
 * @param {google.maps.Map} map
 * @param {!Function} template
 * @param {google.maps.ControlPosition} position
 * @constructor
 * @extends {goog.Disposable}
 */
vgps3.Control = function(map, template, position) {
  /**
  * @type {!Element}
  * @private
  */
  this.dom_ = goog.dom.createDom('div', 'map-ctrl');

  /**
   * @type {!Function} The template to render in the control
   * @private
   */
  this.template_ = template;

  goog.base(this);

  map.controls[position].push(this.dom_);
};
goog.inherits(vgps3.Control, goog.Disposable);


/**
 * Updates the control by rendering the template.
 *
 * @param {Object=} opt_templateData
 */
vgps3.Control.prototype.update = function(opt_templateData) {
  goog.soy.renderElement(this.dom_, this.template_, opt_templateData);
};


/**
 * @return {!Element} The control division.
 */
vgps3.Control.prototype.getElement = function() {
  return this.dom_;
};


/**
 * @override
 */
vgps3.Control.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.dom.removeNode(this.dom_);
  delete this.dom_;
};


