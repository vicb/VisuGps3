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
 * @fileoverview
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.chart.WheelEvent');

goog.require('goog.events.Event');

/**
 * @param {number} position
 * @param {number} direction
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.chart.WheelEvent = function(position, direction) {
    goog.base(this, vgps3.chart.EventType.WHEEL);

    /**
     * @type {number}
     */
    this.position = position;

    /**
     * @type {number}
     */
    this.direction = direction;
};
goog.inherits(vgps3.chart.WheelEvent, goog.events.Event);


