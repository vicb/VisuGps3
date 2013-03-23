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
 * @fileoverview Mouse wheel event.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.chart.WheelEvent');

goog.require('goog.events.Event');



/**
 * @param {number} position [0...1].
 * @param {number} direction one of {-1, 1}.
 *
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.chart.WheelEvent = function(position, direction) {
  goog.base(this, vgps3.chart.EventType.WHEEL);

  /**
  * @type {number} [0...1]
  */
  this.position = position;

  /**
  * @type {number} -1 or 1
  */
  this.direction = direction;
};
goog.inherits(vgps3.chart.WheelEvent, goog.events.Event);


