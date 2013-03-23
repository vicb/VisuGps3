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

goog.provide('vgps3.earth.ClickEvent');

goog.require('goog.events.Event');



/**
 * @param {number} position [0...1].
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.earth.ClickEvent = function(position) {
  goog.base(this, vgps3.earth.EventType.CLICK);

  /**
  * @type {number} [0...1]
  */
  this.position = position;
};
goog.inherits(vgps3.earth.ClickEvent, goog.events.Event);


