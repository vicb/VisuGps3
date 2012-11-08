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

goog.provide('vgps3.track.LoadEvent');

goog.require('goog.events.Event');

/**
 * @param {!Object} track
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.track.LoadEvent = function(track) {
    goog.base(this, vgps3.track.EventType.LOAD);

    /**
     * @type {Object}
     */
    this.track = track;
};

goog.inherits(vgps3.track.LoadEvent, goog.events.Event);


