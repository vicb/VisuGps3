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
 * @fileoverview Measure paths.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.path.Path');

goog.require('goog.Timer');
goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.net.Cookies');
goog.require('goog.style');
goog.require('vgps3.Control');
goog.require('vgps3.PluginBase');
goog.require('vgps3.path.templates');



/**
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.path.Path = function() {
  /**
   * @type {google.maps.Polyline} The current path
   * @private
   */
  this.line_;

  /**
   * @type {vgps3.Control} The google map control
   * @private
   */
  this.control_;

  /**
   * @type {Element} The span where to display the distance
   * @private
   */
  this.element_;

  /**
   * @type {google.maps.InfoWindow} Help message
   * @private
   */
  this.infoWindow_;

  goog.base(this);

};
goog.inherits(vgps3.path.Path, vgps3.PluginBase);


/**
 * @override
 */
vgps3.path.Path.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);
  this.control_ = new vgps3.Control(
      this.gMap_,
      vgps3.path.templates.pathControl,
      google.maps.ControlPosition.RIGHT_TOP
      );
  this.control_.update();
  this.element_ = goog.dom.getFirstElementChild(this.control_.getElement());
  goog.style.setElementShown(this.element_, false);
  this.getHandler().listen(this.control_.getElement(), 'mousedown', this.clickHandler_);
  goog.style.setStyle(this.control_.getElement(), 'cursor', 'pointer');
};


/**
 * @override
 */
vgps3.path.Path.prototype.requireGoogleMapLibs = function() {
  return ['geometry'];
};


/**
 * @override
 */
vgps3.path.Path.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.line_.setMap(null);
  delete this.line_;
  goog.dom.removeNode(this.element_);
  delete this.element_;
  delete this.infoWindow_;
  goog.dispose(this.control_);
};


/**
 * Toggles distance visibility when the control is clicked.
 *
 * @param {goog.events.Event} event
 * @private
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
      // Some help when the control is used for the first time
      if ('hide' !== cookies.get(vgps3.path.COOKIE_NAME, 'show')) {
        this.infoWindow_ = new google.maps.InfoWindow({content: vgps3.path.templates.help(), position: center});
        this.infoWindow_.open(this.gMap_);
        goog.Timer.callOnce(this.infoWindow_.close, 8000, this.infoWindow_);
        cookies.set(vgps3.path.COOKIE_NAME, 'hide');
      }
    }

    var mapViewSpan = this.gMap_.getBounds().toSpan();

    this.line_.setPath([
      new google.maps.LatLng(center.lat(), center.lng() + mapViewSpan.lng() / 5),
      new google.maps.LatLng(center.lat(), center.lng() - mapViewSpan.lng() / 5)
    ]);
    this.line_.setVisible(true);
    this.updateControl_();
  } else {
    this.line_.setVisible(false);
  }

  goog.style.setElementShown(this.element_, !visible);
};


/**
 * @private
 */
vgps3.path.Path.prototype.createLine_ = function() {
  var that = this;

  this.line_ = new google.maps.Polyline({
    editable: true,
    draggable: true,
    map: this.gMap_,
    strokeColor: 'black',
    strokeWeight: 4,
    zIndex: 100
  });

  google.maps.event.addListener(this.line_, 'mousemove', goog.bind(that.updateControl_, that));

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
};


/**
 * Updates the control with the current distance.
 *
 * @private
 */
vgps3.path.Path.prototype.updateControl_ = function() {
  this.element_.innerHTML =
      Math.round(google.maps.geometry.spherical.computeLength(this.line_.getPath()) / 10) / 100 + ' km';
};


/**
 * @const
 * @type {string}
 */
vgps3.path.COOKIE_NAME = 'vgps3.path.help';

goog.exportSymbol('vgps3.path.Path', vgps3.path.Path);
goog.exportSymbol('vgps3.path.Path.init', vgps3.path.Path.prototype.init);
