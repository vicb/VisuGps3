/**
 * Copyright 2012 Victor Berchet
 *
 * This file is part of VisuGps3
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

/**
 * @fileoverview Load tracks on top of a map.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.track.Track');

goog.require('goog.color');
goog.require('goog.events.Event');
goog.require('goog.math');
goog.require('goog.net.XhrIo');
goog.require('goog.string.format');
goog.require('goog.style');
goog.require('vgps3.Control');
goog.require('vgps3.IPlugin');
goog.require('vgps3.Map');
goog.require('vgps3.track.ClickEvent');
goog.require('vgps3.track.LoadEvent');
goog.require('vgps3.track.TrackSelectEvent');
goog.require('vgps3.track.templates');
goog.require('goog.string.format');



/**
 * @constructor
 * @implements {vgps3.IPlugin}
 */
vgps3.track.Track = function() {
  /**
  * @type {vgps3.Map}
  * @private
  */
  this.vgps_;

  /**
  * @type {google.maps.Map}
  * @private
  */
  this.gMap_;

  /**
  * Track data
  * @typedef {Array.<{
  *   fixes: vgps3.track.GpsFixes,
  *   points: google.maps.Point,
  *   bounds: google.maps.Bounds,
  *   polyline: google.maps.Polyline,
  *   color: string
  * }>}
  * @private
  */
  this.tracks_ = [];

  /**
  * @type {number|undefined}
  * @private
  */
  this.currentTrackIndex_;

  /**
   * @type {google.maps.Marker}
   * @private
   */
  this.currentTrackMarker_;

  /**
  * Info control
  * @type {vgps3.Control}
  * @private
  */
  this.infoControl_;

  /**
  * Info control
  * @type {vgps3.Control}
  * @private
  */
  this.dateControl_;

  /**
  * @type {!goog.debug.Logger}
  * @private
  */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.track.Track');
};


/**
 * @override
 */
vgps3.track.Track.prototype.init = function(vgps) {
  this.vgps_ = vgps;
  this.gMap_ = vgps.getGoogleMap();

  google.maps.event.addListener(this.gMap_, 'click', goog.bind(this.clickHandler_, this));
};


/**
 * @param {string} url The track url.
 */
vgps3.track.Track.prototype.load = function(url) {
  goog.net.XhrIo.send(
      vgps3.track.PROXY_URL + url,
      goog.bind(this.afterTrackLoad_, this, url)
  );
};


/**
 * @param {number} position [0...1].
 * @param {boolean=} setCenter Whether to center the map.
 * @param {number=} zoomOffset
 */
vgps3.track.Track.prototype.moveTo = function(position, setCenter, zoomOffset) {
  var track = this.tracks_[this.currentTrackIndex_],
      pointIndex = Math.round(position * (track.fixes.nbTrackPt - 1));

  this.updateInfoControl_(position);
  this.currentTrackMarker_.setPosition(track.points[pointIndex]);

  if (setCenter) {
    this.gMap_.setCenter(track.points[pointIndex]);
  }

  if (zoomOffset) {
    this.gMap_.setZoom(this.gMap_.getZoom() + zoomOffset);
  }
};


/**
 * Callback executed after the track has been loaded.
 *
 * @see load
 *
 * @param {goog.events.Event} event
 * @param {string} url The url of the track.
 *
 * @private
 */
vgps3.track.Track.prototype.afterTrackLoad_ = function(url, event) {
  var xhr = /** @type {goog.net.XhrIo} */ (event.target);

  if (xhr.isSuccess()) {
    var track = /** @type {vgps3.track.GpsFixes} */ (xhr.getResponseJson());
    if (goog.isDef(track)) {
      this.addTrack_(url, (track));
    }
  }

  // TODO: unsupported track format
};


/**
 * Adds a track on the map.
 *
 * @param {string} url The url of the track.
 * @param {vgps3.track.GpsFixes} gpsFixes The track object.
 *
 * @private
 */
vgps3.track.Track.prototype.addTrack_ = function(url, gpsFixes) {
  /**
   * @type {google.maps.LatLng}
   */
  var point;

  /**
   * @type {google.maps.LatLngBounds}
   */
  var bounds = new google.maps.LatLngBounds();

  var trackIndex = this.tracks_.length;

  this.tracks_.push({
    points: [],
    fixes: gpsFixes
  });

  for (var i = 0; i < gpsFixes.nbTrackPt; i++) {
    point = new google.maps.LatLng(gpsFixes.lat[i], gpsFixes.lon[i]);
    this.tracks_[trackIndex].points.push(point);
    bounds.extend(point);
  }

  for (var i = 0; i < gpsFixes.nbChartPt; i++) {
    gpsFixes.elev[i] = goog.math.clamp(gpsFixes.elev[i], 0, vgps3.track.MAX_ELEV);
    gpsFixes.speed[i] = Math.min(vgps3.track.MAX_SPEED, gpsFixes.speed[i]);
    gpsFixes.vario[i] = Math.min(vgps3.track.MAX_VARIO, gpsFixes.vario[i]);
  }

  this.tracks_[trackIndex].bounds = bounds;

  this.tracks_[trackIndex].color = this.getTrackColor_(trackIndex);

  this.tracks_[trackIndex].polyline = new google.maps.Polyline(
      this.getPolylineOptions_(trackIndex)
      );

  // todo compute maxDelta server side
  var maxDelta = 0;
  var points = this.tracks_[trackIndex].points;
  for (var i = 1, nbPoints = points.length; i < nbPoints; ++i) {
    maxDelta = Math.max(
        google.maps.geometry.spherical.computeDistanceBetween(points[i - 1], points[i]),
        maxDelta
        );
  }
  this.tracks_[trackIndex].maxDelta = maxDelta;
  if (goog.DEBUG) {
    this.logger_.info(goog.string.format('track[%s].maxDelta = %.1fm', trackIndex, maxDelta));
  }

  this.gMap_.fitBounds(this.getTracksBounds_());

  if (0 === trackIndex) {
    this.currentTrackMarker_ = new google.maps.Marker({
      position: new google.maps.LatLng(gpsFixes.lat[0], gpsFixes.lon[0]),
      map: this.gMap_,
      clickable: false
    });

    this.infoControl_ = new vgps3.Control(
        this.gMap_,
        vgps3.track.templates.infoControl,
        google.maps.ControlPosition.RIGHT_BOTTOM
        );

    this.dateControl_ = new vgps3.Control(
        this.gMap_,
        vgps3.track.templates.dateControl,
        google.maps.ControlPosition.RIGHT_TOP
        );

    this.selectCurrentTrack_(0);
  }

  this.vgps_.dispatchEvent(new vgps3.track.LoadEvent(trackIndex, gpsFixes, this.tracks_[trackIndex].color));
};


/**
 * @param {number} index
 * @private
 */
vgps3.track.Track.prototype.getPolylineOptions_ = function(index) {
  /**
   * @type {boolean}
   */
  var current = !goog.isDef(this.currentTrackIndex_) || index === this.currentTrackIndex_;

  return {
    clickable: false,
    map: this.gMap_,
    path: this.tracks_[index].points,
    strokeColor: this.tracks_[index].color,
    strokeWeight: 2,
    strokeOpacity: current ? 1 : 0.5
  };
};


/**
 * @param {number} index
 * @return {string}
 * @private
 */
vgps3.track.Track.prototype.getTrackColor_ = function(index) {
  var colors = ['#ff0000', '#5e008c', '#002b40', '#f2f200', '#00e64d', '#00ffff', '#e60099', '#ffffff', '#0088cc'];

  return colors[index % colors.length];
};


/**
 * Computes the bounding box include all loaded tracks
 *
 * @return {google.maps.LatLngBounds}
 * @private
 */
vgps3.track.Track.prototype.getTracksBounds_ = function() {
  /**
   * @type {google.maps.LatLngBounds}
   */
  var bounds = new google.maps.LatLngBounds();

  goog.array.forEach(this.tracks_, function(track) {
    bounds.union(track.bounds);
  });

  return bounds;
};

/**
 * @param {number} trackIdx
 * @param {number=} previousTrackIndex
 * @private
 */
vgps3.track.Track.prototype.selectCurrentTrack_ = function(trackIdx, previousTrackIndex) {
  if (trackIdx !== previousTrackIndex) {
    this.currentTrackIndex_ = trackIdx;
    this.updateDateControl_(trackIdx);
    goog.style.setStyle(
      this.dateControl_.getElement(),
      'background-color',
      goog.color.rgbArrayToHex(goog.color.lighten(goog.color.hexToRgb(this.tracks_[trackIdx].color), .6))
    );
    this.updateInfoControl_(0);
    this.moveTo(0);
    this.tracks_[trackIdx].polyline.setOptions(this.getPolylineOptions_(trackIdx));
    goog.isDef(previousTrackIndex) && this.tracks_[previousTrackIndex].polyline.setOptions(this.getPolylineOptions_(previousTrackIndex));
    this.vgps_.dispatchEvent(new vgps3.track.TrackSelectEvent(
        trackIdx,
        goog.isDef(previousTrackIndex) ? previousTrackIndex: null
    ));
  }
};


/**
 * @param {google.maps.MouseEvent} event
 * @private
 */
vgps3.track.Track.prototype.clickHandler_ = function(event) {
  this.logger_.info(goog.string.format('Click %.5f %.5f', event.latLng.lat(), event.latLng.lng()));

  var trackIndex,
      pointIndex,
      location,
      currentDistance, distance = 10000,
      latlng = event.latLng,
      that = this;

  goog.array.forEach(this.tracks_, function(track, trackIdx) {
    if (goog.DEBUG) {
      var trials = 0;
    }
    for (var pointIdx = 0, nbPoints = track.points.length; pointIdx < nbPoints; ) {
      if (goog.DEBUG) {
        trials++;
      }
      currentDistance = google.maps.geometry.spherical.computeDistanceBetween(latlng, track.points[pointIdx]);
      if (currentDistance < distance) {
        distance = currentDistance;
        location = track.points[pointIdx];
        trackIndex = trackIdx;
        pointIndex = pointIdx;
        ++pointIdx;
      } else {
        pointIdx += Math.max(1, Math.floor((currentDistance - distance) / track.maxDelta));
      }
    }
    if (goog.DEBUG) {
      that.logger_.info(goog.string.format(
          'Click location search: %d trials for %d points',
          trials,
          nbPoints
      ));
    }
  });

  if (goog.isDef(location)) {
    this.selectCurrentTrack_(trackIndex, this.currentTrackIndex_);
    var position = pointIndex / (this.tracks_[trackIndex].fixes.nbTrackPt - 1);

    this.currentTrackMarker_.setPosition(location);
    this.updateInfoControl_(position);
    this.vgps_.dispatchEvent(new vgps3.track.ClickEvent(
        this.tracks_[trackIndex].fixes,
        position
    ));
  }

};


/**
 * @param {number} position [0...1].
 * @private
 */
vgps3.track.Track.prototype.updateInfoControl_ = function(position) {
  var fixes = this.tracks_[this.currentTrackIndex_].fixes,
      chartIndex = Math.round(position * (fixes.nbChartPt - 1));

  this.infoControl_.update({
    fixes: fixes,
    index: chartIndex
  });
};


/**
 * @param {number} trackIndex
 * @private
 */
vgps3.track.Track.prototype.updateDateControl_ = function(trackIndex) {
  var fixes = this.tracks_[trackIndex].fixes;

  this.dateControl_.update({
    date: fixes.date,
    pilot: fixes.pilot
  });
};


/**
 * @enum {string}
 */
vgps3.track.EventType = {
  CLICK: 'vgps3.track.click',
  LOAD: 'vgps3.track.load',
  SELECT: 'vgps3.track.select'
};


/**
 * @define {string}
 */
vgps3.track.PROXY_URL = 'php/vg_proxy.php?track=';


/**
 * @define {number}
 */
vgps3.track.MAX_SPEED = 100;


/**
 * @define {number}
 */
vgps3.track.MAX_VARIO = 15;


/**
 * @define {number}
 */
vgps3.track.MAX_ELEV = 9000;


/**
 * @typedef {{label: !Array.<string>, hour: !Array.<string>, min: !Array.<string>, sec: !Array.<string>}}
 */
vgps3.track.Time;


/**
 * @typedef {{day: !Array.<string>, month: !Array.<string>, year: !Array.<string>}}
 */
vgps3.track.Date;


/**
 * @typedef {{
 *   time: vgps3.track.Time,
 *   elev: !Array.<number>,
 *   elevGnd: !Array.<number>,
 *   speed: !Array.<number>,
 *   vario: !Array.<number>,
 *   lat: !Array.<number>,
 *   lon: !Array.<number>,
 *   nbTrackPt: number,
 *   nbChartPt: number,
 *   nbChartLbl: number,
 *   date: vgps3.track.Date,
 *   pilot: ?string
 *   }}
 */
vgps3.track.GpsFixes;

// todo dispose
