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
 * @fileoverview Load tracks on top of a map
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.track.Track');

goog.require('vgps3.Map');
goog.require('vgps3.IPlugin');
goog.require('vgps3.track.InfoControl');
goog.require('vgps3.track.templates');
goog.require('vgps3.track.LoadEvent');
goog.require('vgps3.track.ClickEvent');

goog.require('goog.object');
goog.require('goog.net.XhrIo');
goog.require('goog.events.Event');
goog.require('goog.events.Event');

/**
 * @constructor
 * @implements {vgps3.IPlugin}
 */
vgps3.track.Track = function() {
    /**
     * @type {vgps3.Map}
     * @private
     */
    this.vgps_ = null;

    /**
     * @type {google.maps.Map}
     * @private
     */
    this.map_ = null;

    /**
     * Track data
     * @type {Object.<(goog.Uri|string), *>}
     * @private
     */
    this.tracks_ = {};
    /**
     * @type {goog.Uri|string}
     * @private
     */
    this.currentTrackIndex_ = null;

    /**
     * Info control
     * @type {vgps3.track.InfoControl}
     * @private
     */
    this.infoControl_ = null;

    /**
     * @type {Element}
     * @private
     */
    this.dateControlDom_ = null;
};

/**
 * @override
 */
vgps3.track.Track.prototype.init = function(vgps) {
    var track = this;

    this.vgps_ = vgps;
    this.map_ = vgps.getGoogleMap();

    google.maps.event.addListener(this.map_, 'click', goog.bind(this.onMapClick_, this));
};

/**
 * @param {string|goog.Uri} url The track url
 */
vgps3.track.Track.prototype.load = function(url) {
    goog.net.XhrIo.send(
        vgps3.track.PROXY_URL + url,
        goog.bind(this.afterTrackLoad_, this, url)
    );
};

/**
 * @param {number} position [0...1]
 * @param {boolean=} setCenter Whether to center the map
 */
vgps3.track.Track.prototype.moveTo = function(position, setCenter) {
    position = Math.max(Math.min(position, 1), 0);

    var track = this.tracks_[this.currentTrackIndex_],
        pointIndex = Math.round(position * (track.trackData.nbTrackPt - 1)),
        chartIndex = Math.round(position * (track.trackData.nbChartPt - 1))
    ;

    this.updateInfoControl_(this.currentTrackIndex_, chartIndex);
    track.marker.setPosition(track.points[pointIndex]);

    if (setCenter) {
        this.map_.setCenter(track.points[pointIndex]);
    }
};

/**
 * Callback executed after the track has been loaded.
 *
 * @see load
 *
 * @param {goog.events.Event} event
 * @param {string} url The url of the track
 *
 * @private
 */
vgps3.track.Track.prototype.afterTrackLoad_ = function(url, event) {
    var xhr = /** @type {goog.net.XhrIo} */ (event.target);

    if (xhr.isSuccess()) {
        var track = xhr.getResponseJson();
        if (goog.isDef(track)) {
            this.addTrack_(url, track);
        }
    }

    // TODO: unsupported track format
};

/**
 * Adds a track on the map.
 *
 * @param {!(goog.Uri|string)} url The url of the track
 * @param {Object.<string, *>} track The track object
 *
 * @private
 */
vgps3.track.Track.prototype.addTrack_ = function(url, track) {
    var point,
        bounds = new google.maps.LatLngBounds()
    ;

    // todo
    if (!this.currentTrackIndex_) {
        this.currentTrackIndex_ = url;
    }

    this.tracks_[url] = {
        points: [],
        trackData: track
    };

    for (var i = 0; i < track.nbTrackPt; i++) {
        point = new google.maps.LatLng(track.lat[i], track.lon[i]);
        this.tracks_[url].points.push(point);
        bounds.extend(point);
    }

    for (var i= 0; i <track.nbChartPoint; i++) {
        track.elev[i] = Math.min(vgps3.track.MAX_ELEV, track.elev[i]);
        track.speed[i] = Math.min(vgps3.track.MAX_SPEED, track.speed[i]);
        track.vario[i] = Math.min(vgps3.track.MAX_VARIO, track.vario[i]);
    }

    this.tracks_[url].bounds = bounds;

    this.tracks_[url].polyline = new google.maps.Polyline({
        clickable: false,
        map: this.map_,
        path: this.tracks_[url].points,
        strokeColor: "#ff0000",
        strokeWeight: 2
    });

    this.tracks_[url].marker = new google.maps.Marker({
        position: new google.maps.LatLng(track.lat[0], track.lon[0]),
        map: this.map_,
        clickable: false
    });

    this.map_.fitBounds(this.getTracksBounds_());

    if (!this.infoControl_) {
        this.infoControl_ = new vgps3.track.InfoControl(this.map_, google.maps.ControlPosition.RIGHT_BOTTOM);
        this.updateInfoControl_(url, 0);
    }

    if (!this.dateControlDom_) {
        this.dateControlDom_ = goog.dom.createDom('div', 'map-ctrl');
        var data = {date: [track.date.day, track.date.month, track.date.year].join('/')};
        if (track.pilot) {
            data.pilot = track.pilot;
        }
        goog.soy.renderElement(
            this.dateControlDom_,
            vgps3.track.templates.dateControl,
            {data: data}
        );
        this.map_.controls[google.maps.ControlPosition.RIGHT_TOP].push(this.dateControlDom_);
    }

    this.vgps_.dispatchEvent(new vgps3.track.LoadEvent(track));
}

/**
 * Computes the bounding box include all loaded tracks
 *
 * @return {google.maps.LatLngBounds}
 */
vgps3.track.Track.prototype.getTracksBounds_ = function() {
    var bounds = new google.maps.LatLngBounds();

    goog.object.forEach(this.tracks_, function(track) {
        bounds.union(track.bounds);
    })

    return bounds;
};

/**
 *
 * @param {google.maps.LatLng} latlng
 */
vgps3.track.Track.prototype.click = function(latlng) {
    var trackIndex, pointIndex, position, currentDistance, distance = Number.MAX_VALUE;

    goog.object.forEach(this.tracks_, function(track, trackIdx) {
        goog.array.forEach(track.points, function(point, pointIdx) {
            currentDistance = google.maps.geometry.spherical.computeDistanceBetween(latlng, point);
            if (currentDistance < distance) {
                distance = currentDistance;
                position = point;
                trackIndex = trackIdx;
                pointIndex = pointIdx;
            }
        })
    });

    if (position) {
        var track = this.tracks_[trackIndex],
            chartIndex = Math.round(pointIndex / (track.trackData.nbTrackPt - 1) * (track.trackData.nbChartPt - 1))
        ;
        track.marker.setPosition(position);
        this.updateInfoControl_(trackIndex, chartIndex);
        this.vgps_.dispatchEvent(new vgps3.track.ClickEvent(
            track.trackData,
            pointIndex / (track.trackData.nbTrackPt - 1)
        ));
    }
}

/**
 * @param {google.maps.MouseEvent} event
 * @private
 */
vgps3.track.Track.prototype.onMapClick_ = function(event) {
    this.click(event.latLng);
};

/**
 * @param {goog.Uri|string?} trackIndex
 * @param {number} chartIndex
 * @private
 */
vgps3.track.Track.prototype.updateInfoControl_ = function(trackIndex, chartIndex) {
    if (!trackIndex) {
        return;
    }

    var trackData = this.tracks_[trackIndex].trackData;

    this.infoControl_.setInfo({
        'elev': trackData.elev[chartIndex],
        'elevGnd': trackData.elevGnd[chartIndex],
        'vario': trackData.vario[chartIndex],
        'speed': trackData.speed[chartIndex],
        'hour': trackData.time.hour[chartIndex],
        'min': trackData.time.min[chartIndex],
        'sec': trackData.time.sec[chartIndex]
    });
};

/**
 * @enum {string}
 */
vgps3.track.EventType = {
    CLICK: 'vgps3.track.click',
    LOAD: 'vgps3.track.load'
};

/**
 * @define {string}
 */
vgps3.track.PROXY_URL = "php/vg_proxy.php?track=";

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
