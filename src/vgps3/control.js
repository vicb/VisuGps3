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
 * @fileoverview Google maps control.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.Control');

goog.require('goog.Disposable');
goog.require('goog.dom');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.iframe');
goog.require('goog.soy');
goog.require('vgps3.track.templates');



/**
 * @param {google.maps.Map} map The map instance.
 * @param {!Function} template A template for rendering the control.
 * @param {google.maps.ControlPosition} position The control position.
 * @param {boolean=} opt_iframe Whether to use an iframe shim.
 *
 * @constructor
 * @extends {goog.Disposable}
 */
vgps3.Control = function(map, template, position, opt_iframe) {
  goog.base(this);

  /**
   * @type {!Function} The template to render in the control
   * @private
   */
  this.template_ = template;

  /**
   * @type {!Element}
   * @private
   */
  this.dom_;

  /**
   * @type {?string} An extra class to add to the control
   * @private
   */
  this.extraClass_;

  /**
   * @type {google.maps.ControlPosition}
   * @private
   */
  this.position_ = position;

  /**
   * @type {boolean|undefined}
   * @private
   */
  this.useIframe_ = opt_iframe;

  /**
   * @type {google.maps.Map}
   * @private
   */
  this.gMap_ = map;
  /**
   * @type {Element}
   * @private
   */
  this.shim_;
};
goog.inherits(vgps3.Control, goog.Disposable);


/**
 * Updates the control by rendering the template.
 *
 * @param {Object=} opt_templateData The view data.
 */
vgps3.Control.prototype.update = function(opt_templateData) {
  if (!this.dom_) {
    if (this.useIframe_) {
      this.shim_ = goog.dom.iframe.createBlank(new goog.dom.DomHelper());

      goog.style.setStyle(this.shim_, {
        zIndex: -100000,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      });
    }

    this.gMap_.controls[this.position_].push(
        goog.dom.createDom(
        'div',
        ['map-ctrl', this.extraClass_].join(' '),
        this.dom_ = goog.dom.createElement('div'),
        this.shim_
        ));
  }

  goog.soy.renderElement(
      this.dom_,
      this.template_,
      opt_templateData
  );
};


/**
 * Adds a class to the control div
 * @param {?string} extraClass An extra class to add to the control.
 */
vgps3.Control.prototype.setExtraClass = function(extraClass) {
  this.extraClass_ = goog.isNull(extraClass) ? null : extraClass;
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
  goog.dom.removeNode(this.dom_.parentNode);
  delete this.dom_;
  this.shim_ && goog.dom.removeNode(this.shim_);
  delete this.shim_;
};


