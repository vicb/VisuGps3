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
 * @fileoverview Click event.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.track.ClickEvent');

goog.require('goog.events.Event');



/**
 * @param {vgps3.track.GpsFixes} fixes
 * @param {number} position [0...1].
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.track.ClickEvent = function(fixes, position) {
  goog.base(this, vgps3.track.EventType.CLICK);

  /**
  * @type {vgps3.track.GpsFixes} The fixes
  */
  this.fixes = fixes;

  /**
  * @type {number} [0...1]
  */
  this.position = position;
};
goog.inherits(vgps3.track.ClickEvent, goog.events.Event);


