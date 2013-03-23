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
 * @fileoverview
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.chart.AboutEvent');

goog.require('goog.events.Event');



/**
 * @constructor
 * @extends {goog.events.Event}
 */
vgps3.chart.AboutEvent = function() {
  goog.base(this, vgps3.chart.EventType.ABOUT);
};
goog.inherits(vgps3.chart.AboutEvent, goog.events.Event);


