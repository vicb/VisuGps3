/**
 * Copyright Victor Berchet
 *
 * This file is part of VisuGps3
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

/**
 * @fileoverview Track select event.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.track.TrackSelectEvent');

goog.require('goog.events.Event');



/**
 * @param {number} trackIndex
 * @param {?number} previousTrackIndex
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.track.TrackSelectEvent = function(trackIndex, previousTrackIndex) {
  goog.base(this, vgps3.track.EventType.SELECT);

  /**
  * @type {number} The index of the selected track
  */
  this.trackIndex = trackIndex;

  /**
  * @type {?number} The index of the previously selected track (null when none)
  */
  this.previousTrackIndex = previousTrackIndex;
};
goog.inherits(vgps3.track.TrackSelectEvent, goog.events.Event);


