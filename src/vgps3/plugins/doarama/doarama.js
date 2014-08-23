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
 * @fileoverview DoArama integration.
 * @see http://www.doarama.com/api/0.2/docs
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.doarama.Doarama');

goog.require('goog.Timer');
goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.net.Cookies');
goog.require('goog.style');
goog.require('vgps3.Control');
goog.require('vgps3.PluginBase');
goog.require('vgps3.doarama.templates');

/**
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.doarama.Doarama = function() {
  /**
   * @type {vgps3.Control} The google map control
   * @private
   */
  this.control_;

  /**
   * @type {Element} DoArama iframe
   * @private
   */
  this.iframe_;

  /**
   * @type {Element} Close DoArama
   * @private
   */
  this.close_;

  /**
   * @type {goog.debug.Logger} The logger
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.doarama.Doarama');

  goog.base(this);

};
goog.inherits(vgps3.doarama.Doarama, vgps3.PluginBase);


/**
 * @override
 */
vgps3.doarama.Doarama.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);
  this.getHandler().listen(vgps, vgps3.track.EventType.LOAD, this.trackLoadHandler_);
};


/**
 * @override
 */
vgps3.doarama.Doarama.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.dom.removeNode(this.iframe_);
  delete this.iframe_;
  goog.dom.removeNode(this.close_);
  delete this.close_;
  goog.dispose(this.control_);
};

/**
 * Make the Doarama iframe visible
 *
 * @param {goog.events.Event} event
 * @private
 */
vgps3.doarama.Doarama.prototype.show_ = function(event) {
  goog.style.setElementShown(this.iframe_, true);
  goog.style.setElementShown(this.close_, true);
};

/**
 * Hide Doarama iframe
 *
 * @param {goog.events.Event} event
 * @private
 */
vgps3.doarama.Doarama.prototype.hide_ = function(event) {
  goog.style.setElementShown(this.iframe_, false);
  goog.style.setElementShown(this.close_, false);
};

/**
 * Setup the DoArama iframe when a track is loaded
 *
 * @param {goog.events.Event} event
 * @private
 */
vgps3.doarama.Doarama.prototype.trackLoadHandler_ = function(event) {
  // todo handle more than 1 track
  if (goog.isDef(this.iframe_)) {
    return;
  }

  if (goog.isDefAndNotNull(event.fixes['doaramaUrl'])) {
    var options = '&fixedAspect=false';
    if (goog.isDefAndNotNull(event.fixes['pilot'])) {
      options += '&name=' + encodeURIComponent(event.fixes['pilot']);
    }
    this.setupDoarama_(event.fixes['doaramaUrl'] + options);
  }
};


/**
 * Setup the DoArama iframe when a track is loaded:
 * - create the Doarama iframe,
 * - create the close control displayed on top the iframe,
 * - create the control that allow switching from Maps to Doarama
 *
 * @param {String} url
 * @private
 */
vgps3.doarama.Doarama.prototype.setupDoarama_ = function(url) {
  var that = this;
  var domHelper = new goog.dom.DomHelper(goog.dom.getOwnerDocument(this.gMap_.getDiv()));

  this.iframe_ = goog.dom.iframe.createBlank(domHelper, 'position: absolute; top: 0; left: 0; background: white');
  this.iframe_.src = url;
  goog.style.setElementShown(this.iframe_, false);
  goog.style.setSize(this.iframe_, goog.style.getSize(/** @type {Element} */(this.gMap_.getDiv())));
  domHelper.appendChild(domHelper.getDocument().body, this.iframe_);
  google.maps.event.addListener(this.gMap_, 'resize', function() {
    goog.style.setSize(that.iframe_, goog.style.getSize(/** @type {Element} */(that.gMap_.getDiv())));
  });

  this.close_ = goog.dom.createDom('div', {
    'class': 'doarama-ctrl vg-new',
    'style': 'position: absolute; top: 30px; right: 0'
  });
  this.close_.innerHTML = '<i class="fa fa-fw fa-power-off fa-2x"></i>';
  goog.style.setElementShown(this.close_, false);
  domHelper.appendChild(domHelper.getDocument().body, this.close_);

  this.getHandler().listen(this.close_, 'mousedown', this.hide_);

  this.control_ = new vgps3.Control(
      this.gMap_,
      vgps3.doarama.templates.doaramaControl,
      google.maps.ControlPosition.RIGHT_TOP
      );
  this.control_.setExtraClass('vg-new');
  this.control_.update();
  this.getHandler().listen(this.control_.getElement(), 'mousedown', this.show_);
  goog.style.setStyle(this.control_.getElement(), 'cursor', 'pointer');
};



goog.exportSymbol('vgps3.doarama.Doarama', vgps3.doarama.Doarama);
goog.exportSymbol('vgps3.doarama.Doarama.init', vgps3.doarama.Doarama.prototype.init);
