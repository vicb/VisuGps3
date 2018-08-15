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
 * @fileoverview Base class for topo maps.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.topo.AbstractTopo');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.style');



/**
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.topo.AbstractTopo = function() {
  goog.base(this);

  /**
   * @type {Array.<google.maps.LatLngBounds>} The visible areas
   * @protected
   */
  this.bounds_;

  /**
   * @type {Element} The copyright
   * @protected
   */
  this.copyright_;

  /**
   * @type {string} The map type
   * @protected
   */
  this.mapType_;

  /**
   * @type {goog.debug.Logger}
   * @private_
   */
  this.logger_ = goog.debug.Logger.getLogger('vgps3.topo.AbstractTopo');

};
goog.inherits(vgps3.topo.AbstractTopo, vgps3.PluginBase);


/**
 * Set the visible area
 *
 * @param {!Array.<Array.<number>>} latlngBounds format: [lat, lng, lat, lng].
 * @protected
 */
vgps3.topo.AbstractTopo.prototype.setBounds_ = function(latlngBounds) {
  var that = this;

  this.bounds_ = [];
  goog.array.forEach(latlngBounds || [], function(bounds) {
    var lats = [bounds[0], bounds[2]],
        lngs = [bounds[1], bounds[3]];

    goog.array.sort(lats);
    goog.array.sort(lngs);

    that.bounds_.push(new google.maps.LatLngBounds(
        new google.maps.LatLng(lats[0], lngs[0]),
        new google.maps.LatLng(lats[1], lngs[1])
        ));
  });
};


/**
 * Create a copyright control on the map
 *
 * @param {string} logo Path to the logo.
 * @param {string} url  Link target.
 *
 * @protected
 */
vgps3.topo.AbstractTopo.prototype.setCopyright_ = function(logo, url) {
  this.copyright_ = goog.dom.createDom(
      'a',
      {'target': '_blank', 'href': url, 'class': 'vgps3-topo-logo'},
      goog.dom.createDom('img', {src: logo})
      );

  this.gMap_.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(this.copyright_);

  goog.style.setElementShown(this.copyright_, false);
};


/**
 * Registers the custom map.
 *
 * @param {string} mapType
 * @param {google.maps.ImageMapType=} opt_mapType
 *
 * @protected
 */
vgps3.topo.AbstractTopo.prototype.registerMapType_ = function(mapType, opt_mapType) {
  this.mapType_ = mapType;
  this.gMap_.mapTypes.set(mapType, /** @type {?} */ (opt_mapType || this.getMapType_()));
  google.maps.event.addListener(
      this.gMap_,
      'maptypeid_changed',
      goog.bind(this.mapTypeChangeHandler_, this)
  );
};


/**
 * Triggered when the map is shown
 *
 * @protected
 */
vgps3.topo.AbstractTopo.prototype.showHandler_ = function() {
  this.copyright_ && goog.style.setElementShown(this.copyright_, true);
};


/**
 * Triggered when the map is hidden
 *
 * @protected
 */
vgps3.topo.AbstractTopo.prototype.hideHandler_ = function() {
  this.copyright_ && goog.style.setElementShown(this.copyright_, false);
};


/**
 * Checks if the tile is provided by the map.
 *
 * @param {google.maps.Point} coord
 * @param {number} zoom
 *
 * @return {boolean} Whether the tile is provided by the current map.
 *
 * @protected
 */
vgps3.topo.AbstractTopo.prototype.isTileVisible_ = function(coord, zoom) {
  var numTiles = Math.pow(2, zoom),
      e = 256 * coord.x / numTiles,
      w = 256 * (coord.x + 1) / numTiles,
      s = 256 * (coord.y + 1) / numTiles,
      n = 256 * coord.y / numTiles,
      projection,
      tileBounds,
      visible;

  projection = this.gMap_.getProjection();

  tileBounds = new google.maps.LatLngBounds(
      projection.fromPointToLatLng(new google.maps.Point(w, s)),
      projection.fromPointToLatLng(new google.maps.Point(e, n))
      );

  goog.array.some(this.bounds_, function(bounds) {
    visible = bounds.intersects(tileBounds);

    if (visible) {
      this.logger_.info('Tile visible in range: ' + bounds.toString());
    }

    return visible;
  },
  this
  );

  return visible;
};


/**
 * Returns the map type.
 *
 * @return {google.maps.ImageMapType} The map type.
 *
 * @protected
 */
vgps3.topo.AbstractTopo.prototype.getMapType_ = goog.abstractMethod;


/**
 * Returns the URL of a tile.
 *
 * @param {google.maps.Point} coord
 * @param {number} zoom
 * @return {?string}
 *
 * @protected
 */
vgps3.topo.AbstractTopo.prototype.getTileUrl_ = goog.abstractMethod;


/**
 * Handling map show / hide
 *
 * @protected
 */
vgps3.topo.AbstractTopo.prototype.mapTypeChangeHandler_ = function() {
  if (this.gMap_.getMapTypeId() === this.mapType_) {
    this.showHandler_();
  } else {
    this.hideHandler_();
  }
};
