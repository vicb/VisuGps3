/**
 * @license Copyright 2012 Victor Berchet.
 *
 * VisuGps3
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

/**
 * @fileoverview VisuGps3.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.Viewer');

goog.require('goog.Uri');
goog.require('goog.array');
goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.json');
goog.require('goog.object');
goog.require('goog.structs.Map');
goog.require('vgps3.chart.Chart');
goog.require('vgps3.earth.Earth');
goog.require('vgps3.ign.Map');
goog.require('vgps3.path.Path');
goog.require('vgps3.route.Route');
goog.require('vgps3.track.Track');



/**
 * @param {!Element} mapContainer
 * @param {!Element} chartContainer
 * @constructor
 */
vgps3.Viewer = function(mapContainer, chartContainer) {
  /**
  * @type {vgps3.Map}
  */
  this.map;

  /**
  * @type {Object.<string, vgps3.IPlugin>}
  */
  this.plugins = {
    track: new vgps3.track.Track(),
    chart: new vgps3.chart.Chart(chartContainer),
    ign: new vgps3.ign.Map(),
    route: new vgps3.route.Route(),
    earth: new vgps3.earth.Earth(),
    path: new vgps3.path.Path()
  };

  /**
  * @type {!goog.debug.Logger}
  * @private
  */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.Viewer');

  this.map = new vgps3.Map(
      mapContainer,
      {
        mapTypeControlOptions: {
          mapTypeIds: [
            google.maps.MapTypeId.HYBRID,
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.TERRAIN,
            vgps3.ign.MapTypeId.TERRAIN,
            vgps3.earth.MapTypeId.EARTH
          ]
        }
      },
      goog.object.getValues(this.plugins)
      );

  var console = new goog.debug.Console();
  console.setCapturing(true);

  this.wireEvents_();

  this.parseUrl_(document.location.href);
};


/**
 * @private
 */
vgps3.Viewer.prototype.wireEvents_ = function() {

  var map = this.map,
    track = this.plugins.track,
    chart = this.plugins.chart,
    earth = this.plugins.earth,
    eventMap = new goog.structs.Map(
      vgps3.chart.EventType.MOVE, function(e) { track.moveTo(e.position); earth.moveTo(e.position); },
      vgps3.chart.EventType.CLICK, function(e) { track.moveTo(e.position, true); earth.moveTo(e.position, true); },
      vgps3.chart.EventType.WHEEL, function(e) { track.moveTo(e.position, true, -e.direction); earth.moveTo(e.position, true, e.direction);},
      vgps3.chart.EventType.ABOUT, function(e) { map.showAbout(); },
      vgps3.track.EventType.CLICK, function(e) { chart.moveTo(e.position); earth.moveTo(e.position, true); }
   );

  goog.object.forEach(eventMap.toObject(), function(handler, event) {
    map.addEventListener(event, handler);
  });
};


/**
 * @param {string} url
 *
 * @private
 */
vgps3.Viewer.prototype.parseUrl_ = function(url) {
  var uri = new goog.Uri(url),
      routeType = uri.getParameterValue('flightType'),
      turnpoints = uri.getParameterValues('turnpoints'),
      start = uri.getParameterValue('start'),
      end = uri.getParameterValue('end');


  goog.array.forEach(
    uri.getParameterValues('track') || [],
    function(track) {
      this.logger_.info('Loading track: ' + track);
      this.plugins.track.load(track);
    },
    this
  );

  if (routeType && turnpoints) {
    turnpoints = goog.array.map(/** @type {!Array.<number>} */(goog.json.parse(turnpoints)), this.array2LatLng_);
    this.plugins.route.draw(
      routeType,
      turnpoints,
      start ? this.array2LatLng_(/** @type {!Array.<number>} */(goog.json.parse(start))) : undefined,
      end ? this.array2LatLng_(/** @type {!Array.<number>} */(goog.json.parse(end))) : undefined
    );
  }
};


/**
 *
 * @param {Array.<number>|number} latlng
 *
 * @return {google.maps.LatLng}
 * @private
 */
vgps3.Viewer.prototype.array2LatLng_ = function(latlng) {
  return latlng && goog.isArray(latlng) ? new google.maps.LatLng(latlng[0], latlng[1]) : null;
};


/**
 * @define {string}
 */
vgps3.VERSION = '3.0';
