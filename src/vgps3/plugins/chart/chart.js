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

goog.provide('vgps3.chart.Chart');

goog.require('goog.async.Deferred');
goog.require('goog.events');
goog.require('goog.events.BrowserEvent');
goog.require('goog.events.MouseWheelHandler');
goog.require('goog.events.MouseWheelHandler.EventType');
goog.require('goog.net.jsloader');
goog.require('goog.style');
goog.require('goog.ui.Slider');
goog.require('vgps3.IPlugin');
goog.require('vgps3.Map');
goog.require('vgps3.chart.AboutEvent');
goog.require('vgps3.chart.ClickEvent');
goog.require('vgps3.chart.MoveEvent');
goog.require('vgps3.chart.Overlays');
goog.require('vgps3.chart.Sliders');
goog.require('vgps3.chart.WheelEvent');
goog.require('vgps3.track.InfoControl');

/**
 * @param {!Element} container
 *
 * @constructor
 * @implements {vgps3.IPlugin}
 */
vgps3.chart.Chart = function(container) {
    /**
     * @type {vgps3.Map}
     * @private
     */
    this.vgps_ = null;

    /**
     * @type {goog.events.MouseWheelHandler}
     * @private
     */
    this.mouseWheelHandler_;

    /**
     * @type {vgps3.chart.Overlays}
     */
    this.overlays_ = new vgps3.chart.Overlays();

    /**
     * @type {vgps3.chart.Sliders}
     */
    this.sliders_ = new vgps3.chart.Sliders();

    /**
     * @type {goog.async.Deferred}
     * @private
     */
    this.chartLoaded_ = new goog.async.Deferred();
    var that = this;

    if (google && google.load) {
        this.loadApi_(this.chartLoaded_);
    } else {
        goog.net.jsloader.load(vgps3.chart.LOADER_URL).addCallback(function() { that.loadApi_(); });
    }
};

/**
 * @override
 */
vgps3.chart.Chart.prototype.init = function(vgps) {
    this.vgps_ = vgps;

    this.vgps_.addEventListener(
        vgps3.track.EventType.LOAD,
        goog.bind(this.mapLoadHandler_, this)
    );
};

/**
 * @param {number} position [0...1].
 * @private
 */
vgps3.chart.Chart.prototype.moveTo = function(position) {
    this.overlays_.moveTo(position);
};

/**
 * @param {goog.events.BrowserEvent} event
 * @private
 */
vgps3.chart.Chart.prototype.handleMouseEvents_ = function(event)
{
    event.preventDefault();

    this.vgps_.dispatchEvent(
        event.type === goog.events.EventType.MOUSEDOWN
            ? new vgps3.chart.ClickEvent(this.overlays_.getPosition())
            : new vgps3.chart.MoveEvent(this.overlays_.getPosition())
    );
};

/**
 * @param {goog.events.MouseWheelEvent} event
 * @private
 */
vgps3.chart.Chart.prototype.handleMouseWheel_ = function(event) {
    event.preventDefault();

    this.vgps_.dispatchEvent(new vgps3.chart.WheelEvent(this.overlays_.getPosition(), event.deltaY > 0 ? 1 : -1));
};

/**
 * @param {vgps3.track.LoadEvent} event
 * @private
 */
vgps3.chart.Chart.prototype.mapLoadHandler_ = function(event) {
    var track = event.track,
        that = this;


    this.overlays_.render(goog.dom.getElement('charts'));
    this.sliders_.render(goog.dom.getElement('sliders'));

    this.mouseWheelHandler_ = new goog.events.MouseWheelHandler(this.overlays_.getElement());

    goog.events.listen(
        this.mouseWheelHandler_,
        goog.events.MouseWheelHandler.EventType.MOUSEWHEEL,
        goog.bind(that.handleMouseWheel_, that)
    );

    goog.events.listen(
        this.overlays_.getElement(),
        [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEMOVE],
        goog.bind(that.handleMouseEvents_, that)
    );

    goog.events.listen(
        this.sliders_.getTitleElement(),
        goog.events.EventType.CLICK,
        function() { that.vgps_.dispatchEvent(new vgps3.chart.AboutEvent()); }
    );

    // split for loading further tracks
    this.chartLoaded_.addCallback(function() {
        var overlay,
            chart,
            options,
            data = new google.visualization.DataTable(),
            view;


        data.addColumn('string', 'time');
        data.addColumn('number', 'elev');
        data.addColumn('number', 'elevGnd');
        data.addColumn('number', 'Vx');
        data.addColumn('number', 'Vz');

        for (var chartIndex = 0; chartIndex < track.nbChartPt; chartIndex++) {
            data.addRow([
                track.time.hour[chartIndex] + 'h' + track.time.min[chartIndex],
                track.elev[chartIndex],
                track.elevGnd[chartIndex],
                track.speed[chartIndex],
                track.vario[chartIndex]
            ]);
        }

        view = new google.visualization.DataView(data);

        // elevation
        options = goog.object.clone(vgps3.chart.CHART_OPTIONS);
        goog.object.extend(options, {
            hAxis: {
                showTextEvery: Math.round(track.nbChartPt / 6)
            }
        });
        view.setColumns([0, 1, 2]);
        overlay = that.overlays_.addLayer();
        that.sliders_.addSlider('h', overlay, 'red');
        chart = new google.visualization.AreaChart(overlay);
        chart.draw(view, options);

        // speed
        options.curve = 'none';
        options.series = [{color: 'green'}];
        options.vAxis.format = '# km/h';
        view.setColumns([0, 3]);
        overlay = that.overlays_.addLayer();
        that.sliders_.addSlider('Vx', overlay, 'green');
        chart = new google.visualization.LineChart(overlay);
        chart.draw(view, options);

        // vario
        view.setColumns([0, 4]);
        options.series = [{color: 'blue'}];
        options.vAxis.format = '#.# m/s';
        overlay = that.overlays_.addLayer();
        that.sliders_.addSlider('Vz', overlay, 'blue');
        chart = new google.visualization.LineChart(overlay);
        chart.draw(view, options);
    });
};

/**
 * @private
 */
vgps3.chart.Chart.prototype.loadApi_ = function() {
    var that = this;
    google.load('visualization', '1.0', {
        packages: ['corechart'],
        callback: function() { that.chartLoaded_.callback(); }
    });
};

/**
 * @define {string}
 */
vgps3.chart.LOADER_URL = 'https://www.google.com/jsapi';

/**
 * @enum {string}
 */
vgps3.chart.EventType = {
    CLICK: 'vgps3.chart.click',
    MOVE: 'vgps3.chart.move',
    WHEEL: 'vgps3.chart.wheel',
    ABOUT: 'vgps3.chart.about'
};

/**
 * @type {Object}
 */
vgps3.chart.CHART_OPTIONS = {
    theme: 'maximized',
    fontName: 'verdana',
    fontSize: '10',
    lineWidth: 1,
    enableInteractivity: false,
    vAxis: {
        viewWindowMode: 'maximized',
        format: '# m'
    },
    series: {
        0: {
            color: '#ff0000',
            areaOpacity: 0
        },
        1: {
            color: '#755445',
            areaOpacity: 1
        }
    },
    legend: {
        position: 'none'
    }
};
