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
 * @fileoverview Displays skyways.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.skyways.Skyways');

goog.require('goog.dom');
goog.require('goog.soy');
goog.require('goog.style');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Slider');
goog.require('vgps3.Map');
goog.require('vgps3.PluginBase');
goog.require('vgps3.skyways.templates');



/**
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.skyways.Skyways = function() {
  /**
   *  @type {google.maps.ImageMapType}
   *  @private
   */
  this.map_;

  /**
   * @type {vgps3.Control} The google map control
   * @private
   */
  this.control_;

  /**
   * @type {goog.ui.Slider} The opacity slider
   * @private
   */
  this.slider_;

  /**
   * @type {string}
   * @private
   */
  this.url_;

  /**
   * @type {Element} The copyright
   * @protected
   */
  this.copyright_;

  goog.base(this);
};
goog.inherits(vgps3.skyways.Skyways, vgps3.PluginBase);


/**
 * @override
 */
vgps3.skyways.Skyways.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);

  this.control_ = new vgps3.Control(
      this.gMap_,
      vgps3.skyways.templates.control,
      google.maps.ControlPosition.RIGHT_TOP
      );
  this.control_.update();
  var handle = goog.dom.getLastElementChild(this.control_.getElement());
  goog.style.setStyle(handle, 'cursor', 'pointer');
  this.slider_ = new goog.ui.Slider();
  this.slider_.decorate(goog.dom.getFirstElementChild(this.control_.getElement()));
  this.slider_.setMinimum(20);
  goog.style.setElementShown(this.slider_.getElement(), false);
  this.url_ = vgps3.skyways.TILES_URL.replace('{domain}', document.domain);
  this.createCopyright_(vgps3.skyways.COPYRIGHT, vgps3.skyways.URL);
  this.getHandler()
    .listen(handle, 'mousedown', this.clickHandler_)
    .listen(this.slider_, goog.ui.Component.EventType.CHANGE, function() {
        if (this.map_) {
          this.map_.setOpacity(this.slider_.getValue() / 100);
        }
      });
};


/**
 * Toggles skyways visibility when the handler is clicked.
 *
 * @param {goog.events.Event} event
 * @private
 */
vgps3.skyways.Skyways.prototype.clickHandler_ = function(event) {
  /**
   * @type {boolean}
   */
  var visible = goog.style.isElementShown(this.slider_.getElement());
  goog.style.setElementShown(this.copyright_, !visible);
  goog.style.setElementShown(this.slider_.getElement(), !visible);

  if (!visible) {
    if (!this.map_) {
      this.map_ = this.getMapType_();
    }
    this.slider_.setValue(this.map_.getOpacity() * 100);
    this.gMap_.overlayMapTypes.insertAt(0, this.map_);
  } else {
    var overlays = this.gMap_.overlayMapTypes,
        map = this.map_;
    overlays.forEach(function(overlay, index) {
      if (overlay === map) {
        overlays.removeAt(index);
      }
    });
  }
};


/**
 * Create the Skyways map type.
 *
 * @return {google.maps.ImageMapType}
 * @private
 */
vgps3.skyways.Skyways.prototype.getMapType_ = function() {
  var url = this.url_;
  var mapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      return url
        .replace('{x}', coord.x)
        .replace('{y}', ((1 << zoom) - coord.y - 1).toString())
        .replace('{zoom}', zoom);

    },
    tileSize: new google.maps.Size(256, 256),
    opacity: 0.5,
    minZoom: 1,
    maxZoom: 18,
    name: 'Skyways'
  });

  return mapType;
};


/**
 * Create a copyright control on the map
 *
 * @param {string} text Copyright.
 * @param {string} url  Link target.
 *
 * @private
 */
vgps3.skyways.Skyways.prototype.createCopyright_ = function(text, url) {
  this.copyright_ = goog.dom.createDom(
      'a',
      {'target': '_blank', 'href': url, 'class': 'vgps3-topo-logo'},
      text
      );

  this.gMap_.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(this.copyright_);

  goog.style.setElementShown(this.copyright_, false);
};


/**
 * @override
 */
vgps3.skyways.Skyways.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  if (this.layer_) {
    this.layer_.setMap(null);
    delete this.layer_;
  }
  goog.dom.removeNode(this.copyright_);
  goog.dom.removeNode(this.control_.getElement());
  goog.dispose(this.control_);
  goog.dispose(this.slider_);
};


/**
 * @define {string} The skyways tiles URL.
 */
vgps3.skyways.TILES_URL = 'https://thermal.kk7.ch/php/tile.php?typ=skyways&t=all&z={zoom}&x={x}&y={y}&src={domain}';


/**
 * @define {string} The skyways website.
 */
vgps3.skyways.URL = 'https://thermal.kk7.ch';


/**
 * @define {string} The skyways copyright.
 */
vgps3.skyways.COPYRIGHT = 'thermal.kk7.ch ©';

goog.exportSymbol('vgps3.skyways.Skyways', vgps3.skyways.Skyways);
