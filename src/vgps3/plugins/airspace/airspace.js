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
 * @fileoverview Displays airspaces.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.airspace.Airspace');

goog.require('goog.dom');
goog.require('goog.soy');
goog.require('goog.string.format');
goog.require('goog.style');
goog.require('vgps3.Map');
goog.require('vgps3.PluginBase');
goog.require('vgps3.airspace.templates');
goog.require('vgps3.track.LoadEvent');



/**
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.airspace.Airspace = function() {
  /**
   *  @type {google.maps.FusionTablesLayer}
   *  @private
   */
  this.layer_;

  /**
   * @type {vgps3.Control} The google map control
   * @private
   */
  this.control_;

  /**
   * @type {Element} The airspace icon
   * @private
   */
  this.handle_;

  /**
   * @type {google.maps.FusionTablesQuery}
   * @private
   */
  this.ftQuery_ = /** @type {google.maps.FusionTablesQuery} */({
    select: 'geometry',
    where: goog.string.format(vgps3.airspace.WHERE, 1000),
    from: vgps3.airspace.FUSION_TABLE_ID
  });

  /**
   * @type {Element} The span where to display the altitude
   * @private
   */
  this.select_;

  goog.base(this);
};
goog.inherits(vgps3.airspace.Airspace, vgps3.PluginBase);


/**
 * @override
 */
vgps3.airspace.Airspace.prototype.init = function(vgps) {
  var that = this;
  goog.base(this, 'init', vgps);

  this.control_ = new vgps3.Control(
      this.gMap_,
      vgps3.airspace.templates.asControl,
      google.maps.ControlPosition.RIGHT_TOP
      );

  this.control_.update({maxAltitude: vgps3.airspace.MAX_ALTITUDE});
  this.handle_ = goog.dom.getLastElementChild(this.control_.getElement());
  this.select_ = goog.dom.getFirstElementChild(this.control_.getElement());
  goog.style.setStyle(this.handle_, 'cursor', 'pointer');
  goog.style.setElementShown(this.select_, false);
  this.getHandler()
    .listen(this.handle_, 'mousedown', this.clickhandle_)
    .listen(this.select_, 'change', function() { this.setFloor_(this.select_.value * 1000); })
    .listen(vgps, vgps3.track.EventType.LOAD, this.trackLoadhandle_);
};


/**
 * @param {google.maps.FusionTablesMouseEvent} event The click event.
 * @private
 */
vgps3.airspace.Airspace.prototype.fusionClickhandle_ = function(event) {
  google.maps.event.trigger(this.gMap_, 'click', event);
  event.infoWindowHtml = vgps3.airspace.templates.infoWindow({'row': event.row});
};


/**
 * Toggles airspace visibility when the handler is clicked.
 *
 * @param {goog.events.Event} event The click event.
 * @private
 */
vgps3.airspace.Airspace.prototype.clickhandle_ = function(event) {
  /**
   * @type {boolean}
   */
  var visible = goog.style.isElementShown(this.select_);

  if (!visible) {
    if (!this.layer_) {
      this.layer_ = new google.maps.FusionTablesLayer({
        query: this.ftQuery_,
        styles: [{
          polygonOptions: {
            fillOpacity: 0.3,
            strokeOpacity: 0.3
          }
        }]
      });

      google.maps.event.addListener(this.layer_, 'click', goog.bind(this.fusionClickhandle_, this));
    }
    this.layer_.setMap(this.gMap_);
    this.setFloor_(this.select_.value * 1000);
  } else {
    if (this.layer_) {
      this.layer_.setMap(null);
    }
  }

  goog.style.setElementShown(this.select_, !visible);
};


/**
 * Sets the current floor
 *
 * @param {number} floor expressed in meter.
 * @private
 */
vgps3.airspace.Airspace.prototype.setFloor_ = function(floor) {
  if (this.layer_) {
    this.ftQuery_.where = goog.string.format(vgps3.airspace.WHERE, floor);
    this.layer_.setOptions({query: this.ftQuery_});
  }
};


/**
 * Sets the floor altitude when a track has been loaded.
 *
 * @param {vgps3.track.LoadEvent} event The load event.
 * @private
 */
vgps3.airspace.Airspace.prototype.trackLoadhandle_ = function(event) {
  var trackValue = Math.min(Math.floor(event.fixes['maxElev'] / 1000) + 1, vgps3.airspace.MAX_ALTITUDE);
  this.select_.value = Math.max(this.select_.value || 1, trackValue);
};


/**
 * @override
 */
vgps3.airspace.Airspace.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  if (this.layer_) {
    google.maps.event.clearInstanceListeners(this.layer_);
    this.layer_.setMap(null);
    delete this.layer_;
  }
  goog.dom.removeChildren(this.control_.getElement());
  delete this.handle_;
  delete this.select_;
  goog.dispose(this.control_);
};


/**
 * @define {string} The fusion table ID.
 */
vgps3.airspace.FUSION_TABLE_ID = '';

/**
 * @define {string} The fusion table ID.
 */
vgps3.airspace.WHERE = "floor_m <= %d AND class NOT EQUAL TO 'E'";



/**
 *
 * @define {number} The maximum floor altitude (x1000m).
 */
vgps3.airspace.MAX_ALTITUDE = 6;

goog.exportSymbol('vgps3.airspace.Airspace', vgps3.airspace.Airspace);
