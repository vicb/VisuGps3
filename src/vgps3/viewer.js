/**
 * Copyright Victor Berchet.
 *
 * VisuGps3
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

/**
 * @fileoverview VisuGps3 viewer.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.Viewer');

goog.require('goog.Timer');
goog.require('goog.Uri');
goog.require('goog.array');
goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.events');
goog.require('goog.json');
goog.require('goog.object');
goog.require('goog.structs.Map');
goog.require('vgps3.airspace.Airspace');
goog.require('vgps3.chart.Chart');
goog.require('vgps3.doarama.Doarama');
goog.require('vgps3.earth.Earth');
goog.require('vgps3.fullscreen.Fullscreen');
goog.require('vgps3.path.Path');
goog.require('vgps3.route.Route');
goog.require('vgps3.skyways.Skyways');
goog.require('vgps3.topo.ch.Map');
goog.require('vgps3.topo.es.Map');
goog.require('vgps3.topo.eu.Map');
goog.require('vgps3.topo.fr.Map');
goog.require('vgps3.track.Track');



/**
 * Creates a VisuGps3 viewer with all the plugins.
 *
 * @param {!Element} mapContainer
 * @param {!Element} chartContainer
 * @constructor
 */
vgps3.Viewer = function(mapContainer, chartContainer) {
  /**
   * @type {vgps3.Map}
   * @private
   */
  this.vgps_;

  /**
  * @type {Object.<string, vgps3.PluginBase>}
  */
  this.plugins = {
    'track': new vgps3.track.Track(),
    'chart': new vgps3.chart.Chart(chartContainer),
    'topofr': new vgps3.topo.fr.Map(),
    'topoes': new vgps3.topo.es.Map(),
    'topoch': new vgps3.topo.ch.Map(),
    'topoeu': new vgps3.topo.eu.Map(),
    'route': new vgps3.route.Route(),
    'earth': new vgps3.earth.Earth(),
    'path': new vgps3.path.Path(),
    'airspace': new vgps3.airspace.Airspace(),
    'skyways': new vgps3.skyways.Skyways(),
    'doarama': new vgps3.doarama.Doarama(),
    'fs': new vgps3.fullscreen.Fullscreen()
  };

  /**
  * @type {!goog.debug.Logger}
  * @private
  */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.Viewer');

  var that = this;

  this.vgps_ = new vgps3.Map(
      mapContainer,
      function() { return {
        mapTypeControlOptions: {
          mapTypeIds: [
            google.maps.MapTypeId.HYBRID,
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.TERRAIN,
            vgps3.topo.fr.MapTypeId.TERRAIN,
            vgps3.topo.ch.MapTypeId.TERRAIN,
            vgps3.topo.es.MapTypeId.TERRAIN,
            vgps3.topo.eu.MapTypeId.TERRAIN,
            vgps3.earth.MapTypeId.EARTH
          ],
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
      };
      },
      goog.object.getValues(this.plugins),
      function() {
        that.wireEvents_();
        that.parseUrl_(document.location.href);
      }
      );
};


/**
 * Wires all the events.
 *
 * @private
 */
vgps3.Viewer.prototype.wireEvents_ = function() {

  var vgps = this.vgps_,
      track = this.plugins['track'],
      chart = this.plugins['chart'],
      earth = this.plugins['earth'],
      eventMap = new goog.structs.Map(
      vgps3.chart.EventType.MOVE, function(e) {track.moveTo(e.position); earth.moveTo(e.position);},
      vgps3.chart.EventType.CLICK, function(e) {track.moveTo(e.position, true); earth.moveTo(e.position, true);},
      vgps3.chart.EventType.WHEEL, function(e) {track.moveTo(e.position, true, -e.direction); earth.moveTo(e.position, true, e.direction);},
      vgps3.chart.EventType.ABOUT, function(e) {vgps.showAbout();},
      vgps3.track.EventType.CLICK, function(e) {chart.moveTo(e.position); earth.moveTo(e.position);}
      );

  goog.object.forEach(eventMap.toObject(), function(listener, event) {
    goog.events.listen(vgps, event, listener);
  });
};


/**
 * Parse the URL to display tracks and turnpoints.
 * Supported parameters:
 *   - track: URL to a track (could appear multiple times)
 *   - turnpoints: Array of turnpoints, json encoded (Array<latitude, longitude>)
 *   - start: Start of the track (Array<latitude, longitude>, json encoded)
 *   - end: End of the track (Array<latitude, longitude>, json encoded)
 *
 * @param {string} url
 *
 * @private
 */
vgps3.Viewer.prototype.parseUrl_ = function(url) {
  var uri = new goog.Uri(url),
      routeType = uri.getParameterValue('flightType'),
      turnpoints = uri.getParameterValues('turnpoints'),
      start = uri.getParameterValue('start'),
      end = uri.getParameterValue('end'),
      hasTrack = false,
      urls = uri.getParameterValues('track') || [];

  goog.array.forEach(
      urls,
      function(track) {
        hasTrack = true;
        this.logger_.info('Loading track: ' + track);
        this.plugins['track'].load(track);
      },
      this
  );

  if (uri.getQueryData().containsKey('live')) {
    this.logger_.info('Updating activated');
    // Load every min
    var trackPlugin = this.plugins['track'];
    var timer = new goog.Timer(60000);
    timer.listen(
      goog.Timer.TICK,
      function() {
        goog.array.forEach(
            urls,
            function(track) {
              trackPlugin.update(track);
            },
            this
        );
      }
    );
    timer.start();
  }

  if (routeType && turnpoints) {
    turnpoints = goog.array.map(/** @type {!Array.<number>} */(goog.json.parse(turnpoints)), this.array2LatLng_);
    this.plugins.route.draw(
        routeType,
        turnpoints,
        start ? this.array2LatLng_(/** @type {!Array.<number>} */(goog.json.parse(start))) : undefined,
        end ? this.array2LatLng_(/** @type {!Array.<number>} */(goog.json.parse(end))) : undefined,
        !hasTrack
    );
  }
};


/**
 * Converts an Array.<latitude, longitude> to a Google maps LatLng.
 *
 * @param {(Array.<number>|number)=} opt_latlng
 *
 * @return {google.maps.LatLng}
 * @private
 */
vgps3.Viewer.prototype.array2LatLng_ = function(opt_latlng) {
  return opt_latlng && goog.isArray(opt_latlng) ? new google.maps.LatLng(opt_latlng[0], opt_latlng[1]) : null;
};

goog.exportSymbol('vgps3.Viewer', vgps3.Viewer);

if (goog.DEBUG) {
  (function() {
    var console = new goog.debug.Console();
    console.setCapturing(true);
  })();
}
