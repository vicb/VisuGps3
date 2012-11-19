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

goog.provide('vgps3.chart.Sliders');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('goog.ui.Slider');
goog.require('soy');



/**
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
vgps3.chart.Sliders = function(opt_domHelper) {
  /**
  * @type {Element}
  * @private
  */
  this.title_;

  goog.base(this, opt_domHelper);
};
goog.inherits(vgps3.chart.Sliders, goog.ui.Component);


/**
 * @param {string} label
 * @param {Element} element
 * @param {string} color
 */
vgps3.chart.Sliders.prototype.addSlider = function(label, element, color) {
  var slider = new goog.ui.Slider(),
      thumb;

  this.addChild(slider, true);

  // BUG: The thumb would move down on each click (css top keep increasing)
  slider.setMoveToPointEnabled(true);
  slider.setValue(goog.style.getOpacity(element) * 100);
  thumb = goog.dom.getElementsByTagNameAndClass(null, goog.ui.Slider.THUMB_CSS_CLASS, slider.getElement())[0];
  goog.style.setStyle(thumb, 'background-color', color);
  goog.style.setOpacity(thumb, goog.style.getOpacity(element));

  this.getHandler().listen(
      slider,
      goog.ui.Component.EventType.CHANGE,
      function(event) {
        var opacity = slider.getValue() / 100;
        goog.style.setOpacity(element, opacity);
        goog.style.setOpacity(thumb, Math.max(0.2, opacity));
      }
  );
};


/**
 * @return {Element}
 */
vgps3.chart.Sliders.prototype.getTitleElement = function() {
  if (!this.isInDocument()) {
    throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
  }

  return this.title_;
};


/** @override */
vgps3.chart.Sliders.prototype.createDom = function() {
  this.element_ = this.dom_.createElement('div');

  goog.dom.append(
      this.element_,
      this.title_ = goog.dom.createDom(
      'div',
      'vgps3-sliders-title',
      goog.dom.htmlToDocumentFragment('<h1>VisuGps?</h1>')
      ));
  goog.style.setStyle(this.element_, {
    width: '100%',
    height: '100%'
  });
};


/** @override */
vgps3.chart.Sliders.prototype.canDecorate = function(element) {
  return false;
};


/** @override */
vgps3.chart.Sliders.prototype.disposeInternal = function() {
  delete this.title_;
};
