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
goog.require('goog.net.Cookies');
goog.require('goog.Timer');



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
  this.gMap_;

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
  this.gMap_ = vgps.getGoogleMap();
  this.control_ = new vgps3.Control(
      this.gMap_,
      vgps3.path.templates.pathControl,
      google.maps.ControlPosition.RIGHT_TOP
      );
  this.control_.update();
  this.element_ = goog.dom.getFirstElementChild(this.control_.getElement());
  goog.style.showElement(this.element_, false);
  this.events_.listen(this.control_.getElement(), 'mousedown', this.clickHandler_);
  goog.style.setStyle(this.control_.getElement(), 'cursor', 'pointer');
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
    /**
     * @type {google.maps.LatLng}
     */
    var center = this.gMap_.getCenter();

    if (!goog.isDef(this.line_)) {
      var cookies = new goog.net.Cookies(document);

      this.createLine_();

      if ('hide' !== cookies.get(vgps3.path.HELP, 'show')) {
        var help = new google.maps.InfoWindow({
          content: vgps3.path.templates.help(),
          position: center
        });
        help.open(this.gMap_);
        goog.Timer.callOnce(help.close, 8000, help);
        cookies.set(vgps3.path.HELP, 'hide');
      }
    }

    this.line_.setPath([
      google.maps.geometry.spherical.computeOffset(center, 15000, 270),
      google.maps.geometry.spherical.computeOffset(center, 15000, 90)
    ]);
    this.line_.setVisible(true);
    this.updateControl_();
  } else {
    this.line_.setVisible(false);
  }

  goog.style.showElement(this.element_, !visible);
};

/**
 * @private
 */
vgps3.path.Path.prototype.createLine_ = function() {
  var that = this;

  this.line_ = new google.maps.Polyline({
    editable: true,
    map: this.gMap_,
    strokeColor: 'black',
    strokeWeight: 4,
    zIndex: 100
  });

  google.maps.event.addListener(
      this.line_,
      'mousemove',
      goog.bind(function() { that.updateControl_(); }, that)
  );

  google.maps.event.addListener(
      this.line_,
      'rightclick',
      function(event) {
        if (goog.isDef(event.vertex)) {
          var path = this.getPath();
          path.getLength() > 2 && path.removeAt(event.vertex);
        }
      }
  );
}


/**
 * @private
 */
vgps3.path.Path.prototype.updateControl_ = function() {
  this.element_.innerHTML =
      Math.round(google.maps.geometry.spherical.computeLength(this.line_.getPath()) / 10) / 100
    + ' km';

};

/**
 * @const
 */
vgps3.path.HELP = 'vgps3.path.help';

goog.exportSymbol('vgps3.path.Path', vgps3.path.Path);
goog.exportSymbol('vgps3.path.Path.init', vgps3.path.Path.prototype.init);
