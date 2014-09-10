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
 * @fileoverview DoArama integration.
 * @see http://www.doarama.com/api/0.2/docs
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.doarama.Doarama');

goog.require('goog.Timer');
goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.net.Cookies');
goog.require('goog.net.XhrIo');
goog.require('goog.style');
goog.require('vgps3.Control');
goog.require('vgps3.PluginBase');
goog.require('vgps3.doarama.templates');
goog.require('vgps3.track.Track');


/**
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.doarama.Doarama = function() {
  /**
   * @type {vgps3.Control} The google map control
   * @private
   */
  this.control_;

  /**
   * @type {Element} DoArama iframe
   * @private
   */
  this.iframe_;

  /**
   * @type {string} DoArama url
   * @private
   */
   this.doaramaUrl_;

  /**
   * @type {Element} Close DoArama
   * @private
   */
  this.close_;

  /**
   * @type {Element} Close DoArama
   * @private
   */
  this.player_;

  /**
   * @type {goog.Timer}
   * @private
   */
  this.syncTimer_ = new goog.Timer(200);

  /**
   * @type {boolean}
   * @private
   */
  this.doaramaApiReady_ = false;

  /**
   * @type {vgps3.track.GpsFixes} GPS fixes
   * @private
   */
  this.fixes_;

  /**
   * @type {string} DoArama iframe domain (for sending messages)
   * @private
   */
  this.domain_;

  /**
   * @type {goog.debug.Logger} The logger
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.doarama.Doarama');

  goog.base(this);

};
goog.inherits(vgps3.doarama.Doarama, vgps3.PluginBase);


/**
 * @override
 */
vgps3.doarama.Doarama.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);
  this.getHandler()
    .listen(vgps, vgps3.track.EventType.LOAD, this.trackLoadHandler_)
    .listen(vgps, vgps3.chart.EventType.CLICK, this.chartClickHandler_)
    .listen(this.syncTimer_, goog.Timer.TICK, this.syncTimerHandler_);
};


/**
 * @override
 */
vgps3.doarama.Doarama.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.dom.removeNode(this.iframe_);
  delete this.iframe_;
  goog.dom.removeNode(this.close_);
  delete this.close_;
  goog.dispose(this.control_);
};

/**
 * Make the Doarama iframe visible
 *
 * @param {goog.events.Event} event
 * @private
 */
vgps3.doarama.Doarama.prototype.show_ = function(event) {
  if (navigator.userAgent.indexOf('MSIE') == -1) {
    if (this.iframe_.src != this.doaramaUrl_) {
      this.iframe_.src = this.doaramaUrl_;
    }
    this.syncTimer_.start();
    goog.style.setElementShown(this.iframe_, true);
    goog.style.setElementShown(this.close_, true);
  } else {
    alert('DoArama ne fonctionne pas avec Internet Explorer');
  }
};

/**
 * Hide Doarama iframe
 *
 * @param {goog.events.Event} event
 * @private
 */
vgps3.doarama.Doarama.prototype.hide_ = function(event) {
  this.syncTimer_.stop();
  goog.style.setElementShown(this.iframe_, false);
  goog.style.setElementShown(this.close_, false);
};

/**
 * Setup the DoArama iframe when a track is loaded
 *
 * @param {vgps3.track.LoadEvent} event
 * @private
 */
vgps3.doarama.Doarama.prototype.trackLoadHandler_ = function(event) {
  // todo handle more than 1 track
  if (goog.isDef(this.iframe_)) {
    return;
  }

  if (goog.isDefAndNotNull(event.fixes['doaramaUrl'])) {
    this.fixes_ = event.fixes;
    // Set the iframe source
    var options = '&fixedAspect=false';
    if (goog.isDefAndNotNull(event.fixes['pilot'])) {
      options += '&name=' + encodeURIComponent(event.fixes['pilot']);
    }
    this.doaramaUrl_ = event.fixes['doaramaUrl'] + options;
    this.setupDoarama_();
    // Upload the fixes when needed
    if (!goog.isDef(event.fixes['doaramaUpload']) || false === event.fixes['doaramaUpload']) {
      goog.net.XhrIo.send(vgps3.track.PROXY_URL + event.url + '&doaramaUpload=true');
    }
  }
};

/**
 * Sync DoArama position when charts are clicked
 *
 * @param {vgps3.chart.ClickEvent} event
 * @private
 */
vgps3.doarama.Doarama.prototype.chartClickHandler_ = function(event) {
  if (this.doaramaApiReady_ && this.player_) {
    var date = this.fixes_['date'];
    var time = this.fixes_['time'];
    var idx = Math.floor(event.position * time['hour'].length);
    var fixTimeMs = Date.UTC(date['year'], date['month'] - 1, date['day'], time['hour'][idx], time['min'][idx],
      time['sec'][idx]);
    this.player_['postMessage']({method: 'setTime', value: fixTimeMs}, this.domain_);
  }
};

/**
 * Synchronize the graph with the DoArama time
 *
 * @param {goog.events.Event} event
 * @private
 */
vgps3.doarama.Doarama.prototype.syncTimerHandler_ = function(event) {
  if (!this.player_) {
    this.player_ = this.iframe_.contentWindow;
    if (!this.player_) {
      return;
    }
    var uri = new goog.Uri(this.iframe_.src);
    this.domain_ = uri.getScheme() + '://' + uri.getDomain();
    goog.events.listen(window, goog.events.EventType.MESSAGE, this.messageHandler_, false, this);
  }

  if (this.doaramaApiReady_) {
    this.player_['postMessage']({method: 'getTime'}, this.domain_);
  }

};

/**
 * Synchronize the graph with the DoArama time
 *
 * @param {goog.events.BrowserEvent} event
 * @private
 */
vgps3.doarama.Doarama.prototype.messageHandler_ = function(event) {
  var data = event.getBrowserEvent()['data'];

  switch (data['method']) {
    case 'ready':
      this.doaramaApiReady_ = true;
      break;
    case 'getTime':
      var date = this.fixes_['date'];
      var time = this.fixes_['time'];
      var maxIterations = 10;
      var idxL = 0;
      var idxH = time['hour'].length;
      var idx = idxH;
      while (1 < (idxH - idxL)) {
        idx = Math.floor((idxL + idxH) / 2);

        var fixTimeMs = Date.UTC(date['year'], date['month'] - 1, date['day'], time['hour'][idx], time['min'][idx],
          time['sec'][idx]);
        if (fixTimeMs < data['result']) {
          idxL = idx;
        } else {
          idxH = idx;
        }
        if (0 === maxIterations--) {
          break;
        }
      }
      this.dispatchEvent(new vgps3.track.ClickEvent(this.fixes_, idx / time['hour'].length));
      break;
    default:
      break;
  }
};

/**
 * Setup the DoArama iframe when a track is loaded:
 * - create the Doarama iframe,
 * - create the close control displayed on top the iframe,
 * - create the control that allow switching from Maps to Doarama
 *
 * @private
 */
vgps3.doarama.Doarama.prototype.setupDoarama_ = function() {
  var that = this;
  var domHelper = new goog.dom.DomHelper(goog.dom.getOwnerDocument(this.gMap_.getDiv()));
  this.iframe_ = goog.dom.iframe.createBlank(domHelper, 'position: absolute; top: 0; left: 0; background: white');
  this.iframe_.setAttribute('webkitAllowFullScreen', true);
  this.iframe_.setAttribute('mozAllowFullScreen', true);
  this.iframe_.setAttribute('allowFullScreen', true);
  goog.style.setElementShown(this.iframe_, false);
  goog.style.setSize(this.iframe_, goog.style.getSize(/** @type {Element} */(this.gMap_.getDiv())));
  domHelper.appendChild(domHelper.getDocument().body, this.iframe_);
  google.maps.event.addListener(this.gMap_, 'resize', function() {
    goog.style.setSize(that.iframe_, goog.style.getSize(/** @type {Element} */(that.gMap_.getDiv())));
  });

  this.close_ = goog.dom.createDom('div', {
    'class': 'doarama-ctrl vg-new',
    'style': 'position: absolute; top: 30px; right: 0'
  });
  this.close_.innerHTML = '<i class="fa fa-fw fa-power-off fa-2x"></i>';
  goog.style.setElementShown(this.close_, false);
  domHelper.appendChild(domHelper.getDocument().body, this.close_);

  this.getHandler().listen(this.close_, 'mousedown', this.hide_);

  this.control_ = new vgps3.Control(
      this.gMap_,
      vgps3.doarama.templates.doaramaControl,
      google.maps.ControlPosition.RIGHT_TOP
      );
  this.control_.setExtraClass('vg-new');
  this.control_.update();
  this.getHandler().listen(this.control_.getElement(), 'mousedown', this.show_);
  goog.style.setStyle(this.control_.getElement(), 'cursor', 'pointer');
};



goog.exportSymbol('vgps3.doarama.Doarama', vgps3.doarama.Doarama);
goog.exportSymbol('vgps3.doarama.Doarama.init', vgps3.doarama.Doarama.prototype.init);
