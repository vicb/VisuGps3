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

goog.provide('vgps3.track.TrackSelectEvent');

goog.require('goog.events.Event');



/**
 * @param {number} index
 * @param {?number} previousIndex
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.track.TrackSelectEvent = function(index, previousIndex) {
  goog.base(this, vgps3.track.EventType.SELECT);

  /**
  * @type {number}
  */
  this.index = index;

  /**
  * @type {?number}
  */
  this.previousIndex = previousIndex;
};
goog.inherits(vgps3.track.TrackSelectEvent, goog.events.Event);


