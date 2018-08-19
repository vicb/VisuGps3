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
 * @fileoverview Displays a route.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.route.Route');

goog.require('goog.array');
goog.require('goog.string.format');
goog.require('vgps3.Map');
goog.require('vgps3.PluginBase');



/**
 *
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.route.Route = function() {
  /**
   * @type {Array} The map overlays (lines & markers)
   * @private
   */
  this.overlays_ = [];

  /**
  * @type {!goog.debug.Logger}
  * @private
  */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.route.Route');

  goog.base(this);
};
goog.inherits(vgps3.route.Route, vgps3.PluginBase);


/**
 *
 * @param {string} type End with "c" to display a closed route.
 * @param {Array.<google.maps.LatLng>} turnpoints
 * @param {google.maps.LatLng=} opt_start
 * @param {google.maps.LatLng=} opt_end
 * @param {google.maps.LatLng=} opt_center
 */
vgps3.route.Route.prototype.draw = function(type, turnpoints, opt_start, opt_end, opt_center) {
  var startIcon = {
      url: vgps3.route.START_ICON_URL,
      size: new google.maps.Size(12, 20)
    },
  endIcon = {
    url: vgps3.route.END_ICON_URL,
    size: new google.maps.Size(12, 20)
  },
  icon = {
    url: vgps3.route.ICON_URL,
    size: new google.maps.Size(12, 20)
  },
  closed = type.length && type.substr(-1) === 'c',
  bounds = new google.maps.LatLngBounds();

  this.logger_.info(goog.string.format('Track type: %s', type));

  goog.array.forEach(turnpoints, function(tp) {
    bounds.extend(tp);
  });

  var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 0.8,
    scale: 2
  };

  if (closed && goog.isDef(opt_start)) {
    bounds.extend(opt_start);
    this.overlays_.push(new google.maps.Polyline({
      clickable: false,
      map: this.gMap_,
      path: [opt_start, turnpoints[0]],
      strokeColor: '#44f',
      strokeOpacity: 0,
      icons: [{
        icon: lineSymbol,
        offset: 0,
        repeat: '10px'
      }]
    }));
  }

  if (closed && goog.isDef(opt_end)) {
    bounds.extend(opt_end);
    this.overlays_.push(new google.maps.Polyline({
      clickable: false,
      map: this.gMap_,
      path: [opt_end, turnpoints[turnpoints.length - 1]],
      strokeColor: '#44f',
      strokeOpacity: 0,
      icons: [{
        icon: lineSymbol,
        offset: 0,
        repeat: '10px'
      }]
    }));
  }

  this.overlays_.push(new google.maps.Marker({
    clickable: false,
    position: closed && goog.isDef(opt_start) ? opt_start : turnpoints[0],
    map: this.gMap_,
    icon: startIcon
  }));
  this.overlays_.push(new google.maps.Marker({
    clickable: false,
    position: closed && goog.isDef(opt_end) ? opt_end : turnpoints[turnpoints.length - 1],
    map: this.gMap_,
    icon: endIcon
  }));

  closed && turnpoints.push(turnpoints[0]);

  goog.array.forEach(
      closed ? turnpoints : goog.array.slice(turnpoints, 1, -1),
      function(tp) {
        this.overlays_.push(new google.maps.Marker({
          clickable: false,
          position: tp,
          map: this.gMap_,
          icon: icon
        }));
      },
      this
  );

  this.overlays_.push(new google.maps.Polyline({
    clickable: false,
    map: this.gMap_,
    path: turnpoints,
    strokeColor: '#00f',
    strokeOpacity: 0.8,
    strokeWeight: 2
  }));

  if (opt_center) {
    this.gMap_.fitBounds(bounds);
  }
};

/**
 * @override
 */
vgps3.route.Route.prototype.disposeInternal = function() {
  var that = this;

  goog.base(this, 'disposeInternal');
  goog.array.forEach(this.overlays_, function(overlay, index) {
    overlay.setMap(null);
    that.overlays_[index] = null;
  });
};


/**
 * @define {string} The start icon url.
 */
vgps3.route.START_ICON_URL = 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png';


/**
 * @define {string} The end icon url.
 */
vgps3.route.END_ICON_URL = 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png';


/**
 * @define {string} The route icon url.
 */
vgps3.route.ICON_URL = 'https://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_orange.png';

goog.exportSymbol('vgps3.route.Route', vgps3.route.Route);
goog.exportSymbol('vgps3.route.Route.draw', vgps3.route.Route.prototype.draw);
