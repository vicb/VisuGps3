/**
 * Copyright 2012 Victor Berchet.
 *
 * VisuGps3
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

/**
 * @fileoverview Wrapper for google Ajax API Loader.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.loader');

goog.require('goog.async.Deferred');
goog.require('goog.net.jsloader');
goog.require('goog.array');
goog.require('goog.iter');
goog.require('goog.structs.Map');
goog.require('goog.string.format');

/**
 * @type {goog.async.Deferred} Triggered when the Google Loader has been loaded
 * @private
 */
vgps3.loader.loaderLoaded_;

/**
 * @type {goog.debug.Logger}
 * @private
 */
vgps3.loader.logger_ = goog.debug.Logger.getLogger('vgps3.loader');

/**
 * Loads an API.
 *
 * @param {string} module The name of the module
 * @param {string|number} version The version of the module
 * @param {Function|goog.async.Deferred} callback Called when the API has been loaded
 * @param {Object=} options Extra options
 */
vgps3.loader.load = function(module, version, callback, options) {
  options = options || {};
  var optionsMap = new goog.structs.Map(options);
  version = version.toString();

  if (!goog.isFunction(callback)) {
    if (callback.hasFired()) {
      return;
    }
    // If the callback is a deferred it should be fired when the api has been loaded
    callback = goog.bind(callback.callback, callback);
  }

  // Loading or loaded
  vgps3.loader.modules_[module] = vgps3.loader.modules_[module] || [];
  if (goog.isDef(vgps3.loader.modules_[module][version]) &&
      goog.iter.some(vgps3.loader.modules_[module][version].getKeyIterator(), function(opts) {
        if (opts.equals(optionsMap)) {
          var api = vgps3.loader.modules_[module][version].get(opts);
          if (api.loaded) {
            vgps3.loader.logger_.info(goog.string.format('Module %s v%s already loaded', module, version));
            // Loaded
            /** @type {Function} */(callback)();
          } else {
            // Loading
            vgps3.loader.logger_.info(goog.string.format('Loading module %s v%s', module, version));
            api.callbacks.push(callback);
            vgps3.loader.modules_[module][version].set(opts, api);
          }
          return true;
        }
      })) {
    return;
  } else {
    // To load
    vgps3.loader.modules_[module][version] = vgps3.loader.modules_[module][version] || new goog.structs.Map();
    vgps3.loader.modules_[module][version].set(optionsMap, {
      loaded: false,
      callbacks: [callback]
    });
  }

  if (!goog.isDef(vgps3.loader.loaderLoaded_)) {
    vgps3.loader.loaderLoaded_ = new goog.async.Deferred();
    goog.net.jsloader.load(vgps3.loader.LOADER_URL).addCallback(function() {
      vgps3.loader.loaderLoaded_.callback();
    });
  }

  options.callback = goog.partial(vgps3.loader.loadHandler_, module, version, optionsMap);

  vgps3.loader.loaderLoaded_.addCallback(function() {
    google.load(module, /** @type {string} */ (version), options);
  });
}

/**
 * Fires the callbacks when a module has been loaded.
 *
 * @param {string} module The name of the module
 * @param {string} version The version of the module
 * @param {goog.structs.Map} optionsMap Extra options
 * @private
 */
vgps3.loader.loadHandler_ = function(module, version, optionsMap) {
  vgps3.loader.logger_.info(goog.string.format('Module %s v%s loaded', module, version));
  var api = vgps3.loader.modules_[module][version].get(optionsMap);
  api.loaded = true;
  goog.array.forEach(api.callbacks, function(cb) {
    goog.Timer.callOnce(cb, 10);
  });
  api.callbacks = [];
  vgps3.loader.modules_[module][version].set(optionsMap, module);
};

/**
 * The modules that have already been loaded.
 * @type {Array.<Array.<goog.structs.Map.<goog.structs.Map, {loaded: boolean, callbacks: Array.<Function>}>>>}
 */
vgps3.loader.modules_ = [];

/**
 * Url of the google AJAX API loader
 * @define {string}
 */
vgps3.loader.LOADER_URL = 'https://www.google.com/jsapi';