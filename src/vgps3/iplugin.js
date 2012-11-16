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
 * @fileoverview VisuGps3 plugin interface.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.IPlugin');

goog.require('vgps3.Map');

/**
 * Interface for vgps3 plugins.
 *
 * @interface
 */
vgps3.IPlugin = function() {};


/**
 * Plugin initialization.
 *
 * @param {vgps3.Map} The map.
 *
 * @return {void} Nothing.
 *
 */
vgps3.IPlugin.prototype.init;
