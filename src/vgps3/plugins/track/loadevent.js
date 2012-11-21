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
 * @param {number} index
 * @param {!Object} track
 * @param {string} color
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.track.LoadEvent = function(index, track, color) {
  goog.base(this, vgps3.track.EventType.LOAD);

  /**
  * @type {Object}
  */
  this.track = track;

  /**
   * @type {number}
  */
  this.index = index;

  /**
   * @type {string}
   */
  this.color = color;
};
goog.inherits(vgps3.track.LoadEvent, goog.events.Event);


