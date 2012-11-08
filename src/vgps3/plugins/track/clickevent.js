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

goog.provide('vgps3.track.ClickEvent');

goog.require('goog.events.Event');

/**
 * @param {Object} track
 * @param {number} position [0...1]
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.track.ClickEvent = function(track, position) {
    goog.base(this, vgps3.track.EventType.CLICK);

    /**
     * @type {Object}
     */
    this.track = track;

    /**
     * @type {number}
     */
    this.position = position;
};

goog.inherits(vgps3.track.ClickEvent, goog.events.Event);


