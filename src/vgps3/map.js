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
 * @fileoverview VisuGps3.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.Map');

goog.require('goog.array');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('goog.object');
goog.require('goog.ui.Dialog');
goog.require('goog.ui.Dialog.ButtonSet');
goog.require('vgps3.templates');



/**
 * @param {!Element} container The container.
 * @param {Object.<string>=} options Google Maps options.
 * @param {(Array.<vgps3.IPlugin>|vgps3.IPlugin)=} plugins A list of plugins.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
vgps3.Map = function(container, options, plugins) {
  /**
  * @type {google.maps.Map}
  * @private
  */
  this.gMap_ = null;

  /**
  * @type {goog.ui.Dialog}
  * @private
  */
  this.aboutDialog_ = null;

  /**
  * @type {goog.events.EventHandler}
  */
  this.events = new goog.events.EventHandler(this);

  goog.base(this);

  var opt = {
    center: new google.maps.LatLng(46.73986, 2.17529),
    zoom: 5,
    minZoom: 6,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    streetViewControl: false
  };

  goog.object.extend(opt, options || {});

  this.gMap_ = new google.maps.Map(container, opt);

  this.initPlugins_(plugins);
};
goog.inherits(vgps3.Map, goog.events.EventTarget);


/**
 * @return {google.maps.Map} The google map object.
 */
vgps3.Map.prototype.getGoogleMap = function() {
  return this.gMap_;
};


/**
 * @return {undefined}
 */
vgps3.Map.prototype.showAbout = function() {
  var dialog = this.aboutDialog_ || (this.aboutDialog_ = new goog.ui.Dialog());
  dialog.setTitle('VisuGps v' + vgps3.VERSION);
  dialog.setContent(vgps3.templates.about());
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());
  dialog.setVisible(true);
};


/**
 * @param {(Array.<vgps3.IPlugin>|vgps3.IPlugin)=} plugins A list of plugins.
 * @private
 */
vgps3.Map.prototype.initPlugins_ = function(plugins) {
  if (goog.isDef(plugins)) {
    plugins = goog.isArray(plugins) ? plugins : [plugins];

    goog.array.forEach(
        plugins,
        function(plugin) {
          plugin.init(this);
        },
        this
    );
  }
};

