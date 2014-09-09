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
 * @fileoverview Update event.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.track.UpdateEvent');

goog.require('goog.events.Event');



/**
 * @param {number} trackIndex
 * @param {vgps3.track.GpsFixes} fixes
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.track.UpdateEvent = function(trackIndex, fixes) {
  goog.base(this, vgps3.track.EventType.UPDATE);

  /**
  * @type {vgps3.track.GpsFixes} The fixes
  */
  this.fixes = fixes;

  /**
   * @type {number} The track index
  */
  this.trackIndex = trackIndex;

};
goog.inherits(vgps3.track.UpdateEvent, goog.events.Event);


