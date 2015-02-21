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
 * @fileoverview Charts for elevation, speed, vario.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.chart.Chart');

goog.require('goog.async.Deferred');
goog.require('goog.async.Throttle');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Trace');
goog.require('goog.dom');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.events');
goog.require('goog.events.BrowserEvent');
goog.require('goog.events.MouseWheelHandler');
goog.require('goog.events.MouseWheelHandler.EventType');
goog.require('goog.string.format');
goog.require('goog.style');
goog.require('goog.ui.Slider');
goog.require('vgps3.Map');
goog.require('vgps3.PluginBase');
goog.require('vgps3.chart.AboutEvent');
goog.require('vgps3.chart.ClickEvent');
goog.require('vgps3.chart.MoveEvent');
goog.require('vgps3.chart.Overlays');
goog.require('vgps3.chart.Sliders');
goog.require('vgps3.chart.WheelEvent');
goog.require('vgps3.loader');



/**
 * @param {!Element} container
 *
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.chart.Chart = function(container) {
  /**
  * @type {goog.events.MouseWheelHandler} The mouse wheel event handler
  * @private
  */
  this.mouseWheelHandler_;

  /**
  * @type {vgps3.chart.Overlays} Chart overlays
  * @private
  */
  this.overlays_;

  /**
  * @type {vgps3.chart.Sliders} Set of sliders to adjust opacity
  * @private
  */
  this.sliders_;

  /**
   * @typedef {Array.<{
   *   fixes: vgps3.track.GpsFixes,
   *   dataView: google.visualization.DataView
   * }>}
   * @private
   */
  this.chartData_ = [];

  /**
   * @typedef {{
   *     elevation: Node,
   *     speed: Node,
   *     vario: Node
   *   }}
   * @private
   */
  this.chartContainers_;

  /**
   * @type {Object.<string, *>}
   * @private
   */
  this.charts_;

  /**
   * @type {number} The index of the current track.
   * @private
   */
  this.currentTrackIndex_;

  /**
   * @type {goog.async.Throttle} Throttle window resize events
   * @private
   */
  this.resizeThrottler_;

  /**
   * @type {goog.dom.ViewportSizeMonitor} Monitor view port size change
   * @private
   */
  this.vpMonitor_;

  /**
   * @type {goog.async.Deferred} Fired when the first track has been loaded
   * @private
   */
  this.trackLoaded_ = new goog.async.Deferred(null, this);

  /**
   * @type {goog.debug.Logger}
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.chart.Chart');

  /**
   * @type {!Element}
   * @private
   */
  this.container_ = container;

  goog.base(this);

  vgps3.loader.load('visualization', '1.x', vgps3.chart.chartApiLoaded_, {'packages': ['corechart']});
};
goog.inherits(vgps3.chart.Chart, vgps3.PluginBase);


/**
 * @override
 */
vgps3.chart.Chart.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);
  this.resizeCharts_();
  this.getHandler()
    .listen(vgps, vgps3.track.EventType.LOAD, this.trackLoadHandler_)
    .listen(vgps, vgps3.track.EventType.LOAD, this.trackUpdateHandler_)
    .listen(vgps, vgps3.track.EventType.SELECT, this.trackSelectHandler_);
};


/**
 * Moves the cursor to the specified position.
 *
 * @param {number} position [0...1].
 */
vgps3.chart.Chart.prototype.moveTo = function(position) {
  this.overlays_.moveTo(position);
};


/**
 * @override
 */
vgps3.chart.Chart.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.disposeAll([
    this.overlays_,
    this.sliders_,
    this.mouseWheelHandler_,
    this.resizeThrottler_,
    this.vpMonitor_
  ]);
  if (goog.isDef(this.charts_)) {
    goog.object.forEach(this.charts_, function(chart) {
      chart.clearChart();
    });
    delete this.charts_;
  }
};


/**
 * Dispatches events on mouse down and move.
 *
 * @param {goog.events.BrowserEvent} event
 * @private
 */
vgps3.chart.Chart.prototype.handleMouseEvents_ = function(event)
    {
  event.preventDefault();

  this.dispatchEvent(
      event.type === goog.events.EventType.MOUSEDOWN
        ? new vgps3.chart.ClickEvent(this.overlays_.getPosition())
        : new vgps3.chart.MoveEvent(this.overlays_.getPosition())
  );
};


/**
 * Dispatches events on mouse wheel.
 *
 * @param {goog.events.MouseWheelEvent} event
 * @private
 */
vgps3.chart.Chart.prototype.handleMouseWheel_ = function(event) {
  event.preventDefault();

  this.dispatchEvent(new vgps3.chart.WheelEvent(
      this.overlays_.getPosition(),
      event.deltaY > 0 ? 1 : -1
      ));
};


/**
 * Creates the charts when a track gets loaded.
 *
 * @param {vgps3.track.LoadEvent} event
 * @private
 */
vgps3.chart.Chart.prototype.trackLoadHandler_ = function(event) {
  this.logger_.info(goog.string.format('Adding track[%d]', event.trackIndex));
  if (!this.chartContainers_) {

    this.overlays_ = new vgps3.chart.Overlays();
    this.overlays_.render(goog.dom.getElement('charts'));
    this.sliders_ = new vgps3.chart.Sliders();
    this.sliders_.render(goog.dom.getElement('sliders'));

    this.chartContainers_ = {
      'elevation': this.overlays_.addLayer(),
      'speed': this.overlays_.addLayer(),
      'vario': this.overlays_.addLayer()
    };

    this.sliders_.addSlider('h', this.chartContainers_['elevation'], 'red');
    this.sliders_.addSlider('Vx', this.chartContainers_['speed'], 'green');
    this.sliders_.addSlider('Vz', this.chartContainers_['vario'], 'blue');

    this.mouseWheelHandler_ = new goog.events.MouseWheelHandler(this.overlays_.getElement());

    this.resizeThrottler_ = new goog.async.Throttle(this.resizeHandler_, 100, this);
    this.vpMonitor_ = new goog.dom.ViewportSizeMonitor();

    this.getHandler()
      .listen(
        this.mouseWheelHandler_,
        goog.events.MouseWheelHandler.EventType.MOUSEWHEEL,
        this.handleMouseWheel_
        )
      .listen(
        this.overlays_.getElement(),
        [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEMOVE],
        this.handleMouseEvents_
        )
      .listen(
        this.sliders_.getTitleElement(),
        goog.events.EventType.CLICK,
        goog.bind(this.dispatchEvent, this, new vgps3.chart.AboutEvent())
        )
      .listen(
        this.vpMonitor_,
        goog.events.EventType.RESIZE,
        goog.bind(this.resizeThrottler_.fire, this.resizeThrottler_)
        );
  }

  this.chartData_[event.trackIndex] = {'fixes': event.fixes};
  !this.trackLoaded_.hasFired() && this.trackLoaded_.callback();
};


/**
 * Updates the charts when a track gets updated.
 *
 * @param {vgps3.track.UpdateEvent} event
 * @private
 */
vgps3.chart.Chart.prototype.trackUpdateHandler_ = function(event) {
  this.chartData_[event.trackIndex] = {'fixes': event.fixes};
  this.drawCharts_(event.trackIndex);
};


/**
 * Redraws the charts when a new track is selected.
 *
 * @param {vgps3.track.TrackSelectEvent} event
 * @private
 */
vgps3.chart.Chart.prototype.trackSelectHandler_ = function(event) {
  this.currentTrackIndex_ = event.trackIndex;
  this.trackLoaded_.addCallback(function() {
    this.drawCharts_(event.trackIndex);
  });
};


/**
 * Redraws the charts when the container is resized.
 *
 * @private
 */
vgps3.chart.Chart.prototype.resizeHandler_ = function() {
  this.logger_.info('Chart container resized');
  this.resizeCharts_();
  if (goog.isDef(this.currentTrackIndex_)) {
    this.drawCharts_(this.currentTrackIndex_);
  }
  this.sliders_.resizeHandler();
};


/**
 * Sets the charts container size.
 *
 * @private
 */
vgps3.chart.Chart.prototype.resizeCharts_ = function() {
  var sliders = goog.dom.getElement('sliders'),
      charts = goog.dom.getElement('charts'),
      container = goog.dom.getElement('charts-container');

  goog.style.setWidth(charts, goog.style.getSize(container).width - goog.style.getSize(sliders).width);
};


/**
 * Draw all the charts.
 *
 * @param {number} index
 * @private
 */
vgps3.chart.Chart.prototype.drawCharts_ = function(index) {
  vgps3.chart.chartApiLoaded_.addCallback(function() {
    if (!this.chartData_[index]['dataView']) {
      this.chartData_[index]['dataView'] = this.createDataView_(index);
    }

    if (!this.charts_) {
      this.charts_ = {
        'elevation': new google.visualization.AreaChart(this.chartContainers_['elevation']),
        'speed': new google.visualization.LineChart(this.chartContainers_['speed']),
        'vario': new google.visualization.LineChart(this.chartContainers_['vario'])
      };
    }

    goog.debug.Trace.reset(0);
    var tracer = goog.debug.Trace.startTracer(goog.string.format('Rendering charts[%d]', index));
    this.drawChart_('elevation', index, [0, 1, 2]);
    goog.debug.Trace.addComment('Elevation chart rendered');
    this.drawChart_('speed', index, [0, 3]);
    goog.debug.Trace.addComment('Speed chart rendered');
    this.drawChart_('vario', index, [0, 4]);
    goog.debug.Trace.addComment('Vario chart rendered');
    goog.debug.Trace.stopTracer(tracer);
    this.logger_.info(goog.debug.Trace.getFormattedTrace());
  },
  this
  );
};


/**
 * Draws a single chart.
 *
 * @param {string} type
 * @param {number} index
 * @param {Array.<number>} columns
 * @private
 */
vgps3.chart.Chart.prototype.drawChart_ = function(type, index, columns) {
  var view = this.chartData_[index]['dataView'],
      chart = this.charts_[type],
      container = this.chartContainers_[type],
      nbPoints = this.chartData_[index]['fixes']['nbChartPt'],
      options = vgps3.chart.CHART_OPTIONS[type];

  if (goog.isDef(options['hAxis']['showTextEvery'])) {
    options['hAxis']['showTextEvery'] = Math.round(nbPoints / vgps3.chart.NB_HLABELS);
  }

  if (goog.isDef(options['curve'])) {
    options['curve'] = goog.style.getSize(container).width / nbPoints > 5 ? 'function' : 'none';
  }

  view.setColumns(columns);
  chart.draw(view, options);
};


/**
 * Creates chart underlying data as a DataView.
 *
 * @param {number} index
 *
 * @return {google.visualization.DataView}
 * @private
 */
vgps3.chart.Chart.prototype.createDataView_ = function(index) {
  var track = this.chartData_[index]['fixes'],
      dataTable = new google.visualization.DataTable();

  dataTable.addColumn('string', 'time');
  dataTable.addColumn('number', 'elev');
  dataTable.addColumn('number', 'elevGnd');
  dataTable.addColumn('number', 'Vx');
  dataTable.addColumn('number', 'Vz');

  for (var chartIndex = 0; chartIndex < track['nbChartPt']; chartIndex++) {
    dataTable.addRow([
      track['time']['hour'][chartIndex] + 'h' + track['time']['min'][chartIndex],
      track['elev'][chartIndex],
      track['elevGnd'][chartIndex],
      track['speed'][chartIndex],
      track['vario'][chartIndex]
    ]);
  }

  return new google.visualization.DataView(dataTable);
};


/**
 * @type {goog.async.Deferred} Trigerred when the Chart API has been loaded.
 * @private
 */
vgps3.chart.chartApiLoaded_ = new goog.async.Deferred();


/**
 * @enum {string} The plugin events
 */
vgps3.chart.EventType = {
  CLICK: 'vgps3.chart.click',
  MOVE: 'vgps3.chart.move',
  WHEEL: 'vgps3.chart.wheel',
  ABOUT: 'vgps3.chart.about'
};


/**
 * @define {number} Number of horizontal labels.
 */
vgps3.chart.NB_HLABELS = 6;


/**
 * @type {Object} Default options for charts
 * @const
 */
vgps3.chart.CHART_OPTIONS = {
  'elevation': {
    'theme': 'maximized',
    'fontName': 'verdana',
    'fontSize': '10',
    'lineWidth': 1,
    'enableInteractivity': false,
    'vAxis': {
      'viewWindowMode': 'maximized',
      'format': '# m'
    },
    'hAxis': {
      'showTextEvery': 160
    },
    'series': {
      '0': {
        'color': '#ff0000',
        'areaOpacity': 0
      },
      '1': {
        'color': '#755445',
        'areaOpacity': 1
      }
    },
    'legend': {
      'position': 'none'
    }
  },
  'speed': {
    'curve': 'none',
    'theme': 'maximized',
    'fontName': 'verdana',
    'fontSize': '10',
    'lineWidth': 1,
    'enableInteractivity': false,
    'vAxis': {
      'viewWindowMode': 'maximized',
      'format': '# km/h'
    },
    'hAxis': {
      'showTextEvery': 160
    },
    'series': [{
      'color': 'green'
    }],
    'legend': {
      'position': 'none'
    }
  },
  'vario': {
    'curve': 'none',
    'theme': 'maximized',
    'fontName': 'verdana',
    'fontSize': '10',
    'lineWidth': 1,
    'enableInteractivity': false,
    'vAxis': {
      'viewWindowMode': 'maximized',
      'format': '#.# m/s'
    },
    'hAxis': {
      'showTextEvery': 160
    },
    'series': [{
      'color': 'blue'
    }],
    'legend': {
      'position': 'none'
    }
  }
};

goog.exportSymbol('vgps3.chart.Chart', vgps3.chart.Chart);
goog.exportSymbol('vgps3.chart.Chart.init', vgps3.chart.Chart.prototype.init);
goog.exportSymbol('vgps3.chart.Chart.moveTo', vgps3.chart.Chart.prototype.moveTo);

