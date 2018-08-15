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
 * @fileoverview VisuGps3 map.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.Map');

goog.require('goog.Uri.QueryData');
goog.require('goog.array');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('goog.object');
goog.require('goog.ui.Dialog');
goog.require('goog.ui.Dialog.ButtonSet');
goog.require('vgps3.templates');



/**
 * @param {!Element} container The container.
 * @param {function(): Object.<string>} userOptions Google Maps options.
 * @param {(Array.<vgps3.PluginBase>|vgps3.PluginBase)=} opt_plugins A list of plugins.
 * @param {Function=} opt_callback Called once the map has been initialized.
 * @param {string=} opt_gMapsKey Google Maps API key
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
vgps3.Map = function(container, userOptions, opt_plugins, opt_callback, opt_gMapsKey) {
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
   * @type {Array.<vgps3.PluginBase>}
   * @private
   */
  this.plugins_ = goog.isArray(opt_plugins) ? opt_plugins : [opt_plugins];

  /**
   * @type {goog.debug.Logger}
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.Map');

  goog.base(this);

  this.loadGoogleMapsApi_(container, userOptions, opt_callback, opt_gMapsKey);
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
  if (!this.aboutDialog_) {
    this.aboutDialog_ = new goog.ui.Dialog(undefined, true);
    this.aboutDialog_.setTitle('VisuGps v' + vgps3.VERSION);
    this.aboutDialog_.setContent(vgps3.templates.about());
    this.aboutDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());
    this.aboutDialog_.setEscapeToCancel(true);
    this.aboutDialog_.getDialogElement();
  }
  this.aboutDialog_.setVisible(true);
};


/**
 * Loads the google maps API with required libs.
 *
 * @param {!Element} container The container.
 * @param {function(): Object.<string>} userOptions Google Maps options.
 * @param {Function=} opt_callback Called once the map has been initialized.
 * @param {string=} opt_gMapsKey Google Maps API key
 *
 * @private
 */
vgps3.Map.prototype.loadGoogleMapsApi_ = function(container, userOptions, opt_callback, opt_gMapsKey) {
  var libs = ['geometry'],
      parameters = new goog.Uri.QueryData(),
      key = opt_gMapsKey == null ? this.getDomainKey(vgps3.Map.GOOGLE_API_KEYS) : opt_gMapsKey;

  goog.array.forEach(this.plugins_, function(plugin) {
    libs = libs.concat(plugin.requireGoogleMapLibs());
  });

  if (libs.length > 0) {
    goog.array.removeDuplicates(libs);
    parameters.add('libraries', libs.join(','));
  }

  if (null !== key) {
    parameters.add('key', key);
  }

  var gtag = goog.global['gtag'];
  if (goog.isDef(gtag)) {
    gtag('event', 'preload', {
      'value': key
    });
  }

  vgps3.loader.load(
      'maps',
      '3',
      goog.bind(this.init_, this, container, userOptions, opt_callback),
      {'other_params': parameters.toString()}
  );

  if (goog.isDef(gtag)) {
    gtag('event', 'postload', {
      'value': key
    });
  }

};


/**
 * @override
 */
vgps3.Map.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.events.removeAll();
  google.maps.clearInstanceListeners(this.gMap_);
  goog.dispose(this.aboutDialog_);
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
 * Returns the key for the current domain
 *
 * @param {string} keys The keys, format='domain1="key1" domain2="key2" *="fallback key"'.
 *
 * @return {?string} The key, null when no matching domain has been found.
 */
vgps3.Map.prototype.getDomainKey = function(keys) {
  var re = /([-a-zA-Z0-9_.*]+)="(.+?)"/g,
      matches;

  while (matches = re.exec(keys)) {
    if ('*' === matches[1] || -1 !== document.domain.indexOf(matches[1])) {
      return matches[2];
    }
  }

  return null;
};


/**
 * @define {string} The API keys format='domain1="key1" domain2="key2" *="fallback key"'.
 */
vgps3.Map.GOOGLE_API_KEYS = '';


/**
 * @define {string}
 */
vgps3.VERSION = '3.0.0-beta1';

goog.exportSymbol('vgps3.Map', vgps3.Map);
goog.exportSymbol('vgps3.Map.showAbout', vgps3.Map.prototype.showAbout);
goog.exportSymbol('vgps3.Map.getGoogleMap', vgps3.Map.prototype.getGoogleMap);
goog.exportSymbol('vgps3.Map.getDomainKey', vgps3.Map.prototype.getDomainKey);
