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

goog.provide('vgps3.chart.Overlays');

goog.require('goog.array');
goog.require('goog.events.EventType');
goog.require('goog.style');
goog.require('goog.ui.Component');

/**
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
vgps3.chart.Overlays = function(opt_domHelper) {
    goog.base(this, opt_domHelper);

    /**
     * @type {Array.<Element>}
     * @private
     */
    this.layers_ = [];

    /**
     * @type {!Element}
     * @private
     */
    this.cursor_;
};
goog.inherits(vgps3.chart.Overlays, goog.ui.Component);

/**
 * Add a layer to the set of overlays
 *
 * @return {Element}
 */
vgps3.chart.Overlays.prototype.addLayer = function() {
    if (!this.isInDocument()) {
        throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
    }
    var el = this.getDomHelper().createDom('div', 'vgps3-chart-overlay');
    goog.style.setOpacity(el, this.layers_.length > 0 ? 0.3 : 0.9);
    goog.style.setStyle(el, 'zIndex', 100 - this.layers_.length);
    goog.dom.appendChild(this.getElement(), el);
    this.layers_.push(el);
    return el;
};

/**
 * Set the cursor position
 * @param {number} position 0...1.
 */
vgps3.chart.Overlays.prototype.moveTo = function(position) {
    var width = goog.style.getSize(this.getElement()).width;

    goog.style.setPosition(this.cursor_, Math.round(width * position));
};

/**
 * Returns the cursor position
 * @return {number} position 0...1.
 */
vgps3.chart.Overlays.prototype.getPosition = function() {
    var width = goog.style.getSize(this.getElement()).width,
        offset = goog.style.getPosition(this.cursor_).x;


    return offset / width;
};

/** @override */
vgps3.chart.Overlays.prototype.createDom = function() {
    this.element_ = this.dom_.createElement('div');
    goog.style.setStyle(this.element_, {
        width: '100%',
        height: '100%'
    });
};

/** @override */
vgps3.chart.Overlays.prototype.canDecorate = function(element) {
  return false;
};

/** @override */
vgps3.chart.Overlays.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    this.cursor_ = this.getDomHelper().createDom('div', 'vgps3-chart-cursor');
    this.getElement().appendChild(this.cursor_);

    this.getHandler()
        .listen(
            this.getElement(),
            [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEMOVE],
            this.handleMouseEvents_
        );
};

/**
 * @param {goog.events.BrowserEvent} event
 * @private
 */
vgps3.chart.Overlays.prototype.handleMouseEvents_ = function(event) {
    var width = goog.style.getSize(this.getElement()).width,
        offsetX = event.clientX - goog.style.getPosition(this.getElement()).x,
        position = offsetX / width;


    event.preventDefault();

    this.moveTo(position);
};

/** @override */
vgps3.chart.Overlays.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
};

/** @override */
vgps3.chart.Overlays.prototype.disposeInternal = function() {
    var overlays = this;
    delete this.cursor_;
    goog.array.forEach(this.layers_, function(el, index) {
        delete overlays.layers_[index];
    });
};


