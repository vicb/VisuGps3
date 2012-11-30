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
 * @fileoverview VisuGps3 map.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.Map');

goog.require('goog.array');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('goog.object');
goog.require('goog.ui.Dialog');
goog.require('goog.ui.Dialog.ButtonSet');
goog.require('goog.ui.IframeMask');
goog.require('vgps3.templates');



/**
 * @param {!Element} container The container.
 * @param {function(): Object.<string>} userOptions Google Maps options.
 * @param {(Array.<vgps3.PluginBase>|vgps3.PluginBase)=} opt_plugins A list of plugins.
 * @param {Function=} opt_callback Called once the map has been initialized.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
vgps3.Map = function(container, userOptions, opt_plugins, opt_callback) {
  /**
  * @type {google.maps.Map}
  * @private
  */
  this.gMap_;

  /**
  * @type {goog.ui.Dialog}
  * @private
  */
  this.aboutDialog_;

  /**
   * @type {goog.ui.IframeMask}
   * @private
   */
  this.shim_;

  /**
   * @type {Array.<vgps3.PluginBase>}
   * @private
   */
  this.plugins_ = goog.isArray(opt_plugins) ? opt_plugins : [opt_plugins];

  goog.base(this);

  vgps3.loader.load(
      'maps',
      '3',
      goog.bind(this.init_, this, container, userOptions, opt_callback),
      {'other_params': 'libraries=drawing,geometry&sensor=false'}
  );
};
goog.inherits(vgps3.Map, goog.events.EventTarget);


/**
 * @return {google.maps.Map} The google map object.
 */
vgps3.Map.prototype.getGoogleMap = function() {
  return this.gMap_;
};


/**
 * Displays the about dialog.
 *
 * @return {undefined}
 */
vgps3.Map.prototype.showAbout = function() {
  if (goog.isDef(this.aboutDialog_)) {
    this.aboutDialog_ = new goog.ui.Dialog(undefined);
    this.aboutDialog_.setTitle('VisuGps v' + vgps3.VERSION);
    this.aboutDialog_.setContent(vgps3.templates.about());
    this.aboutDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());
    this.aboutDialog_.setEscapeToCancel(true);
    this.aboutDialog_.getDialogElement();
    // Do not allow drawing as the iframe shim would not follow the dialog
    this.aboutDialog_.setDraggable(false);
    this.shim_ = new goog.ui.IframeMask();
    this.shim_.setOpacity(1);
    this.shim_.listenOnTarget(
        this.aboutDialog_,
        goog.ui.Component.EventType.SHOW,
        goog.ui.Component.EventType.HIDE,
        this.aboutDialog_.getDialogElement()
    );
  }
  this.aboutDialog_.setVisible(true);
};


/**
 * @override
 */
vgps3.Map.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.events.removeAll();
  google.maps.clearInstanceListeners(this.gMap_);
  goog.disposeAll(this.shim_, this.aboutDialog_);
  this.shim_ = null;
  this.aboutDialog_ = null;
  goog.array.forEach(this.plugins_, function(plugin) {
    goog.dispose(plugin);
  });
};


/**
 * Creates the map and initializes the plugins.
 *
 * @param {!Element} container The map container.
 * @param {function(): Object.<string>} userOptions A list of plugins.
 * @param {Function} callback called at the end of the init phase.
 * @private
 */
vgps3.Map.prototype.init_ = function(container, userOptions, callback) {
  var options = {
    'center': new google.maps.LatLng(46.73986, 2.17529),
    'zoom': 5,
    'minZoom': 6,
    'mapTypeId': google.maps.MapTypeId.TERRAIN,
    'streetViewControl': false,
    'scaleControl': true
  };

  goog.object.extend(options, userOptions() || {});

  this.gMap_ = new google.maps.Map(container, options);

  goog.events.listen(
      window,
      'resize',
      function() {google.maps.event.trigger(this.gMap_, 'resize')},
      undefined,
      this
  );

  goog.array.forEach(this.plugins_, function(plugin) {plugin.init(this);}, this);

  callback();
};


/**
 * @define {string}
 */
vgps3.VERSION = '3.0.0-beta1';

