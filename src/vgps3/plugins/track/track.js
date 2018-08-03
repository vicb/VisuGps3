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
 * @fileoverview Load tracks on top of a map.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.track.Track');

goog.require('goog.array');
goog.require('goog.color');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.math');
goog.require('goog.net.XhrIo');
goog.require('goog.string.format');
goog.require('goog.style');
goog.require('vgps3.Control');
goog.require('vgps3.Map');
goog.require('vgps3.PluginBase');
goog.require('vgps3.loadMask');
goog.require('vgps3.track.ClickEvent');
goog.require('vgps3.track.LoadEvent');
goog.require('vgps3.track.TrackSelectEvent');
goog.require('vgps3.track.UpdateEvent');
goog.require('vgps3.track.templates');



/**
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.track.Track = function() {
  /**
  * Track data
  * @typedef {Array.<{
  *   fixes: vgps3.track.GpsFixes,
  *   points: google.maps.Point,
  *   bounds: google.maps.Bounds,
  *   polyline: google.maps.Polyline,
  *   color: string,
  *   iconScaler: function(number),
  *   url: string
  * }>}
  * @private
  */
  this.tracks_ = [];

  /**
   * List of kml layers
   * @type {Array.<google.maps.KmlLayer>}
   * @private
   */
  this.kmlLayers_ = [];

  /**
   * @type {number} The index of the current track
   * @private
   */
  this.currentTrackIndex_;

  /**
   * @type {number} The index for the next track to add
   * @private
   */
  this.nextTrackIndex_ = 0;

  /**
   * @type {boolean} Whether a load request has been queued
   * @private
   */
  this.jsonRequest_ = false;

  /**
   * @type {google.maps.Marker} The marker for the current position (on any track)
   * @private
   */
  this.currentTrackMarker_;

  /**
  * @type {vgps3.Control} The control where current location info is displayed
  * @private
  */
  this.infoControl_;

  /**
  * @type {vgps3.Control} The control where current track info is displayed
  * @private
  */
  this.trackControl_;

  /**
  * @type {!goog.debug.Logger}
  * @private
  */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.track.Track');

  goog.base(this);
};
goog.inherits(vgps3.track.Track, vgps3.PluginBase);


/**
 * @override
 */
vgps3.track.Track.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);
  google.maps.event.addListener(this.gMap_, 'click', goog.bind(this.clickHandler_, this));
};


/**
 * @override
 */
vgps3.track.Track.prototype.requireGoogleMapLibs = function() {
  return ['geometry'];
};


/**
 * Loads track on the map.
 *
 * @param {string} url The track url.
 */
vgps3.track.Track.prototype.load = function(url) {
  if (!this.jsonRequest_) {
    vgps3.loadMask.setMessage('Chargement de la trace', undefined, true);
    this.jsonRequest_ = true;
  }
  goog.net.XhrIo.send(vgps3.track.PROXY_URL + url, goog.bind(this.trackLoadHandler_, this, url, this.nextTrackIndex_));
  this.nextTrackIndex_++;
};

/**
 * Loads track on the map.
 *
 * @param {vgps3.track.GpsFixes} track
 */
vgps3.track.Track.prototype.loadJSON = function(track) {
  this.addTrack_('drag&drop', this.nextTrackIndex_++, track);
};

/**
 * Update a track
 *
 * @param {string} url The track url.
 */
vgps3.track.Track.prototype.update = function(url) {
  var index = goog.array.findIndex(this.tracks_, function(t) { return t.url == url; });

  if (index > -1) {
    goog.net.XhrIo.send(vgps3.track.PROXY_URL + url, goog.bind(this.trackLoadHandler_, this, url, index));
  }
};

/**
 * Moves to the specified position on the current track.
 *
 * @param {number} position [0...1].
 * @param {boolean=} opt_setCenter Whether to center the map.
 * @param {number=} opt_zoomOffset
 */
vgps3.track.Track.prototype.moveTo = function(position, opt_setCenter, opt_zoomOffset) {
  var track = this.tracks_[this.currentTrackIndex_],
      pointIndex = Math.round(position * (track.fixes['nbTrackPt'] - 1));

  this.updateInfoControl_(position);
  this.currentTrackMarker_.setPosition(track.points[pointIndex]);
  track.iconScaler && track.iconScaler(position);

  if (opt_setCenter) {
    this.gMap_.setCenter(track.points[pointIndex]);
  }

  if (opt_zoomOffset) {
    this.gMap_.setZoom(this.gMap_.getZoom() + opt_zoomOffset);
  }
};


/**
 * @override
 */
vgps3.track.Track.prototype.disposeInternal = function() {
  var that = this;
  goog.base(this, 'disposeInternal');
  goog.disposeAll(this.infoControl_, this.trackControl_);
  this.currentTrackMarker_.setMap(null);
  delete this.currentTrackMarker_;
  goog.array.forEach(this.tracks_, function(track, index) {
    track.polyline.setMap(null);
    that.tracks_[index] = null;
  });
};


/**
 * Callback executed after the track has been loaded.
 *
 * @param {goog.events.Event} event
 * @param {string} url The url of the track.
 * @param {number} trackIndex The track index.
 *
 * @private
 * @see load
 */
vgps3.track.Track.prototype.trackLoadHandler_ = function(url, trackIndex, event) {
  var xhr = /** @type {goog.net.XhrIo} */ (event.target);

  if (xhr.isSuccess()) {
    var track = /** @type {vgps3.track.GpsFixes} */ (xhr.getResponseJson());
    goog.dispose(xhr);
    if (track) {
      this.addTrack_(url, trackIndex, track);
      return;
    }
  } else {
    goog.dispose(xhr);
  }

  vgps3.loadMask.setMessage('Erreur de chargement de la trace', vgps3.loadMask.Style.ERROR);
};


/**
 * Adds a track on the map.
 *
 * @param {string} url The url of the track.
 * @param {vgps3.track.GpsFixes} gpsFixes The track object.
 *
 * @private
 */
vgps3.track.Track.prototype.addTrack_ = function(url, trackIndex, gpsFixes) {
  var point,
      minElevation = Number.MAX_VALUE,
      maxElevation = Number.MIN_VALUE,
      bounds = new google.maps.LatLngBounds(),
      updating = goog.isDef(this.tracks_[trackIndex]);

  if (gpsFixes['kmlUrl']) {
    this.logger_.info('Adding a kml layer');
    var that = this;
    var layer = new google.maps.KmlLayer({
      map: this.gMap_,
      url: gpsFixes['kmlUrl'],
      preserveViewport: true
    });

    google.maps.event.addListener(layer, 'defaultviewport_changed', function() {
      if (layer.getStatus() == google.maps.KmlLayerStatus.OK) {
        that.kmlLayers_.push(layer);
        that.gMap_.fitBounds(that.getTracksBounds_());
        vgps3.loadMask.close();
      }
    });

    return;
  }

  if (updating) {
    this.logger_.info(goog.string.format('Updating track[%d]', trackIndex));
    // Remove the track from the map
    this.tracks_[trackIndex].polyline.setMap(null);
  } else {
    this.logger_.info(goog.string.format('Adding track[%d]', trackIndex));
  }

  this.tracks_[trackIndex] = {
    points: [],
    fixes: gpsFixes,
    url: url
  };

  for (var i = 0; i < gpsFixes['nbTrackPt']; i++) {
    point = new google.maps.LatLng(gpsFixes['lat'][i], gpsFixes['lon'][i]);
    this.tracks_[trackIndex].points.push(point);
    bounds.extend(point);
  }

  gpsFixes['maxElev'] = 0;

  for (var i = 0, elev; i < gpsFixes['nbChartPt']; i++) {
    elev = goog.math.clamp(gpsFixes['elev'][i], 0, vgps3.track.MAX_ELEV);
    gpsFixes['elev'][i] = elev;
    gpsFixes['maxElev'] = Math.max(elev, gpsFixes['maxElev']);
    maxElevation = Math.max(maxElevation, elev);
    minElevation = Math.min(minElevation, elev);
    gpsFixes['speed'][i] = Math.min(vgps3.track.MAX_SPEED, gpsFixes['speed'][i]);
    gpsFixes['vario'][i] = Math.min(vgps3.track.MAX_VARIO, gpsFixes['vario'][i]);
  }

  this.tracks_[trackIndex].bounds = bounds;
  this.tracks_[trackIndex].color = this.getTrackColor_(trackIndex);
  this.tracks_[trackIndex].polyline = new google.maps.Polyline(this.getPolylineOptions_(trackIndex));

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

  if (!updating) {
    this.gMap_.fitBounds(this.getTracksBounds_());
  }

  if (!this.currentTrackMarker_) {
    this.currentTrackMarker_ = new google.maps.Marker({
      position: this.tracks_[0].points[0],
      map: this.gMap_,
      clickable: false,
      icon: {
        anchor: new google.maps.Point(vgps3.track.ICON_ANCHOR_X, vgps3.track.ICON_ANCHOR_Y),
        size: new google.maps.Size(vgps3.track.ICON_WIDTH, vgps3.track.ICON_HEIGHT),
        scaledSize: new google.maps.Size(vgps3.track.ICON_WIDTH, vgps3.track.ICON_HEIGHT),
        url: vgps3.track.ICON_URL
      }
    });

    this.infoControl_ = new vgps3.Control(
        this.gMap_,
        vgps3.track.templates.infoControl,
        google.maps.ControlPosition.RIGHT_BOTTOM,
        true
        );
    this.infoControl_.setExtraClass('vgps3-earth-control');

    this.trackControl_ = new vgps3.Control(
        this.gMap_,
        vgps3.track.templates.dateControl,
        google.maps.ControlPosition.RIGHT_TOP,
        true
        );
    this.trackControl_.setExtraClass('vgps3-earth-control');

    this.selectCurrentTrack_(trackIndex);
    vgps3.loadMask.close();
  }

  this.tracks_[trackIndex].iconScaler = this.getIconScaler_(minElevation, maxElevation, gpsFixes['elev']);

  if (updating) {
    this.dispatchEvent(
        new vgps3.track.UpdateEvent(trackIndex, gpsFixes)
    );
  } else {
    this.dispatchEvent(
        new vgps3.track.LoadEvent(trackIndex, gpsFixes, this.tracks_[trackIndex].color, url)
    );
  }
};


/**
 * Returns a function that scales the current marker.
 *
 * @param {number} minElevation Minimum elevation along the track.
 * @param {number} maxElevation Maximum elevation along the track.
 * @param {Array.<number>} fixes The GPS fixes.
 * @return {function(number)}
 *
 * @private
 */
vgps3.track.Track.prototype.getIconScaler_ = function(minElevation, maxElevation, fixes) {
  var range = maxElevation - minElevation,
      icon = this.currentTrackMarker_.getIcon();
  return function(position) {
    var elevation = fixes[Math.round(fixes.length * position)],
        scale = (elevation - minElevation) / range + 0.5;
    icon.anchor.y = Math.round(scale * vgps3.track.ICON_ANCHOR_Y);
    icon.anchor.x = Math.round(scale * vgps3.track.ICON_ANCHOR_X);
    icon.size.height = icon.scaledSize.height = Math.round(scale * vgps3.track.ICON_HEIGHT);
    icon.size.width = icon.scaledSize.width = Math.round(scale * vgps3.track.ICON_WIDTH);
  };
};


/**
 * Returns the polyline options for the given track.
 *
 * @param {number} trackIndex
 * @private
 */
vgps3.track.Track.prototype.getPolylineOptions_ = function(trackIndex) {
  var current = !goog.isDef(this.currentTrackIndex_) || trackIndex === this.currentTrackIndex_;

  return {
    clickable: false,
    map: this.gMap_,
    path: this.tracks_[trackIndex].points,
    strokeColor: this.tracks_[trackIndex].color,
    strokeWeight: 2,
    strokeOpacity: current ? 1 : 0.5
  };
};


/**
 * Returns the color of the given track.
 *
 * @param {number} trackIndex
 * @return {string}
 * @private
 */
vgps3.track.Track.prototype.getTrackColor_ = function(trackIndex) {
  return vgps3.track.COLORS[trackIndex % vgps3.track.COLORS.length];
};


/**
 * Computes the bounding box for all loaded tracks.
 *
 * @return {google.maps.LatLngBounds}
 * @private
 */
vgps3.track.Track.prototype.getTracksBounds_ = function() {
  /** @type {google.maps.LatLngBounds} */
  var bounds;
  bounds = goog.array.reduce(
    this.tracks_,
    function(bounds, track) {return bounds.union(track.bounds);},
    new google.maps.LatLngBounds()
  );

  bounds = goog.array.reduce(
    this.kmlLayers_,
    function(bounds, layer) {
      return bounds.union(layer.getDefaultViewport());
    },
    bounds
  );

  return bounds;
};


/**
 * Selects a track.
 *
 * @param {number} trackIndex
 * @param {number=} opt_prevTrackIndex
 * @private
 */
vgps3.track.Track.prototype.selectCurrentTrack_ = function(trackIndex, opt_prevTrackIndex) {
  if (trackIndex !== opt_prevTrackIndex) {
    this.currentTrackIndex_ = trackIndex;
    this.updateTrackControl_(trackIndex);
    goog.style.setStyle(
        /** @type {Element} */ (this.trackControl_.getElement().parentNode),
        'background-color',
        goog.color.rgbArrayToHex(goog.color.lighten(goog.color.hexToRgb(this.tracks_[trackIndex].color), .6))
    );
    this.updateInfoControl_(0);
    this.moveTo(0);
    this.tracks_[trackIndex].polyline.setOptions(this.getPolylineOptions_(trackIndex));
    if (goog.isDef(opt_prevTrackIndex)) {
      this.tracks_[opt_prevTrackIndex].polyline.setOptions(this.getPolylineOptions_(opt_prevTrackIndex));
    }
    this.dispatchEvent(
        new vgps3.track.TrackSelectEvent(
        trackIndex,
        goog.isDef(opt_prevTrackIndex) ? opt_prevTrackIndex : null
        ));
  }
};


/**
 * Moves to the closest point of any of the loaded track.
 *
 * @param {google.maps.MouseEvent} event
 * @private
 */
vgps3.track.Track.prototype.clickHandler_ = function(event) {
  var trackIndex,
      pointIndex,
      location,
      currentDistance,
      distance = 10000,
      latlng = event.latLng,
      that = this;


  var gtag = goog.global['gtag'];
  if (goog.isDef(gtag)) {
    gtag('event', 'track', {
      'value': 'click'
    });
  }

  goog.array.forEach(this.tracks_, function(track, trackIdx) {
    if (goog.DEBUG) {var trials = 0;}
    for (var pointIdx = 0, nbPoints = track.points.length; pointIdx < nbPoints; ) {
      if (goog.DEBUG) {trials++;}
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

  if (location) {
    this.selectCurrentTrack_(trackIndex, this.currentTrackIndex_);
    var position = pointIndex / (this.tracks_[trackIndex].fixes['nbTrackPt'] - 1);
    this.currentTrackMarker_.setPosition(location);
    this.updateInfoControl_(position);
    this.dispatchEvent(
        new vgps3.track.ClickEvent(this.tracks_[trackIndex].fixes, position
        ));
  }
};


/**
 * Updates the info control according to the current location.
 *
 * @param {number} position [0...1].
 * @private
 */
vgps3.track.Track.prototype.updateInfoControl_ = function(position) {
  var fixes = this.tracks_[this.currentTrackIndex_].fixes,
      chartIndex = Math.round(position * (fixes['nbChartPt'] - 1));
  this.infoControl_.update({fixes: fixes, index: chartIndex});
};


/**
 * Updates the track control according to the current track.
 * @param {number} trackIndex
 * @private
 */
vgps3.track.Track.prototype.updateTrackControl_ = function(trackIndex) {
  var fixes = this.tracks_[trackIndex].fixes;
  this.trackControl_.update({date: fixes['date'], pilot: fixes['pilot']});
};


/**
 * @enum {string}
 */
vgps3.track.EventType = {
  CLICK: 'vgps3.track.click',
  LOAD: 'vgps3.track.load',
  SELECT: 'vgps3.track.select',
  UPDATE: 'vgps3.track.update'
};


/**
 * @const {Array.<string>} Successive track colors
 */
vgps3.track.COLORS = ['#ff0000', '#5e008c', '#002b40', '#f2f200', '#00e64d', '#00ffff', '#e60099', '#ffffff', '#0088cc'];


/**
 * @define {string} The proxy URL used to load track (AJAX does not support XDomain).
 */
vgps3.track.PROXY_URL = 'php/vg_proxy.php?track=';


/**
 * @define {number} The maximum speed (km/h).
 */
vgps3.track.MAX_SPEED = 200;


/**
 * @define {number} The maximum vertical speed (m/s).
 */
vgps3.track.MAX_VARIO = 15;


/**
 * @define {number} The maximum elevation (m).
 */
vgps3.track.MAX_ELEV = 9000;


/**
 * @define {string} The icon URL.
 */
vgps3.track.ICON_URL = 'img/red-shadow.png';


/**
 * @define {number} The icon X-anchor.
 */
vgps3.track.ICON_ANCHOR_X = 16;


/**
 * @define {number} The icon Y-anchor.
 */
vgps3.track.ICON_ANCHOR_Y = 32;


/**
 * @define {number} The icon width.
 */
vgps3.track.ICON_WIDTH = 59;


/**
 * @define {number} The icon height.
 */
vgps3.track.ICON_HEIGHT = 32;


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
 *   maxElev: number,
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

goog.exportSymbol('vgps3.track.Track', vgps3.track.Track);
goog.exportSymbol('vgps3.track.PROXY_URL', vgps3.track.PROXY_URL);
goog.exportSymbol('vgps3.track.Track.init', vgps3.track.Track.prototype.init);
goog.exportSymbol('vgps3.track.Track.load', vgps3.track.Track.prototype.load);

