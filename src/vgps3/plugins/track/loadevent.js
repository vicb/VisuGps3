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
 * @fileoverview Load event.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.track.LoadEvent');

goog.require('goog.events.Event');



/**
 * @param {number} trackIndex
 * @param {vgps3.track.GpsFixes} fixes
 * @param {string} TrackColor
 * @param {string} url
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.track.LoadEvent = function(trackIndex, fixes, TrackColor, url) {
  goog.base(this, vgps3.track.EventType.LOAD);
  /**
   * @type {string} track url
   */
  this.url = url;

  /**
  * @type {vgps3.track.GpsFixes} The fixes
  */
  this.fixes = fixes;

  /**
   * @type {number} The track index
  */
  this.trackIndex = trackIndex;

  /**
   * @type {string} The track color
   */
  this.trackColor = TrackColor;
};
goog.inherits(vgps3.track.LoadEvent, goog.events.Event);


