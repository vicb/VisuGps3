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
 * @fileoverview Google maps control.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.track.InfoControl');

goog.require('goog.dom');
goog.require('goog.soy');

/**
 * @param {google.maps.Map} map
 * @param {google.maps.ControlPosition} position
 * @constructor
 */
vgps3.track.InfoControl = function(map, position) {
    /**
     * @type {!Element}
     * @private
     */
    this.dom_ = goog.dom.createDom('div', 'map-ctrl', '<strong>Content</strong>');

    map.controls[position].push(this.dom_);
};

/**
 * @param {Object} pointData
 */
vgps3.track.InfoControl.prototype.setInfo = function(pointData) {
    goog.soy.renderElement(
        this.dom_,
        vgps3.track.templates.infoControl,
        {data: pointData}
    );
};




