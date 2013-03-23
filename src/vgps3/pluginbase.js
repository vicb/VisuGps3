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
 * @fileoverview VisuGps3 plugin interface.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.PluginBase');

goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('vgps3.Map');



/**
 * Interface for vgps3 plugins.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
vgps3.PluginBase = function() {
  /**
   * @type {vgps3.Map}
   * @protected
   */
  this.vgps_;

  /**
   * @type {google.maps.Map}
   * @protected
   */
  this.gMap_;

  /**
   * @type {goog.events.EventHandler} The event handler
   * @private
   */
  this.handler_;

  goog.base(this);
};
goog.inherits(vgps3.PluginBase, goog.events.EventTarget);


/**
 * Plugin initialization.
 *
 * @param {!vgps3.Map} vgps The map.
 *
 * @return {undefined}
 */
vgps3.PluginBase.prototype.init = function(vgps) {
  this.vgps_ = vgps;
  this.gMap_ = vgps.getGoogleMap();
  this.setParentEventTarget(vgps);
};


/**
 *Get an event handler bound to the plugin.
 *
 * @return {goog.events.EventHandler}
 */
vgps3.PluginBase.prototype.getHandler = function() {
  return this.handler_ || (this.handler_ = new goog.events.EventHandler(this));
};


/**
 * @return {!Array.<string>} The google maps libraries required by this plugin.
 */
vgps3.PluginBase.prototype.requireGoogleMapLibs = function() {
  return [];
};


/**
 * @override
 */
vgps3.PluginBase.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.dispose(this.handler_);
  this.handler_ = null;
  this.vgps_ = null;
  this.gMap_ = null;
};


