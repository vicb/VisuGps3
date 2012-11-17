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
 * @fileoverview
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.earth.Earth');

goog.require('GoogleEarth');
goog.require('goog.async.Deferred');
goog.require('goog.net.jsloader');
goog.require('vgps3.IPlugin');
goog.require('vgps3.Map');

/**
 *
 * @constructor
 * @implements {vgps3.IPlugin}
 */
vgps3.earth.Earth = function() {
    /**
     * @type {google.earth.GEPlugin}
     * @private
     */
    this.ge_;

    /**
     * @type {google.maps.Map}
     * @private
     */
    this.gMap_;

    /**
     * @type {vgps3.Map}
     * @private
     */
    this.vgps_;

    /**
     * @type {Object}
     * @private
     */
    this.track_;

    /**
     * @type {Object}
     * @private
     */
    this.location_;

    /**
     * @type {Object}
     * @private
     */
    this.orientation_;

    /**
     * @type {goog.async.Deferred}
     * @private
     */
    this.geLoaded_ = new goog.async.Deferred();
    var that = this;

    if (google && google.load) {
        this.loadApi_();
    } else {
        goog.net.jsloader.load(vgps3.earth.LOADER_URL).addCallback(function() { that.loadApi_(); });
    }
};

/**
 * @override
 */
vgps3.earth.Earth.prototype.init = function(vgps) {
    this.gMap_ = vgps.getGoogleMap();
    this.vgps_ = vgps;
    this.vgps_.addEventListener(
        vgps3.track.EventType.LOAD,
        goog.bind(this.mapLoadHandler_, this)
    );
};

/**
 *
 * @param {number} position [0...1].
 */
vgps3.earth.Earth.prototype.moveTo = function(position) {
    var trackIdx = Math.round((this.track_.nbTrackPt - 1) * position),
        nextIdx = Math.min(this.track_.nbTrackPt - 1, trackIdx + 1),
        deltaLat = this.track_.lat[nextIdx] - this.track_.lat[trackIdx],
        deltaLon = this.track_.lon[nextIdx] - this.track_.lon[trackIdx],
        angle;


    this.location_.setLatLngAlt(
        this.track_.lat[trackIdx],
        this.track_.lon[trackIdx],
        this.track_.elev[Math.round((this.track.nbChartPt - 1) * position)]
    );

    if (0 === deltaLon) {
        angle = deltaLat > 0 ? Math.PI / 2 : 3 * Math.PI / 2;
    } else {
        angle = Math.atan(deltaLat / deltaLon);
        if (deltaLon < 0) {
            angle += Math.PI;
        }
    }
    // Convert angle (radian) to heading (degree, 0deg = North)
    angle = angle * 180 / Math.PI;
    angle = 90 - angle;
    // Apply model origin (255deg)
    angle = angle + 255;
    if (angle < 0) angle += 360;
    if (angle > 360) angle -= 360;
    this.orientation_.setHeading(angle);
};

/**
 * @param {Object} event
 *
 * @private
 */
vgps3.earth.Earth.prototype.clickHandler_ = function(event) {
    this.vgps_.click(new google.maps.LatLng(event.getLatitude(), event.getLongitude));
};

/**
 * @param {vgps3.track.LoadEvent} event
 *
 * @private
 */
vgps3.earth.Earth.prototype.mapLoadHandler_ = function(event) {
    var track = event.track,
        that = this;


    this.track_ = track;

    this.geLoaded_.addCallback(function() {
        // todo init in listen once for "earth" map
        var ge = that.ge_ = (new GoogleEarth(that.gMap_)).getInstance(),
            lineString = ge.createLineString(''),
            lineStringPlacemark = ge.createPlacemark('');


        lineStringPlacemark.setGeometry(lineString);
        lineString.setTessellate(false);

        for (var i = 0; i < track.nbTrackPt; i++) {
            lineString.getCoordinates().pushLatLngAlt(
                track.lat[i],
                track.lon[i],
                track.elev(i * (track.nbChartPt - 1) / (track.nbTrackPt - 1))
            );
        }
        ge.getFeatures().appendChild(lineStringPlacemark);
        lineString.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);

        google.earth.addEventListener(ge.getWindow(), 'mousedown', goog.bind(this.clickHandler_, that));

        if (!lineStringPlacemark.getStyleSelector()) {
            lineStringPlacemark.setStyleSelector(ge.createStyle(''));
        }
        var lineStyle = lineStringPlacemark.getStyleSelector().getLineStyle();
        lineStyle.setWidth(2);
        lineStyle.getColor().set('ff0000ff');
        // Create the 3d marker
        var placemark = ge.createPlacemark('Pilot');
        ge.getFeatures().appendChild(placemark);
        var model3d = ge.createModel('');
        model3d.setLink(ge.createLink('').setHref(vgps3.earth.MODEL_URL));
        placemark.setGeometry(model3d);
        model3d.setLocation(that.location_ = ge.createLocation(''));
        model3d.setOrientation(that.orientation_ = ge.createOrientation(''));
        model3d.setScale(ge.createScale('').set(50, 50, 50));
        model3d.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
        that.moveTo(0);
    });
};

/**
 * @private
 */
vgps3.earth.Earth.prototype.loadApi_ = function() {
    var that = this;
    google.load('that', '1', { callback: function() { that.geLoaded_.callback(); }});
};

/**
 * @define {string}
 */
vgps3.earth.LOADER_URL = 'https://www.google.com/jsapi';

/**
 * @define {string}
 */
// todo
vgps3.earth.MODEL_URL = 'http://victorb.fr/visugps/img/paraglider.dae';

/**
 * @enum {string}
 */
vgps3.earth.EventType = {
    CLICK: 'vgps3.earth.click'
};
