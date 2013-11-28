/**
 * Copyright Victor Berchet.
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

goog.require('goog.Timer');
goog.require('goog.array');
goog.require('goog.async.Deferred');
goog.require('goog.iter');
goog.require('goog.net.jsloader');
goog.require('goog.string.format');
goog.require('goog.structs.Map');


/**
 * @type {goog.async.Deferred} Triggered when the Google Loader has been loaded
 * @private
 */
vgps3.loader.loaderLoaded_;


/**
 * @type {goog.async.Deferred} Triggered when the DOM has loaded
 * @private
 */
vgps3.loader.domLoaded_ = new goog.async.Deferred();


/**
 * @type {goog.debug.Logger}
 * @private
 */
vgps3.loader.logger_ = goog.debug.Logger.getLogger('vgps3.loader');


/**
 * Loads an API.
 *
 * @param {string} module The name of the module.
 * @param {string|number} version The version of the module.
 * @param {Function|goog.async.Deferred} cb Called when the API has been loaded.
 * @param {Object=} opt_options Extra options.
 */
vgps3.loader.load = function(module, version, cb, opt_options) {
  var callback,
      options = opt_options || {},
      optionsMap = new goog.structs.Map(options),
      v = version.toString();

  vgps3.loader.logger_.info(goog.string.format(
    'Module %s v%s requested with options %s',
    module,
    v,
    goog.debug.expose(options)
  ));

  if (goog.isFunction(cb)) {
    callback = cb;
  } else {
    vgps3.loader.logger_.info(goog.string.format('Using a Deferred', module, v));
    if (cb.hasFired()) {
      vgps3.loader.logger_.info(goog.string.format('Deferred already fired', module, v));
      return;
    }
    // If the callback is a deferred it should be fired when the api has been loaded
    callback = goog.bind(cb.callback, cb);
  }

  // Loading or loaded
  vgps3.loader.modules_[module] = vgps3.loader.modules_[module] || [];

  if (goog.isDef(vgps3.loader.modules_[module][v]) &&
      goog.iter.some(vgps3.loader.modules_[module][v].getKeyIterator(), function(opts) {
        if (opts.equals(optionsMap)) {
          vgps3.loader.logger_.info(goog.string.format('Module %s v%s already requested with the same options'));
          var api = vgps3.loader.modules_[module][v].get(opts);
          if (api['loaded']) {
            vgps3.loader.logger_.info(goog.string.format('Module %s v%s already loaded', module, v));
            // Loaded
            /** @type {Function} */(callback)();
          } else {
            // Loading
            vgps3.loader.logger_.info(goog.string.format('Loading module %s v%s', module, v));
            api['callbacks'].push(callback);
            vgps3.loader.modules_[module][v].set(opts, api);
          }
          return true;
        } else {
          vgps3.loader.logger_.info(goog.string.format('Module %s v%s already requested with different options'));
          return false;
        }
      })) {
    return;
  } else {
    // To load
    vgps3.loader.logger_.info(goog.string.format('Loading module %s v%s', module, v));
    vgps3.loader.modules_[module][v] = vgps3.loader.modules_[module][v] || new goog.structs.Map();
    vgps3.loader.modules_[module][v].set(optionsMap, {
      'loaded': false,
      'callbacks': [callback]
    });
  }

  if (!vgps3.loader.loaderLoaded_) {
    vgps3.loader.logger_.info('Loading the Google API loader');
    vgps3.loader.loaderLoaded_ = goog.net.jsloader.load(vgps3.loader.LOADER_URL);
    vgps3.loader.loaderLoaded_.addCallbacks(
        function() {
          vgps3.loader.logger_.info('Google API loader loaded');
          google.setOnLoadCallback(function() {
            vgps3.loader.domLoaded_.callback();
          });
        },
        function() {vgps3.loadMask.setMessage('Erreur lors du chargement !', vgps3.loadMask.Style.ERROR);}
    );
  }

  vgps3.loader.domLoaded_.addCallback(function() {
    options['callback'] = goog.partial(vgps3.loader.loadHandler_, module, v, optionsMap);
    goog.Timer.callOnce(function() {google.load(module, v, options)});
  });
};


/**
 * Fires the callbacks when a module has been loaded.
 *
 * @param {string} module The name of the module.
 * @param {string} version The version of the module.
 * @param {goog.structs.Map} optionsMap Extra options.
 * @private
 */
vgps3.loader.loadHandler_ = function(module, version, optionsMap) {
  vgps3.loader.logger_.info(goog.string.format('Module %s v%s loaded', module, version));
  var api = vgps3.loader.modules_[module][version].get(optionsMap);
  api['loaded'] = true;
  goog.array.forEach(api['callbacks'], function(cb) {
    goog.Timer.callOnce(cb);
  });
  api['callbacks'] = [];
  vgps3.loader.modules_[module][version].set(optionsMap, module);
};


/**
 * The modules that have already been loaded.
 * @type {Array.<Array.<goog.structs.Map.<goog.structs.Map, {loaded: boolean, callbacks: Array.<Function>}>>>}
 * @private
 */
vgps3.loader.modules_ = [];


/**
 * Url of the google AJAX API loader
 * @define {string}
 */
vgps3.loader.LOADER_URL = 'https://www.google.com/jsapi';
