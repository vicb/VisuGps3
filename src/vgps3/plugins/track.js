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

goog.provide('vgps3.plugins.Track');

goog.require('vgps3.Map');
goog.require('vgps3.IPlugin');

goog.require('goog.object');
goog.require('goog.net.XhrIo');
goog.require('goog.events.Event')

/**
 * @constructor
 * @implements {vgps3.IPlugin}
 */
vgps3.plugins.Track = function()
{
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
     * @type {Object}
     * @private
     */
    this.tracks_ = {};

    vgps3.Map.prototype.Track = this;
};

/**
 * @inheritDoc
 */
vgps3.plugins.Track.prototype.init = function (vgps)
{
    this.vgps_ = vgps;
    this.map_ = vgps.getGoogleMap();
    this.tracks = {};

    google.maps.event.addListener(this.map_, 'click', goog.bind(this.onMapClick_, this));
};

/**
 * @param {string|goog.Uri} url The track url
 *
 * @return {boolean} Wether the track has been loaded successfully
 */
vgps3.plugins.Track.prototype.load = function(url)
{
    goog.net.XhrIo.send(
        vgps3.plugins.Track.PROXY_URL + url,
        goog.bind(this.afterTrackLoad_, this, url)
    );
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
vgps3.plugins.Track.prototype.afterTrackLoad_ = function(url, event)
{
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
 * @param {string} url The url of the track
 * @param {object} track The track object
 *
 * @private
 */
vgps3.plugins.Track.prototype.addTrack_ = function(url, track)
{
    var bounds = new google.maps.LatLngBounds();

    var point;

    this.tracks_[url] = {
        points: []
    };

    var line = [];

    for (var i = 0; i < track.nbTrackPt; i++) {
        point = new google.maps.LatLng(track.lat[i], track.lon[i]);
        this.tracks_[url].points.push(point);
        bounds.extend(point);
    }

    this.tracks_[url].bounds = bounds;

    this.tracks_[url].polyline = new google.maps.Polyline({
        clickable: false,
        map: this.map_,
        path: this.tracks_[url].points,
        strokeColor: "#ff0000",
        strokeWeight: 1
    });

    this.tracks_[url].marker = new google.maps.Marker({
        position: new google.maps.LatLng(track.lat[0], track.lon[0]),
        map: this.map_,
        clickable: false
    });

    this.map_.fitBounds(this.getTracksBounds_());
}

/**
 * Computes the bounding box include all loaded tracks
 *
 * @return {google.Maps.LatLngBounds}
 */
vgps3.plugins.Track.prototype.getTracksBounds_ = function()
{
    var bounds = new google.maps.LatLngBounds();

    goog.object.forEach(this.tracks_, function(track) {
        bounds.union(track.bounds);
    })

    return bounds;
}

/**
 * @param {google.maps.MouseEvent} event
 * @private
 */
vgps3.plugins.Track.prototype.onMapClick_ = function(event) {
    var trackIndex, pointIndex, position, currentDistance, distance = Number.MAX_VALUE;

    goog.object.forEach(this.tracks_, function(track, trackIdx) {
        goog.array.forEach(track.points, function(point, pointIdx) {
            currentDistance = google.maps.geometry.spherical.computeDistanceBetween(event.latLng, point);
            if (currentDistance < distance) {
                distance = currentDistance;
                position = point;
                trackIndex = trackIdx;
                pointIndex = pointIdx;
            }
        })
    });

    if (position) {
        this.tracks_[trackIndex].marker.setPosition(position);
        this.vgps_.dispatchEvent(vgps3.plugins.Track.EventType.CLICK);
    }
}

/**
 * @enum {string}
 */
vgps3.plugins.Track.EventType = {
    CLICK: 'vgps3.track.click'
};

/**
 * @define {string}
 */
vgps3.plugins.Track.PROXY_URL = "php/vg_proxy.php?track=";


