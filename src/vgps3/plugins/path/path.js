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

goog.provide('vgps3.path.Path');

goog.require('goog.Timer');
goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.style');
goog.require('vgps3.Control');
goog.require('vgps3.path.templates');



/**
 * @constructor
 * @implements {vgps3.IPlugin}
 */
vgps3.path.Path = function() {
  /**
  * @type {vgps3.Map}
  * @private
  */
  this.vgps_;

  /**
  * @type {google.maps.Map}
  * @private
  */
  this.map_;

  /**
   * @type {google.maps.Polyline}
   * @private
   */
  this.line_;

  /**
   * @type {vgps3.Control}
   * @private
   */
  this.control_;

  /**
   * @type {Element}
   * @private
   */
  this.element_;

  /**
   * @type {goog.events.EventHandler}
   * @private
   */
  this.events_ = new goog.events.EventHandler(this);
};


/**
 * @override
 */
vgps3.path.Path.prototype.init = function(vgps) {
  this.vgps_ = vgps;
  this.map_ = vgps.getGoogleMap();
  this.control_ = new vgps3.Control(
      this.map_,
      vgps3.path.templates.pathControl,
      google.maps.ControlPosition.RIGHT_TOP
      );
  this.control_.update(null);
  this.element_ = goog.dom.getFirstElementChild(this.control_.getElement());
  goog.style.showElement(this.element_, false);
  this.events_.listen(this.control_.getElement(), 'mousedown', this.clickHandler_);
};


/**
 *
 * @param {goog.events.Event} event
 */
vgps3.path.Path.prototype.clickHandler_ = function(event) {
  /**
   * @type {boolean}
   */
  var visible = goog.style.isElementShown(this.element_);

  if (!visible) {
    var that = this;

    if (!goog.isDef(this.line_)) {
      this.line_ = new google.maps.Polyline({
        editable: true,
        map: this.map_,
        strokeColor: 'black',
        strokeWeight: 4,
        zIndex: 100
      });

      google.maps.event.addListener(
          this.line_,
          'mouseup',
          goog.bind(function() { that.updateControl_(); }, that)
      );
    } else {
      this.line_.setVisible(true);
    }

    /**
     * @type {google.maps.LatLng}
     */
    var src = this.map_.getCenter();

    this.line_.setPath([
      src,
      google.maps.geometry.spherical.computeOffset(src, 30000, 90)
    ]);

    this.updateControl_();
  } else {
    this.line_.setVisible(false);
  }

  goog.style.showElement(this.element_, !visible);
};


/**
 * @private
 */
vgps3.path.Path.prototype.updateControl_ = function() {
  this.element_.innerHTML =
      Math.round(google.maps.geometry.spherical.computeLength(this.line_.getPath()) / 10) / 100
    + ' km';

};




