/**
 * @license Copyright 2012 Victor Berchet
 *
 * VisuGps3
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

/**
 * @fileoverview VisuGps3
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.Map');

goog.require('goog.object');
goog.require('goog.array');
goog.require('goog.events.EventTarget');

/**
 * @param {Node} container The container
 * @param {Object.<string>=} options Google Maps options
 * @param {Array<vgps3.IPlugin>|vgps3.IPlugin} plugins A list of plugins
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
vgps3.Map = function(container, options, plugins)
{
    /**
     * @type {google.maps.Map}
     * @private
     */
    this.map_ = null;

    goog.base(this);

    var opt = {
        center: new google.maps.LatLng(46.73986, 2.17529),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    goog.object.extend(opt, options || {});

    this.map_ = new google.maps.Map(container, opt);

    this.initPlugins_(plugins);
};

goog.inherits(vgps3.Map, goog.events.EventTarget);

/**
 * @return {google.maps.Map} The google map object
 */
vgps3.Map.prototype.getGoogleMap = function()
{
    return this.map_;
};

/**
 * @param {Array<vgps3.IPlugin>|vgps3.IPlugin} plugins A list of plugins
 * @private
 */
vgps3.Map.prototype.initPlugins_ = function(plugins)
{
    plugins = goog.isArray(plugins) ? plugins : [plugins];

    goog.array.forEach(
        plugins,
        function(plugin) {
            plugin.init(this);
        },
        this
    );
};

