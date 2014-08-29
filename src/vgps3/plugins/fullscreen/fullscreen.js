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
 * @fileoverview Switch to fullscreen.
 * @author Victor Berchet <victor@suumit.com>
 */

goog.provide('vgps3.fullscreen.Fullscreen');

goog.require('vgps3.Control');
goog.require('vgps3.Map');
goog.require('vgps3.PluginBase');
goog.require('vgps3.fullscreen.templates');



/**
 * @constructor
 * @extends {vgps3.PluginBase}
 */
vgps3.fullscreen.Fullscreen = function() {
  /**
   *  @type {?{open: string, close: string}}
   *  @private
   */
  this.fsFunctions_;

  /**
   * @type {Element} The element to display
   * @private
   */
  this.fsElement_;

  /**
   * @type {vgps3.Control} The google map control
   * @private
   */
  this.control_;

  /**
   * @type {boolean} FullScreen ?
   * @private
   */
  this.fs_ = false;

  goog.base(this);
};
goog.inherits(vgps3.fullscreen.Fullscreen, vgps3.PluginBase);


/**
 * @override
 */
vgps3.fullscreen.Fullscreen.prototype.init = function(vgps) {
  goog.base(this, 'init', vgps);

  this.fsElement_ = document.getElementById('fs');

  if (null === this.fsElement_) {
    return;
  }

  this.fsFunctions_ = this.getFsFunctions_(this.fsElement_);

  if (null === this.fsFunctions_) {
    return;
  }

  this.control_ = new vgps3.Control(
      this.gMap_,
      vgps3.fullscreen.templates.fsControl,
      google.maps.ControlPosition.RIGHT_TOP
      );

  this.control_.update({'expand': true});
  var ctrlEl = this.control_.getElement();
  goog.style.setStyle(ctrlEl, 'cursor', 'pointer');
  this.getHandler().listen(ctrlEl, 'mousedown', this.clickhandle_);
};


/**
 * @param {Node} element The map container.
 *
 * @return {?{open: string, close: string}} The fs function
 *
 * @private
 */
vgps3.fullscreen.Fullscreen.prototype.getFsFunctions_ = function(element) {
  if ('requestFullScreen' in element) {
    return {
      open: 'requestFullscreen',
      close: 'exitFullscreen'
    };
  }

  if ('mozRequestFullScreen' in element) {
    return {
      open: 'mozRequestFullScreen',
      close: 'mozCancelFullScreen'
    };
  }

  if ('webkitRequestFullScreen' in element) {
    return {
      open: 'webkitRequestFullscreen',
      close: 'webkitExitFullscreen'
    };
  }

  if ('msRequestFullScreen' in element) {
    return {
      open: 'msRequestFullscreen',
      close: 'msExitFullscreen'
    };
  }


  return null;
};


/**
 * Toggles FullScreen
 *
 * @param {goog.events.Event} event
 * @private
 */
vgps3.fullscreen.Fullscreen.prototype.clickhandle_ = function(event) {
  this.control_.update({'expand': this.fs_});
  this.fs_ = !this.fs_;
  this.fs_ ? this.fsElement_[this.fsFunctions_.open]() : document[this.fsFunctions_.close]();
};


/**
 * @override
 */
vgps3.fullscreen.Fullscreen.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.dispose(this.control_);
};

goog.exportSymbol('vgps3.fullscreen.Fullscreen', vgps3.fullscreen.Fullscreen);
