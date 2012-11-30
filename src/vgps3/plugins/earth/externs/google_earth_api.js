/*
 * Copyright 2010 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Externs for the Google Earth API.
 * @see https://developers.google.com/earth/documentation/reference/
 * @see https://github.com/vicb/GEPExterns
 * @externs
 */
google.earth = {};


/**
 * @return {boolean}
 */
google.earth.isSupported = function() {};


/**
 * @return {boolean}
 */
google.earth.isInstalled = function() {};


/**
 * @param {Node} domNode
 * @param {function(GEPlugin)} initCallback
 * @param {function(string)} failureCallback
 * @param {Object.<string, *>=} opt_options
 * @return {undefined}
 */
google.earth.createInstance = function(domNode, initCallback, failureCallback, opt_options) {};


/**
 * @param {Object} targetObject
 * @param {string} eventID
 * @param {function(KmlEvent)} listenerCallback
 * @param {boolean=} opt_useCapture
 * @return {undefined}
 */
google.earth.addEventListener = function(targetObject, eventID, listenerCallback, opt_useCapture) {};


/**
 * @param {Object} targetObject
 * @param {string} eventID
 * @param {function(KmlEvent)} listenerCallback
 * @param {boolean=} opt_useCapture
 * @return {undefined}
 */
google.earth.removeEventListener = function(targetObject, eventID, listenerCallback, opt_useCapture) {};


/**
 * @param {GEPlugin} pluginInstance
 * @param {string} url
 * @param {Function} completionCallback
 * @return {undefined}
 */
google.earth.fetchKml = function(pluginInstance, url, completionCallback) {};


/**
 * @param {GEPlugin} pluginInstance
 * @param {Function} batchFunction
 * @return {undefined}
 */
google.earth.executeBatch = function(pluginInstance, batchFunction) {};


/**
 * @param {string} languageCode
 * @return {undefined}
 */
google.earth.setLanguage = function(languageCode) {};



/**
 * @constructor
 */
var GEControl = function() {};



/**
 * @constructor
 * @extends {GESchemaObjectContainer}
 */
var GEFeatureContainer = function() {};



/**
 * @constructor
 * @extends {GESchemaObjectContainer}
 */
var GEGeometryContainer = function() {};



/**
 * @constructor
 * @extends {GESchemaObjectContainer}
 */
var GELinearRingContainer = function() {};



/**
 * @constructor
 * @extends {GESchemaObjectContainer}
 */
var GEStyleSelectorContainer = function() {};



/**
 * @constructor
 * @extends {GEAbstractBalloon}
 */
var GEFeatureBalloon = function() {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlGeometry = function() {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlStyleSelector = function() {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlTimePrimitive = function() {};



/**
 * @constructor
 * @extends {KmlLineString}
 */
var KmlLinearRing = function() {};



/**
 * @constructor
 * @extends {KmlLink}
 */
var KmlIcon = function() {};



/**
 * @constructor
 * @extends {KmlFeature}
 */
var KmlTour = function() {};



/**
 * @constructor
 * @extends {KmlContainer}
 */
var KmlFolder = function() {};



/**
 * @constructor
 * @extends {KmlContainer}
 */
var KmlLayer = function() {};



/**
 * @constructor
 * @extends {KmlOverlay}
 */
var KmlPhotoOverlay = function() {};



/**
 * @constructor
 * @extends {KmlGeometry}
 */
var KmlMultiGeometry = function() {};


/**
 * @return {GEGeometryContainer} */
KmlMultiGeometry.prototype.getGeometries = function() {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlTimeStamp = function() {};


/**
 * @return {KmlDateTime} */
KmlTimeStamp.prototype.getWhen = function() {};



/**
 * @constructor
 */
var GEPhotoOverlayViewer = function() {};


/**
 * @param {KmlPhotoOverlay} photoOverlay
 * @return {undefined} */
GEPhotoOverlayViewer.prototype.setPhotoOverlay = function(photoOverlay) {};



/**
 * @constructor
 */
var GESun = function() {};


/**
 * @return {boolean} */
GESun.prototype.getVisibility = function() {};


/**
 * @param {boolean} visibility
 * @return {undefined} */
GESun.prototype.setVisibility = function(visibility) {};



/**
 * @constructor
 * @extends {GEHtmlBalloon}
 */
var GEHtmlStringBalloon = function() {};


/**
 * @return {string} */
GEHtmlStringBalloon.prototype.getContentString = function() {};


/**
 * @param {string} contentString
 * @return {undefined} */
GEHtmlStringBalloon.prototype.setContentString = function(contentString) {};



/**
 * @constructor
 * @extends {GEHtmlBalloon}
 */
var GEHtmlDivBalloon = function() {};


/**
 * @return {Node} */
GEHtmlDivBalloon.prototype.getContentDiv = function() {};


/**
 * @param {Node} contentDiv
 * @return {undefined} */
GEHtmlDivBalloon.prototype.setContentDiv = function(contentDiv) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var GEGlobe = function() {};


/**
 * @return {GEFeatureContainer} */
GEGlobe.prototype.getFeatures = function() {};


/**
 * @param {number} lat
 * @param {number} lon
 * @return {number} */
GEGlobe.prototype.getGroundAltitude = function(lat, lon) {};



/**
 * @constructor
 * @extends {KmlEvent}
 */
var KmlBalloonOpeningEvent = function() {};


/**
 * @return {GEAbstractBalloon} */
KmlBalloonOpeningEvent.prototype.getBalloon = function() {};


/**
 * @return {KmlFeature} */
KmlBalloonOpeningEvent.prototype.getFeature = function() {};



/**
 * @constructor
 * @extends {KmlContainer}
 */
var KmlDocument = function() {};


/**
 * @return {GEStyleSelectorContainer} */
KmlDocument.prototype.getStyleSelectors = function() {};


/**
 * @param {string} styleUrl
 * @return {KmlObjectList} */
KmlDocument.prototype.getElementsByStyleUrl = function(styleUrl) {};



/**
 * @constructor
 * @extends {KmlFeature}
 */
var KmlPlacemark = function() {};


/**
 * @return {KmlGeometry} */
KmlPlacemark.prototype.getGeometry = function() {};


/**
 * @param {KmlGeometry} geometry
 * @return {undefined} */
KmlPlacemark.prototype.setGeometry = function(geometry) {};



/**
 * @constructor
 */
var KmlDateTime = function() {};


/**
 * @return {string} */
KmlDateTime.prototype.get = function() {};


/**
 * @param {string} date
 * @return {undefined} */
KmlDateTime.prototype.set = function(date) {};



/**
 * @constructor
 * @extends {KmlColorStyle}
 */
var KmlLineStyle = function() {};


/**
 * @return {number} */
KmlLineStyle.prototype.getWidth = function() {};


/**
 * @param {number} width
 * @return {undefined} */
KmlLineStyle.prototype.setWidth = function(width) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlTimeSpan = function() {};


/**
 * @return {KmlDateTime} */
KmlTimeSpan.prototype.getBegin = function() {};


/**
 * @return {KmlDateTime} */
KmlTimeSpan.prototype.getEnd = function() {};



/**
 * @constructor
 * @extends {KmlGeometry}
 */
var KmlAltitudeGeometry = function() {};


/**
 * @return {KmlAltitudeModeEnum} */
KmlAltitudeGeometry.prototype.getAltitudeMode = function() {};


/**
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @return {undefined} */
KmlAltitudeGeometry.prototype.setAltitudeMode = function(altitudeMode) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlViewerOptions = function() {};


/**
 * @param {GEViewerOptionsTypeEnum} type
 * @return {GEViewerOptionsValueEnum} */
KmlViewerOptions.prototype.getOption = function(type) {};


/**
 * @param {GEViewerOptionsTypeEnum} type
 * @param {GEViewerOptionsValueEnum} state
 * @return {undefined} */
KmlViewerOptions.prototype.setOption = function(type, state) {};



/**
 * @constructor
 */
var KmlObjectList = function() {};


/**
 * @param {number} index
 * @return {KmlObject} */
KmlObjectList.prototype.item = function(index) {};


/**
 * @return {number} */
KmlObjectList.prototype.getLength = function() {};



/**
 * @constructor
 * @extends {KmlColorStyle}
 */
var KmlLabelStyle = function() {};


/**
 * @return {number} */
KmlLabelStyle.prototype.getScale = function() {};


/**
 * @param {number} scale
 * @return {undefined} */
KmlLabelStyle.prototype.setScale = function(scale) {};



/**
 * @constructor
 * @extends {KmlExtrudableGeometry}
 */
var KmlPolygon = function() {};


/**
 * @return {GELinearRingContainer} */
KmlPolygon.prototype.getInnerBoundaries = function() {};


/**
 * @return {KmlLinearRing} */
KmlPolygon.prototype.getOuterBoundary = function() {};


/**
 * @param {KmlLinearRing} outerBoundary
 * @return {undefined} */
KmlPolygon.prototype.setOuterBoundary = function(outerBoundary) {};



/**
 * @constructor
 * @extends {KmlExtrudableGeometry}
 */
var KmlLineString = function() {};


/**
 * @return {KmlCoordArray} */
KmlLineString.prototype.getCoordinates = function() {};


/**
 * @return {number} */
KmlLineString.prototype.getAltitudeOffset = function() {};


/**
 * @param {number} altitudeOffset
 * @return {undefined} */
KmlLineString.prototype.setAltitudeOffset = function(altitudeOffset) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlColorStyle = function() {};


/**
 * @return {KmlColor} */
KmlColorStyle.prototype.getColor = function() {};


/**
 * @return {KmlColorModeEnum} */
KmlColorStyle.prototype.getColorMode = function() {};


/**
 * @param {KmlColorModeEnum} colorMode
 * @return {undefined} */
KmlColorStyle.prototype.setColorMode = function(colorMode) {};



/**
 * @constructor
 * @extends {KmlAltitudeGeometry}
 */
var KmlExtrudableGeometry = function() {};


/**
 * @return {boolean} */
KmlExtrudableGeometry.prototype.getExtrude = function() {};


/**
 * @return {boolean} */
KmlExtrudableGeometry.prototype.getTessellate = function() {};


/**
 * @param {boolean} extrude
 * @return {undefined} */
KmlExtrudableGeometry.prototype.setExtrude = function(extrude) {};


/**
 * @param {boolean} tessellate
 * @return {undefined} */
KmlExtrudableGeometry.prototype.setTessellate = function(tessellate) {};



/**
 * @constructor
 * @extends {KmlFeature}
 */
var KmlContainer = function() {};


/**
 * @return {GEFeatureContainer} */
KmlContainer.prototype.getFeatures = function() {};


/**
 * @param {string} id
 * @return {KmlObject} */
KmlContainer.prototype.getElementById = function(id) {};


/**
 * @param {string} url
 * @return {KmlObject} */
KmlContainer.prototype.getElementByUrl = function(url) {};


/**
 * @param {string} type
 * @return {KmlObjectList} */
KmlContainer.prototype.getElementsByType = function(type) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlBalloonStyle = function() {};


/**
 * @return {KmlColor} */
KmlBalloonStyle.prototype.getBgColor = function() {};


/**
 * @return {KmlColor} */
KmlBalloonStyle.prototype.getTextColor = function() {};


/**
 * @return {string} */
KmlBalloonStyle.prototype.getText = function() {};


/**
 * @param {string} text
 * @return {undefined} */
KmlBalloonStyle.prototype.setText = function(text) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlListStyle = function() {};


/**
 * @return {KmlColor} */
KmlListStyle.prototype.getBgColor = function() {};


/**
 * @return {KmlListItemTypeEnum} */
KmlListStyle.prototype.getListItemType = function() {};


/**
 * @return {number} */
KmlListStyle.prototype.getMaxSnippetLines = function() {};


/**
 * @param {number} maxSnippetLines
 * @return {undefined} */
KmlListStyle.prototype.setMaxSnippetLines = function(maxSnippetLines) {};



/**
 * @constructor
 * @extends {GEAbstractBalloon}
 */
var GEHtmlBalloon = function() {};


/**
 * @return {string} */
GEHtmlBalloon.prototype.getBackgroundColor = function() {};


/**
 * @return {string} */
GEHtmlBalloon.prototype.getForegroundColor = function() {};


/**
 * @param {string} backgroundColor
 * @return {undefined} */
GEHtmlBalloon.prototype.setBackgroundColor = function(backgroundColor) {};


/**
 * @param {string} foregroundColor
 * @return {undefined} */
GEHtmlBalloon.prototype.setForegroundColor = function(foregroundColor) {};



/**
 * @constructor
 * @extends {KmlContainer}
 */
var KmlLayerRoot = function() {};


/**
 * @param {string} id
 * @return {KmlFolder} */
KmlLayerRoot.prototype.getLayerById = function(id) {};


/**
 * @return {number} */
KmlLayerRoot.prototype.getDrawOrder = function() {};


/**
 * @param {number} drawOrder
 * @return {undefined} */
KmlLayerRoot.prototype.setDrawOrder = function(drawOrder) {};


/**
 * @param {string} id
 * @param {boolean} visibility
 * @return {undefined} */
KmlLayerRoot.prototype.enableLayerById = function(id, visibility) {};



/**
 * @constructor
 * @extends {KmlColorStyle}
 */
var KmlPolyStyle = function() {};


/**
 * @return {boolean} */
KmlPolyStyle.prototype.getFill = function() {};


/**
 * @return {boolean} */
KmlPolyStyle.prototype.getOutline = function() {};


/**
 * @param {boolean} fill
 * @return {undefined} */
KmlPolyStyle.prototype.setFill = function(fill) {};


/**
 * @param {boolean} outline
 * @return {undefined} */
KmlPolyStyle.prototype.setOutline = function(outline) {};



/**
 * @constructor
 * @extends {GEEventEmitter}
 */
var GEWindow = function() {};


/**
 * @return {boolean} */
GEWindow.prototype.getVisibility = function() {};


/**
 * @return {undefined} */
GEWindow.prototype.blur = function() {};


/**
 * @return {undefined} */
GEWindow.prototype.focus = function() {};


/**
 * @param {boolean} visibility
 * @return {undefined} */
GEWindow.prototype.setVisibility = function(visibility) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlRegion = function() {};


/**
 * @return {KmlLatLonAltBox} */
KmlRegion.prototype.getLatLonAltBox = function() {};


/**
 * @return {KmlLod} */
KmlRegion.prototype.getLod = function() {};


/**
 * @param {KmlLatLonAltBox} latLonAltBox
 * @return {undefined} */
KmlRegion.prototype.setLatLonAltBox = function(latLonAltBox) {};


/**
 * @param {KmlLod} lod
 * @return {undefined} */
KmlRegion.prototype.setLod = function(lod) {};


/**
 * @param {KmlLatLonAltBox} latLonAltBox
 * @param {KmlLod} lod
 * @return {undefined} */
KmlRegion.prototype.set = function(latLonAltBox, lod) {};



/**
 * @constructor
 */
var GETimeControl = function() {};


/**
 * @return {GEVisibilityEnum} */
GETimeControl.prototype.getVisibility = function() {};


/**
 * @return {KmlObjectList} */
GETimeControl.prototype.getAvailableImageDates = function() {};


/**
 * @return {KmlTimeSpan} */
GETimeControl.prototype.getExtents = function() {};


/**
 * @return {number} */
GETimeControl.prototype.getCalculatedRate = function() {};


/**
 * @param {GEVisibilityEnum} visibility
 * @return {undefined} */
GETimeControl.prototype.setVisibility = function(visibility) {};



/**
 * @constructor
 * @extends {KmlFeature}
 */
var KmlOverlay = function() {};


/**
 * @return {KmlColor} */
KmlOverlay.prototype.getColor = function() {};


/**
 * @return {KmlIcon} */
KmlOverlay.prototype.getIcon = function() {};


/**
 * @return {number} */
KmlOverlay.prototype.getDrawOrder = function() {};


/**
 * @param {number} drawOrder
 * @return {undefined} */
KmlOverlay.prototype.setDrawOrder = function(drawOrder) {};


/**
 * @param {KmlIcon} icon
 * @return {undefined} */
KmlOverlay.prototype.setIcon = function(icon) {};



/**
 * @constructor
 * @extends {KmlOverlay}
 */
var KmlScreenOverlay = function() {};


/**
 * @return {KmlVec2} */
KmlScreenOverlay.prototype.getOverlayXY = function() {};


/**
 * @return {KmlVec2} */
KmlScreenOverlay.prototype.getRotationXY = function() {};


/**
 * @return {KmlVec2} */
KmlScreenOverlay.prototype.getScreenXY = function() {};


/**
 * @return {KmlVec2} */
KmlScreenOverlay.prototype.getSize = function() {};


/**
 * @return {number} */
KmlScreenOverlay.prototype.getRotation = function() {};


/**
 * @param {number} rotation
 * @return {undefined} */
KmlScreenOverlay.prototype.setRotation = function(rotation) {};



/**
 * @constructor
 * @extends {KmlOverlay}
 */
var KmlGroundOverlay = function() {};


/**
 * @return {KmlAltitudeModeEnum} */
KmlGroundOverlay.prototype.getAltitudeMode = function() {};


/**
 * @return {KmlLatLonBox} */
KmlGroundOverlay.prototype.getLatLonBox = function() {};


/**
 * @return {number} */
KmlGroundOverlay.prototype.getAltitude = function() {};


/**
 * @param {number} altitude
 * @return {undefined} */
KmlGroundOverlay.prototype.setAltitude = function(altitude) {};


/**
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @return {undefined} */
KmlGroundOverlay.prototype.setAltitudeMode = function(altitudeMode) {};


/**
 * @param {KmlLatLonBox} latLonBox
 * @return {undefined} */
KmlGroundOverlay.prototype.setLatLonBox = function(latLonBox) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlAbstractView = function() {};


/**
 * @return {KmlCamera} */
KmlAbstractView.prototype.copyAsCamera = function() {};


/**
 * @return {KmlLookAt} */
KmlAbstractView.prototype.copyAsLookAt = function() {};


/**
 * @return {KmlTimePrimitive} */
KmlAbstractView.prototype.getTimePrimitive = function() {};


/**
 * @return {KmlViewerOptions} */
KmlAbstractView.prototype.getViewerOptions = function() {};


/**
 * @param {KmlTimePrimitive} timePrimitive
 * @return {undefined} */
KmlAbstractView.prototype.setTimePrimitive = function(timePrimitive) {};


/**
 * @param {KmlViewerOptions} viewerOptions
 * @return {undefined} */
KmlAbstractView.prototype.setViewerOptions = function(viewerOptions) {};



/**
 * @constructor
 * @extends {KmlStyleSelector}
 */
var KmlStyle = function() {};


/**
 * @return {KmlBalloonStyle} */
KmlStyle.prototype.getBalloonStyle = function() {};


/**
 * @return {KmlIconStyle} */
KmlStyle.prototype.getIconStyle = function() {};


/**
 * @return {KmlLabelStyle} */
KmlStyle.prototype.getLabelStyle = function() {};


/**
 * @return {KmlLineStyle} */
KmlStyle.prototype.getLineStyle = function() {};


/**
 * @return {KmlListStyle} */
KmlStyle.prototype.getListStyle = function() {};


/**
 * @return {KmlPolyStyle} */
KmlStyle.prototype.getPolyStyle = function() {};



/**
 * @constructor
 */
var GEHitTestResult = function() {};


/**
 * @return {number} */
GEHitTestResult.prototype.getAltitude = function() {};


/**
 * @return {number} */
GEHitTestResult.prototype.getLatitude = function() {};


/**
 * @return {number} */
GEHitTestResult.prototype.getLongitude = function() {};


/**
 * @param {number} altitude
 * @return {undefined} */
GEHitTestResult.prototype.setAltitude = function(altitude) {};


/**
 * @param {number} latitude
 * @return {undefined} */
GEHitTestResult.prototype.setLatitude = function(latitude) {};


/**
 * @param {number} longitude
 * @return {undefined} */
GEHitTestResult.prototype.setLongitude = function(longitude) {};



/**
 * @constructor
 */
var GEEventEmitter = function() {};


/**
 * @param {KmlMouseEvent} event
 * @return {undefined} */
GEEventEmitter.prototype.click = function(event) {};


/**
 * @param {KmlMouseEvent} event
 * @return {undefined} */
GEEventEmitter.prototype.dblclick = function(event) {};


/**
 * @param {KmlMouseEvent} event
 * @return {undefined} */
GEEventEmitter.prototype.mousedown = function(event) {};


/**
 * @param {KmlMouseEvent} event
 * @return {undefined} */
GEEventEmitter.prototype.mousemove = function(event) {};


/**
 * @param {KmlMouseEvent} event
 * @return {undefined} */
GEEventEmitter.prototype.mouseout = function(event) {};


/**
 * @param {KmlMouseEvent} event
 * @return {undefined} */
GEEventEmitter.prototype.mouseover = function(event) {};


/**
 * @param {KmlMouseEvent} event
 * @return {undefined} */
GEEventEmitter.prototype.mouseup = function(event) {};



/**
 * @constructor
 * @extends {KmlColorStyle}
 */
var KmlIconStyle = function() {};


/**
 * @return {KmlIcon} */
KmlIconStyle.prototype.getIcon = function() {};


/**
 * @return {KmlVec2} */
KmlIconStyle.prototype.getHotSpot = function() {};


/**
 * @return {number} */
KmlIconStyle.prototype.getHeading = function() {};


/**
 * @return {number} */
KmlIconStyle.prototype.getScale = function() {};


/**
 * @param {number} heading
 * @return {undefined} */
KmlIconStyle.prototype.setHeading = function(heading) {};


/**
 * @param {KmlIcon} icon
 * @return {undefined} */
KmlIconStyle.prototype.setIcon = function(icon) {};


/**
 * @param {number} scale
 * @return {undefined} */
KmlIconStyle.prototype.setScale = function(scale) {};



/**
 * @constructor
 * @extends {KmlLatLonBox}
 */
var KmlLatLonAltBox = function() {};


/**
 * @return {KmlAltitudeModeEnum} */
KmlLatLonAltBox.prototype.getAltitudeMode = function() {};


/**
 * @return {number} */
KmlLatLonAltBox.prototype.getMaxAltitude = function() {};


/**
 * @return {number} */
KmlLatLonAltBox.prototype.getMinAltitude = function() {};


/**
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @return {undefined} */
KmlLatLonAltBox.prototype.setAltitudeMode = function(altitudeMode) {};


/**
 * @param {number} maxAltitude
 * @return {undefined} */
KmlLatLonAltBox.prototype.setMaxAltitude = function(maxAltitude) {};


/**
 * @param {number} minAltitude
 * @return {undefined} */
KmlLatLonAltBox.prototype.setMinAltitude = function(minAltitude) {};


/**
 * @param {number} north
 * @param {number} south
 * @param {number} east
 * @param {number} west
 * @param {number} rotation
 * @param {number} minAltitude
 * @param {number} maxAltitude
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @return {undefined} */
KmlLatLonAltBox.prototype.setAltBox = function(north, south, east, west, rotation, minAltitude, maxAltitude, altitudeMode) {};



/**
 * @constructor
 */
var GETourPlayer = function() {};


/**
 * @return {number} */
GETourPlayer.prototype.getCurrentTime = function() {};


/**
 * @return {number} */
GETourPlayer.prototype.getDuration = function() {};


/**
 * @return {undefined} */
GETourPlayer.prototype.pause = function() {};


/**
 * @return {undefined} */
GETourPlayer.prototype.play = function() {};


/**
 * @return {undefined} */
GETourPlayer.prototype.reset = function() {};


/**
 * @param {number} currentTime
 * @return {undefined} */
GETourPlayer.prototype.setCurrentTime = function(currentTime) {};


/**
 * @param {KmlTour} tour
 * @return {undefined} */
GETourPlayer.prototype.setTour = function(tour) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlOrientation = function() {};


/**
 * @return {number} */
KmlOrientation.prototype.getHeading = function() {};


/**
 * @return {number} */
KmlOrientation.prototype.getRoll = function() {};


/**
 * @return {number} */
KmlOrientation.prototype.getTilt = function() {};


/**
 * @param {number} heading
 * @return {undefined} */
KmlOrientation.prototype.setHeading = function(heading) {};


/**
 * @param {number} roll
 * @return {undefined} */
KmlOrientation.prototype.setRoll = function(roll) {};


/**
 * @param {number} tilt
 * @return {undefined} */
KmlOrientation.prototype.setTilt = function(tilt) {};


/**
 * @param {number} heading
 * @param {number} tilt
 * @param {number} roll
 * @return {undefined} */
KmlOrientation.prototype.set = function(heading, tilt, roll) {};



/**
 * @constructor
 */
var KmlCoord = function() {};


/**
 * @return {number} */
KmlCoord.prototype.getAltitude = function() {};


/**
 * @return {number} */
KmlCoord.prototype.getLatitude = function() {};


/**
 * @return {number} */
KmlCoord.prototype.getLongitude = function() {};


/**
 * @param {number} altitude
 * @return {undefined} */
KmlCoord.prototype.setAltitude = function(altitude) {};


/**
 * @param {number} latitude
 * @return {undefined} */
KmlCoord.prototype.setLatitude = function(latitude) {};


/**
 * @param {number} longitude
 * @return {undefined} */
KmlCoord.prototype.setLongitude = function(longitude) {};


/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} altitude
 * @return {undefined} */
KmlCoord.prototype.setLatLngAlt = function(latitude, longitude, altitude) {};



/**
 * @constructor
 * @extends {GEEventEmitter}
 */
var KmlObject = function() {};


/**
 * @return {KmlDocument} */
KmlObject.prototype.getOwnerDocument = function() {};


/**
 * @return {KmlObject} */
KmlObject.prototype.getParentNode = function() {};


/**
 * @param {KmlObject} compareTo
 * @return {boolean} */
KmlObject.prototype.equals = function(compareTo) {};


/**
 * @return {string} */
KmlObject.prototype.getId = function() {};


/**
 * @return {string} */
KmlObject.prototype.getType = function() {};


/**
 * @return {string} */
KmlObject.prototype.getUrl = function() {};


/**
 * @return {undefined} */
KmlObject.prototype.release = function() {};



/**
 * @constructor
 */
var KmlEvent = function() {};


/**
 * @return {GEEventEmitter} */
KmlEvent.prototype.getCurrentTarget = function() {};


/**
 * @return {GEEventEmitter} */
KmlEvent.prototype.getTarget = function() {};


/**
 * @return {GEEventPhaseEnum} */
KmlEvent.prototype.getEventPhase = function() {};


/**
 * @return {boolean} */
KmlEvent.prototype.getBubbles = function() {};


/**
 * @return {boolean} */
KmlEvent.prototype.getCancelable = function() {};


/**
 * @return {undefined} */
KmlEvent.prototype.preventDefault = function() {};


/**
 * @return {undefined} */
KmlEvent.prototype.stopPropagation = function() {};



/**
 * @constructor
 * @extends {KmlFeature}
 */
var KmlNetworkLink = function() {};


/**
 * @return {KmlLink} */
KmlNetworkLink.prototype.getLink = function() {};


/**
 * @return {boolean} */
KmlNetworkLink.prototype.getFlyToView = function() {};


/**
 * @return {boolean} */
KmlNetworkLink.prototype.getRefreshVisibility = function() {};


/**
 * @param {boolean} flyToView
 * @return {undefined} */
KmlNetworkLink.prototype.setFlyToView = function(flyToView) {};


/**
 * @param {KmlLink} link
 * @return {undefined} */
KmlNetworkLink.prototype.setLink = function(link) {};


/**
 * @param {boolean} refreshVisibility
 * @return {undefined} */
KmlNetworkLink.prototype.setRefreshVisibility = function(refreshVisibility) {};


/**
 * @param {KmlLink} link
 * @param {boolean} refreshVisibility
 * @param {boolean} flyToView
 * @return {undefined} */
KmlNetworkLink.prototype.set = function(link, refreshVisibility, flyToView) {};



/**
 * @constructor
 */
var GENavigationControl = function() {};


/**
 * @return {GENavigationControlEnum} */
GENavigationControl.prototype.getControlType = function() {};


/**
 * @return {GEVisibilityEnum} */
GENavigationControl.prototype.getVisibility = function() {};


/**
 * @return {KmlVec2} */
GENavigationControl.prototype.getScreenXY = function() {};


/**
 * @return {boolean} */
GENavigationControl.prototype.getStreetViewEnabled = function() {};


/**
 * @param {GENavigationControlEnum} controlType
 * @return {undefined} */
GENavigationControl.prototype.setControlType = function(controlType) {};


/**
 * @param {boolean} streetViewEnabled
 * @return {undefined} */
GENavigationControl.prototype.setStreetViewEnabled = function(streetViewEnabled) {};


/**
 * @param {GEVisibilityEnum} visibility
 * @return {undefined} */
GENavigationControl.prototype.setVisibility = function(visibility) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlLocation = function() {};


/**
 * @return {number} */
KmlLocation.prototype.getAltitude = function() {};


/**
 * @return {number} */
KmlLocation.prototype.getLatitude = function() {};


/**
 * @return {number} */
KmlLocation.prototype.getLongitude = function() {};


/**
 * @param {number} altitude
 * @return {undefined} */
KmlLocation.prototype.setAltitude = function(altitude) {};


/**
 * @param {number} latitude
 * @return {undefined} */
KmlLocation.prototype.setLatitude = function(latitude) {};


/**
 * @param {number} longitude
 * @return {undefined} */
KmlLocation.prototype.setLongitude = function(longitude) {};


/**
 * @param {number} lat
 * @param {number} lng
 * @param {number} alt
 * @return {undefined} */
KmlLocation.prototype.setLatLngAlt = function(lat, lng, alt) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlScale = function() {};


/**
 * @return {number} */
KmlScale.prototype.getX = function() {};


/**
 * @return {number} */
KmlScale.prototype.getY = function() {};


/**
 * @return {number} */
KmlScale.prototype.getZ = function() {};


/**
 * @param {number} x
 * @return {undefined} */
KmlScale.prototype.setX = function(x) {};


/**
 * @param {number} y
 * @return {undefined} */
KmlScale.prototype.setY = function(y) {};


/**
 * @param {number} z
 * @return {undefined} */
KmlScale.prototype.setZ = function(z) {};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {undefined} */
KmlScale.prototype.set = function(x, y, z) {};



/**
 * @constructor
 */
var GESchemaObjectContainer = function() {};


/**
 * @return {KmlObject} */
GESchemaObjectContainer.prototype.getFirstChild = function() {};


/**
 * @return {KmlObject} */
GESchemaObjectContainer.prototype.getLastChild = function() {};


/**
 * @param {KmlObject} object
 * @return {KmlObject} */
GESchemaObjectContainer.prototype.appendChild = function(object) {};


/**
 * @param {KmlObject} oldChild
 * @return {KmlObject} */
GESchemaObjectContainer.prototype.removeChild = function(oldChild) {};


/**
 * @param {KmlObject} newChild
 * @param {KmlObject} oldChild
 * @return {KmlObject} */
GESchemaObjectContainer.prototype.replaceChild = function(newChild, oldChild) {};


/**
 * @param {KmlObject} newChild
 * @param {KmlObject} refChild
 * @return {KmlObject} */
GESchemaObjectContainer.prototype.insertBefore = function(newChild, refChild) {};


/**
 * @return {KmlObjectList} */
GESchemaObjectContainer.prototype.getChildNodes = function() {};


/**
 * @return {boolean} */
GESchemaObjectContainer.prototype.hasChildNodes = function() {};



/**
 * @constructor
 */
var GETime = function() {};


/**
 * @return {GETimeControl} */
GETime.prototype.getControl = function() {};


/**
 * @return {KmlTimePrimitive} */
GETime.prototype.getTimePrimitive = function() {};


/**
 * @return {KmlTimeStamp} */
GETime.prototype.getSystemTime = function() {};


/**
 * @return {boolean} */
GETime.prototype.getHistoricalImageryEnabled = function() {};


/**
 * @return {number} */
GETime.prototype.getRate = function() {};


/**
 * @param {boolean} historicalImageryEnabled
 * @return {undefined} */
GETime.prototype.setHistoricalImageryEnabled = function(historicalImageryEnabled) {};


/**
 * @param {number} rate
 * @return {undefined} */
GETime.prototype.setRate = function(rate) {};


/**
 * @param {KmlTimePrimitive} timePrimitive
 * @return {undefined} */
GETime.prototype.setTimePrimitive = function(timePrimitive) {};



/**
 * @constructor
 * @extends {KmlAltitudeGeometry}
 */
var KmlModel = function() {};


/**
 * @return {KmlLink} */
KmlModel.prototype.getLink = function() {};


/**
 * @return {KmlLocation} */
KmlModel.prototype.getLocation = function() {};


/**
 * @return {KmlOrientation} */
KmlModel.prototype.getOrientation = function() {};


/**
 * @return {KmlScale} */
KmlModel.prototype.getScale = function() {};


/**
 * @param {KmlLink} link
 * @return {undefined} */
KmlModel.prototype.setLink = function(link) {};


/**
 * @param {KmlLocation} location
 * @return {undefined} */
KmlModel.prototype.setLocation = function(location) {};


/**
 * @param {KmlOrientation} orientation
 * @return {undefined} */
KmlModel.prototype.setOrientation = function(orientation) {};


/**
 * @param {KmlScale} scale
 * @return {undefined} */
KmlModel.prototype.setScale = function(scale) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlLod = function() {};


/**
 * @return {number} */
KmlLod.prototype.getMaxFadeExtent = function() {};


/**
 * @return {number} */
KmlLod.prototype.getMaxLodPixels = function() {};


/**
 * @return {number} */
KmlLod.prototype.getMinFadeExtent = function() {};


/**
 * @return {number} */
KmlLod.prototype.getMinLodPixels = function() {};


/**
 * @param {number} maxFadeExtent
 * @return {undefined} */
KmlLod.prototype.setMaxFadeExtent = function(maxFadeExtent) {};


/**
 * @param {number} maxLodPixels
 * @return {undefined} */
KmlLod.prototype.setMaxLodPixels = function(maxLodPixels) {};


/**
 * @param {number} minFadeExtent
 * @return {undefined} */
KmlLod.prototype.setMinFadeExtent = function(minFadeExtent) {};


/**
 * @param {number} minLodPixels
 * @return {undefined} */
KmlLod.prototype.setMinLodPixels = function(minLodPixels) {};


/**
 * @param {number} minLodPixels
 * @param {number} maxLodPixels
 * @param {number} minFadeExtent
 * @param {number} maxFadeExtent
 * @return {undefined} */
KmlLod.prototype.set = function(minLodPixels, maxLodPixels, minFadeExtent, maxFadeExtent) {};



/**
 * @constructor
 */
var KmlVec2 = function() {};


/**
 * @return {KmlUnitsEnum} */
KmlVec2.prototype.getXUnits = function() {};


/**
 * @return {KmlUnitsEnum} */
KmlVec2.prototype.getYUnits = function() {};


/**
 * @return {number} */
KmlVec2.prototype.getX = function() {};


/**
 * @return {number} */
KmlVec2.prototype.getY = function() {};


/**
 * @param {number} x
 * @return {undefined} */
KmlVec2.prototype.setX = function(x) {};


/**
 * @param {KmlUnitsEnum} xUnits
 * @return {undefined} */
KmlVec2.prototype.setXUnits = function(xUnits) {};


/**
 * @param {number} y
 * @return {undefined} */
KmlVec2.prototype.setY = function(y) {};


/**
 * @param {KmlUnitsEnum} yUnits
 * @return {undefined} */
KmlVec2.prototype.setYUnits = function(yUnits) {};


/**
 * @param {number} x
 * @param {KmlUnitsEnum} xUnits
 * @param {number} y
 * @param {KmlUnitsEnum} yUnits
 * @return {undefined} */
KmlVec2.prototype.set = function(x, xUnits, y, yUnits) {};



/**
 * @constructor
 */
var GEView = function() {};


/**
 * @param {number} x
 * @param {KmlUnitsEnum} xUnits
 * @param {number} y
 * @param {KmlUnitsEnum} yUnits
 * @param {GEHitTestModeEnum} mode
 * @return {GEHitTestResult} */
GEView.prototype.hitTest = function(x, xUnits, y, yUnits, mode) {};


/**
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @return {KmlCamera} */
GEView.prototype.copyAsCamera = function(altitudeMode) {};


/**
 * @return {KmlLatLonBox} */
GEView.prototype.getViewportGlobeBounds = function() {};


/**
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @return {KmlLookAt} */
GEView.prototype.copyAsLookAt = function(altitudeMode) {};


/**
 * @param {number} lat
 * @param {number} lng
 * @param {number} alt
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @return {KmlVec2} */
GEView.prototype.project = function(lat, lng, alt, altitudeMode) {};


/**
 * @return {undefined} */
GEView.prototype.viewchange = function() {};


/**
 * @return {undefined} */
GEView.prototype.viewchangebegin = function() {};


/**
 * @return {undefined} */
GEView.prototype.viewchangeend = function() {};


/**
 * @param {KmlAbstractView} view
 * @return {undefined} */
GEView.prototype.setAbstractView = function(view) {};



/**
 * @constructor
 * @extends {KmlExtrudableGeometry}
 */
var KmlPoint = function() {};


/**
 * @return {number} */
KmlPoint.prototype.getAltitude = function() {};


/**
 * @return {number} */
KmlPoint.prototype.getLatitude = function() {};


/**
 * @return {number} */
KmlPoint.prototype.getLongitude = function() {};


/**
 * @param {number} altitude
 * @return {undefined} */
KmlPoint.prototype.setAltitude = function(altitude) {};


/**
 * @param {number} latitude
 * @return {undefined} */
KmlPoint.prototype.setLatitude = function(latitude) {};


/**
 * @param {number} longitude
 * @return {undefined} */
KmlPoint.prototype.setLongitude = function(longitude) {};


/**
 * @param {number} latitude
 * @param {number} longitude
 * @return {undefined} */
KmlPoint.prototype.setLatLng = function(latitude, longitude) {};


/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} altitude
 * @return {undefined} */
KmlPoint.prototype.setLatLngAlt = function(latitude, longitude, altitude) {};


/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} altitude
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @param {boolean} extrude
 * @param {boolean} tessellate
 * @return {undefined} */
KmlPoint.prototype.set = function(latitude, longitude, altitude, altitudeMode, extrude, tessellate) {};



/**
 * @constructor
 * @extends {KmlStyleSelector}
 */
var KmlStyleMap = function() {};


/**
 * @return {KmlStyle} */
KmlStyleMap.prototype.getHighlightStyle = function() {};


/**
 * @return {KmlStyle} */
KmlStyleMap.prototype.getNormalStyle = function() {};


/**
 * @return {string} */
KmlStyleMap.prototype.getHighlightStyleUrl = function() {};


/**
 * @return {string} */
KmlStyleMap.prototype.getNormalStyleUrl = function() {};


/**
 * @param {KmlStyle} highlightStyle
 * @return {undefined} */
KmlStyleMap.prototype.setHighlightStyle = function(highlightStyle) {};


/**
 * @param {string} highlightStyleUrl
 * @return {undefined} */
KmlStyleMap.prototype.setHighlightStyleUrl = function(highlightStyleUrl) {};


/**
 * @param {KmlStyle} normalStyle
 * @return {undefined} */
KmlStyleMap.prototype.setNormalStyle = function(normalStyle) {};


/**
 * @param {string} normalStyleUrl
 * @return {undefined} */
KmlStyleMap.prototype.setNormalStyleUrl = function(normalStyleUrl) {};


/**
 * @param {KmlStyle} normalStyle
 * @param {KmlStyle} highlightStyle
 * @return {undefined} */
KmlStyleMap.prototype.setStyle = function(normalStyle, highlightStyle) {};


/**
 * @param {string} normalStyleUrl
 * @param {string} highlightStyleUrl
 * @return {undefined} */
KmlStyleMap.prototype.setUrl = function(normalStyleUrl, highlightStyleUrl) {};



/**
 * @constructor
 */
var KmlColor = function() {};


/**
 * @return {number} */
KmlColor.prototype.getA = function() {};


/**
 * @return {number} */
KmlColor.prototype.getB = function() {};


/**
 * @return {number} */
KmlColor.prototype.getG = function() {};


/**
 * @return {number} */
KmlColor.prototype.getR = function() {};


/**
 * @return {string} */
KmlColor.prototype.get = function() {};


/**
 * @param {number} a
 * @return {undefined} */
KmlColor.prototype.setA = function(a) {};


/**
 * @param {number} b
 * @return {undefined} */
KmlColor.prototype.setB = function(b) {};


/**
 * @param {string} color
 * @return {undefined} */
KmlColor.prototype.set = function(color) {};


/**
 * @param {number} g
 * @return {undefined} */
KmlColor.prototype.setG = function(g) {};


/**
 * @param {number} r
 * @return {undefined} */
KmlColor.prototype.setR = function(r) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlLatLonBox = function() {};


/**
 * @return {number} */
KmlLatLonBox.prototype.getEast = function() {};


/**
 * @return {number} */
KmlLatLonBox.prototype.getNorth = function() {};


/**
 * @return {number} */
KmlLatLonBox.prototype.getRotation = function() {};


/**
 * @return {number} */
KmlLatLonBox.prototype.getSouth = function() {};


/**
 * @return {number} */
KmlLatLonBox.prototype.getWest = function() {};


/**
 * @param {number} east
 * @return {undefined} */
KmlLatLonBox.prototype.setEast = function(east) {};


/**
 * @param {number} north
 * @return {undefined} */
KmlLatLonBox.prototype.setNorth = function(north) {};


/**
 * @param {number} rotation
 * @return {undefined} */
KmlLatLonBox.prototype.setRotation = function(rotation) {};


/**
 * @param {number} south
 * @return {undefined} */
KmlLatLonBox.prototype.setSouth = function(south) {};


/**
 * @param {number} west
 * @return {undefined} */
KmlLatLonBox.prototype.setWest = function(west) {};


/**
 * @param {number} north
 * @param {number} south
 * @param {number} east
 * @param {number} west
 * @param {number} rotation
 * @return {undefined} */
KmlLatLonBox.prototype.setBox = function(north, south, east, west, rotation) {};



/**
 * @constructor
 */
var KmlCoordArray = function() {};


/**
 * @return {KmlCoord} */
KmlCoordArray.prototype.pop = function() {};


/**
 * @return {KmlCoord} */
KmlCoordArray.prototype.shift = function() {};


/**
 * @param {number} index
 * @return {KmlCoord} */
KmlCoordArray.prototype.get = function(index) {};


/**
 * @return {number} */
KmlCoordArray.prototype.getLength = function() {};


/**
 * @param {?} coordOrList
 * @return {number} */
KmlCoordArray.prototype.push = function(coordOrList) {};


/**
 * @param {?} coordOrList
 * @return {number} */
KmlCoordArray.prototype.unshift = function(coordOrList) {};


/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} altitude
 * @return {number} */
KmlCoordArray.prototype.pushLatLngAlt = function(latitude, longitude, altitude) {};


/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} altitude
 * @return {number} */
KmlCoordArray.prototype.unshiftLatLngAlt = function(latitude, longitude, altitude) {};


/**
 * @return {undefined} */
KmlCoordArray.prototype.clear = function() {};


/**
 * @return {undefined} */
KmlCoordArray.prototype.reverse = function() {};


/**
 * @param {number} index
 * @param {KmlCoord} coord
 * @return {undefined} */
KmlCoordArray.prototype.set = function(index, coord) {};


/**
 * @param {number} index
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} altitude
 * @return {undefined} */
KmlCoordArray.prototype.setLatLngAlt = function(index, latitude, longitude, altitude) {};



/**
 * @constructor
 * @extends {KmlEvent}
 */
var KmlMouseEvent = function() {};


/**
 * @return {GEEventEmitter} */
KmlMouseEvent.prototype.getRelatedTarget = function() {};


/**
 * @return {boolean} */
KmlMouseEvent.prototype.getAltKey = function() {};


/**
 * @return {boolean} */
KmlMouseEvent.prototype.getCtrlKey = function() {};


/**
 * @return {boolean} */
KmlMouseEvent.prototype.getDidHitGlobe = function() {};


/**
 * @return {boolean} */
KmlMouseEvent.prototype.getShiftKey = function() {};


/**
 * @return {number} */
KmlMouseEvent.prototype.getAltitude = function() {};


/**
 * @return {number} */
KmlMouseEvent.prototype.getLatitude = function() {};


/**
 * @return {number} */
KmlMouseEvent.prototype.getLongitude = function() {};


/**
 * @return {number} */
KmlMouseEvent.prototype.getButton = function() {};


/**
 * @return {number} */
KmlMouseEvent.prototype.getClientX = function() {};


/**
 * @return {number} */
KmlMouseEvent.prototype.getClientY = function() {};


/**
 * @return {number} */
KmlMouseEvent.prototype.getScreenX = function() {};


/**
 * @return {number} */
KmlMouseEvent.prototype.getScreenY = function() {};



/**
 * @constructor
 */
var GEAbstractBalloon = function() {};


/**
 * @return {KmlFeature} */
GEAbstractBalloon.prototype.getFeature = function() {};


/**
 * @return {boolean} */
GEAbstractBalloon.prototype.getCloseButtonEnabled = function() {};


/**
 * @return {number} */
GEAbstractBalloon.prototype.getMaxHeight = function() {};


/**
 * @return {number} */
GEAbstractBalloon.prototype.getMaxWidth = function() {};


/**
 * @return {number} */
GEAbstractBalloon.prototype.getMinHeight = function() {};


/**
 * @return {number} */
GEAbstractBalloon.prototype.getMinWidth = function() {};


/**
 * @return {string} */
GEAbstractBalloon.prototype.getId = function() {};


/**
 * @param {boolean} closeButtonEnabled
 * @return {undefined} */
GEAbstractBalloon.prototype.setCloseButtonEnabled = function(closeButtonEnabled) {};


/**
 * @param {KmlFeature} feature
 * @return {undefined} */
GEAbstractBalloon.prototype.setFeature = function(feature) {};


/**
 * @param {string} id
 * @return {undefined} */
GEAbstractBalloon.prototype.setId = function(id) {};


/**
 * @param {number} maxHeight
 * @return {undefined} */
GEAbstractBalloon.prototype.setMaxHeight = function(maxHeight) {};


/**
 * @param {number} maxWidth
 * @return {undefined} */
GEAbstractBalloon.prototype.setMaxWidth = function(maxWidth) {};


/**
 * @param {number} minHeight
 * @return {undefined} */
GEAbstractBalloon.prototype.setMinHeight = function(minHeight) {};


/**
 * @param {number} minWidth
 * @return {undefined} */
GEAbstractBalloon.prototype.setMinWidth = function(minWidth) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlLink = function() {};


/**
 * @return {KmlRefreshModeEnum} */
KmlLink.prototype.getRefreshMode = function() {};


/**
 * @return {KmlViewRefreshModeEnum} */
KmlLink.prototype.getViewRefreshMode = function() {};


/**
 * @return {number} */
KmlLink.prototype.getRefreshInterval = function() {};


/**
 * @return {number} */
KmlLink.prototype.getViewBoundScale = function() {};


/**
 * @return {number} */
KmlLink.prototype.getViewRefreshTime = function() {};


/**
 * @return {string} */
KmlLink.prototype.getHref = function() {};


/**
 * @return {string} */
KmlLink.prototype.getViewFormat = function() {};


/**
 * @param {string} href
 * @return {undefined} */
KmlLink.prototype.setHref = function(href) {};


/**
 * @param {number} refreshInterval
 * @return {undefined} */
KmlLink.prototype.setRefreshInterval = function(refreshInterval) {};


/**
 * @param {KmlRefreshModeEnum} refreshMode
 * @return {undefined} */
KmlLink.prototype.setRefreshMode = function(refreshMode) {};


/**
 * @param {number} viewBoundScale
 * @return {undefined} */
KmlLink.prototype.setViewBoundScale = function(viewBoundScale) {};


/**
 * @param {string} viewFormat
 * @return {undefined} */
KmlLink.prototype.setViewFormat = function(viewFormat) {};


/**
 * @param {KmlViewRefreshModeEnum} viewRefreshMode
 * @return {undefined} */
KmlLink.prototype.setViewRefreshMode = function(viewRefreshMode) {};


/**
 * @param {number} viewRefreshTime
 * @return {undefined} */
KmlLink.prototype.setViewRefreshTime = function(viewRefreshTime) {};



/**
 * @constructor
 * @extends {KmlAbstractView}
 */
var KmlLookAt = function() {};


/**
 * @return {KmlAltitudeModeEnum} */
KmlLookAt.prototype.getAltitudeMode = function() {};


/**
 * @return {number} */
KmlLookAt.prototype.getAltitude = function() {};


/**
 * @return {number} */
KmlLookAt.prototype.getHeading = function() {};


/**
 * @return {number} */
KmlLookAt.prototype.getLatitude = function() {};


/**
 * @return {number} */
KmlLookAt.prototype.getLongitude = function() {};


/**
 * @return {number} */
KmlLookAt.prototype.getRange = function() {};


/**
 * @return {number} */
KmlLookAt.prototype.getTilt = function() {};


/**
 * @param {number} altitude
 * @return {undefined} */
KmlLookAt.prototype.setAltitude = function(altitude) {};


/**
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @return {undefined} */
KmlLookAt.prototype.setAltitudeMode = function(altitudeMode) {};


/**
 * @param {number} heading
 * @return {undefined} */
KmlLookAt.prototype.setHeading = function(heading) {};


/**
 * @param {number} latitude
 * @return {undefined} */
KmlLookAt.prototype.setLatitude = function(latitude) {};


/**
 * @param {number} longitude
 * @return {undefined} */
KmlLookAt.prototype.setLongitude = function(longitude) {};


/**
 * @param {number} range
 * @return {undefined} */
KmlLookAt.prototype.setRange = function(range) {};


/**
 * @param {number} tilt
 * @return {undefined} */
KmlLookAt.prototype.setTilt = function(tilt) {};


/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} altitude
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @param {number} heading
 * @param {number} tilt
 * @param {number} range
 * @return {undefined} */
KmlLookAt.prototype.set = function(latitude, longitude, altitude, altitudeMode, heading, tilt, range) {};



/**
 * @constructor
 * @extends {KmlAbstractView}
 */
var KmlCamera = function() {};


/**
 * @return {KmlAltitudeModeEnum} */
KmlCamera.prototype.getAltitudeMode = function() {};


/**
 * @return {number} */
KmlCamera.prototype.getAltitude = function() {};


/**
 * @return {number} */
KmlCamera.prototype.getHeading = function() {};


/**
 * @return {number} */
KmlCamera.prototype.getLatitude = function() {};


/**
 * @return {number} */
KmlCamera.prototype.getLongitude = function() {};


/**
 * @return {number} */
KmlCamera.prototype.getRoll = function() {};


/**
 * @return {number} */
KmlCamera.prototype.getTilt = function() {};


/**
 * @param {number} altitude
 * @return {undefined} */
KmlCamera.prototype.setAltitude = function(altitude) {};


/**
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @return {undefined} */
KmlCamera.prototype.setAltitudeMode = function(altitudeMode) {};


/**
 * @param {number} heading
 * @return {undefined} */
KmlCamera.prototype.setHeading = function(heading) {};


/**
 * @param {number} latitude
 * @return {undefined} */
KmlCamera.prototype.setLatitude = function(latitude) {};


/**
 * @param {number} longitude
 * @return {undefined} */
KmlCamera.prototype.setLongitude = function(longitude) {};


/**
 * @param {number} roll
 * @return {undefined} */
KmlCamera.prototype.setRoll = function(roll) {};


/**
 * @param {number} tilt
 * @return {undefined} */
KmlCamera.prototype.setTilt = function(tilt) {};


/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} altitude
 * @param {KmlAltitudeModeEnum} altitudeMode
 * @param {number} heading
 * @param {number} tilt
 * @param {number} roll
 * @return {undefined} */
KmlCamera.prototype.set = function(latitude, longitude, altitude, altitudeMode, heading, tilt, roll) {};



/**
 * @constructor
 */
var GEOptions = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getAtmosphereVisibility = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getAutoGroundLevelViewEnabled = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getBuildingHighlightingEnabled = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getBuildingSelectionEnabled = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getFadeInOutEnabled = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getGridVisibility = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getMouseNavigationEnabled = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getOverviewMapVisibility = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getScaleLegendVisibility = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getStatusBarVisibility = function() {};


/**
 * @return {boolean} */
GEOptions.prototype.getUnitsFeetMiles = function() {};


/**
 * @return {number} */
GEOptions.prototype.getFlyToSpeed = function() {};


/**
 * @return {number} */
GEOptions.prototype.getScrollWheelZoomSpeed = function() {};


/**
 * @return {number} */
GEOptions.prototype.getTerrainExaggeration = function() {};


/**
 * @param {boolean} atmosphereVisibility
 * @return {undefined} */
GEOptions.prototype.setAtmosphereVisibility = function(atmosphereVisibility) {};


/**
 * @param {boolean} autoGroundLevelViewEnabled
 * @return {undefined} */
GEOptions.prototype.setAutoGroundLevelViewEnabled = function(autoGroundLevelViewEnabled) {};


/**
 * @param {boolean} buildingHighlightingEnabled
 * @return {undefined} */
GEOptions.prototype.setBuildingHighlightingEnabled = function(buildingHighlightingEnabled) {};


/**
 * @param {boolean} buildingSelectionEnabled
 * @return {undefined} */
GEOptions.prototype.setBuildingSelectionEnabled = function(buildingSelectionEnabled) {};


/**
 * @param {boolean} fadeInOutEnabled
 * @return {undefined} */
GEOptions.prototype.setFadeInOutEnabled = function(fadeInOutEnabled) {};


/**
 * @param {number} flyToSpeed
 * @return {undefined} */
GEOptions.prototype.setFlyToSpeed = function(flyToSpeed) {};


/**
 * @param {boolean} gridVisibility
 * @return {undefined} */
GEOptions.prototype.setGridVisibility = function(gridVisibility) {};


/**
 * @param {boolean} mouseNavigationEnabled
 * @return {undefined} */
GEOptions.prototype.setMouseNavigationEnabled = function(mouseNavigationEnabled) {};


/**
 * @param {boolean} overviewMapVisibility
 * @return {undefined} */
GEOptions.prototype.setOverviewMapVisibility = function(overviewMapVisibility) {};


/**
 * @param {boolean} scaleLegendVisibility
 * @return {undefined} */
GEOptions.prototype.setScaleLegendVisibility = function(scaleLegendVisibility) {};


/**
 * @param {number} scrollWheelZoomSpeed
 * @return {undefined} */
GEOptions.prototype.setScrollWheelZoomSpeed = function(scrollWheelZoomSpeed) {};


/**
 * @param {boolean} statusBarVisibility
 * @return {undefined} */
GEOptions.prototype.setStatusBarVisibility = function(statusBarVisibility) {};


/**
 * @param {number} terrainExaggeration
 * @return {undefined} */
GEOptions.prototype.setTerrainExaggeration = function(terrainExaggeration) {};


/**
 * @param {GEMapTypeEnum} type
 * @return {undefined} */
GEOptions.prototype.setMapType = function(type) {};


/**
 * @param {boolean} unitsFeetMiles
 * @return {undefined} */
GEOptions.prototype.setUnitsFeetMiles = function(unitsFeetMiles) {};



/**
 * @constructor
 * @extends {KmlObject}
 */
var KmlFeature = function() {};


/**
 * @return {KmlAbstractView} */
KmlFeature.prototype.getAbstractView = function() {};


/**
 * @return {KmlFeature} */
KmlFeature.prototype.getNextSibling = function() {};


/**
 * @return {KmlFeature} */
KmlFeature.prototype.getPreviousSibling = function() {};


/**
 * @return {KmlRegion} */
KmlFeature.prototype.getRegion = function() {};


/**
 * @return {KmlStyle} */
KmlFeature.prototype.getComputedStyle = function() {};


/**
 * @return {KmlStyleSelector} */
KmlFeature.prototype.getStyleSelector = function() {};


/**
 * @return {KmlTimePrimitive} */
KmlFeature.prototype.getTimePrimitive = function() {};


/**
 * @return {boolean} */
KmlFeature.prototype.getOpen = function() {};


/**
 * @return {boolean} */
KmlFeature.prototype.getVisibility = function() {};


/**
 * @return {number} */
KmlFeature.prototype.getOpacity = function() {};


/**
 * @return {string} */
KmlFeature.prototype.getAddress = function() {};


/**
 * @return {string} */
KmlFeature.prototype.getBalloonHtml = function() {};


/**
 * @return {string} */
KmlFeature.prototype.getBalloonHtmlUnsafe = function() {};


/**
 * @return {string} */
KmlFeature.prototype.getDescription = function() {};


/**
 * @return {string} */
KmlFeature.prototype.getKml = function() {};


/**
 * @return {string} */
KmlFeature.prototype.getName = function() {};


/**
 * @return {string} */
KmlFeature.prototype.getSnippet = function() {};


/**
 * @return {string} */
KmlFeature.prototype.getStyleUrl = function() {};


/**
 * @param {KmlAbstractView} abstractView
 * @return {undefined} */
KmlFeature.prototype.setAbstractView = function(abstractView) {};


/**
 * @param {string} address
 * @return {undefined} */
KmlFeature.prototype.setAddress = function(address) {};


/**
 * @param {string} description
 * @return {undefined} */
KmlFeature.prototype.setDescription = function(description) {};


/**
 * @param {string} name
 * @return {undefined} */
KmlFeature.prototype.setName = function(name) {};


/**
 * @param {number} opacity
 * @return {undefined} */
KmlFeature.prototype.setOpacity = function(opacity) {};


/**
 * @param {boolean} open
 * @return {undefined} */
KmlFeature.prototype.setOpen = function(open) {};


/**
 * @param {KmlRegion} region
 * @return {undefined} */
KmlFeature.prototype.setRegion = function(region) {};


/**
 * @param {string} snippet
 * @return {undefined} */
KmlFeature.prototype.setSnippet = function(snippet) {};


/**
 * @param {KmlStyleSelector} styleSelector
 * @return {undefined} */
KmlFeature.prototype.setStyleSelector = function(styleSelector) {};


/**
 * @param {string} styleUrl
 * @return {undefined} */
KmlFeature.prototype.setStyleUrl = function(styleUrl) {};


/**
 * @param {KmlTimePrimitive} timePrimitive
 * @return {undefined} */
KmlFeature.prototype.setTimePrimitive = function(timePrimitive) {};


/**
 * @param {boolean} visibility
 * @return {undefined} */
KmlFeature.prototype.setVisibility = function(visibility) {};



/**
 * @constructor
 */
var GEPlugin = function() {};


/**
 * @return {GEAbstractBalloon} */
GEPlugin.prototype.getBalloon = function() {};


/**
 * @param {string} id
 * @return {GEFeatureBalloon} */
GEPlugin.prototype.createFeatureBalloon = function(id) {};


/**
 * @return {GEFeatureContainer} */
GEPlugin.prototype.getFeatures = function() {};


/**
 * @return {GEGlobe} */
GEPlugin.prototype.getGlobe = function() {};


/**
 * @param {string} id
 * @return {GEHtmlDivBalloon} */
GEPlugin.prototype.createHtmlDivBalloon = function(id) {};


/**
 * @param {string} id
 * @return {GEHtmlStringBalloon} */
GEPlugin.prototype.createHtmlStringBalloon = function(id) {};


/**
 * @return {GENavigationControl} */
GEPlugin.prototype.getNavigationControl = function() {};


/**
 * @return {GEOptions} */
GEPlugin.prototype.getOptions = function() {};


/**
 * @return {GEPhotoOverlayViewer} */
GEPlugin.prototype.getPhotoOverlayViewer = function() {};


/**
 * @return {GESun} */
GEPlugin.prototype.getSun = function() {};


/**
 * @return {GETime} */
GEPlugin.prototype.getTime = function() {};


/**
 * @return {GETourPlayer} */
GEPlugin.prototype.getTourPlayer = function() {};


/**
 * @return {GEView} */
GEPlugin.prototype.getView = function() {};


/**
 * @return {GEWindow} */
GEPlugin.prototype.getWindow = function() {};


/**
 * @param {string} id
 * @return {KmlCamera} */
GEPlugin.prototype.createCamera = function(id) {};


/**
 * @param {string} id
 * @return {KmlDocument} */
GEPlugin.prototype.createDocument = function(id) {};


/**
 * @param {string} id
 * @return {KmlFolder} */
GEPlugin.prototype.createFolder = function(id) {};


/**
 * @param {string} id
 * @return {KmlGroundOverlay} */
GEPlugin.prototype.createGroundOverlay = function(id) {};


/**
 * @param {string} id
 * @return {KmlIcon} */
GEPlugin.prototype.createIcon = function(id) {};


/**
 * @param {string} id
 * @return {KmlLatLonAltBox} */
GEPlugin.prototype.createLatLonAltBox = function(id) {};


/**
 * @param {string} id
 * @return {KmlLatLonBox} */
GEPlugin.prototype.createLatLonBox = function(id) {};


/**
 * @return {KmlLayerRoot} */
GEPlugin.prototype.getLayerRoot = function() {};


/**
 * @param {string} id
 * @return {KmlLineString} */
GEPlugin.prototype.createLineString = function(id) {};


/**
 * @param {string} id
 * @return {KmlLinearRing} */
GEPlugin.prototype.createLinearRing = function(id) {};


/**
 * @param {string} id
 * @return {KmlLink} */
GEPlugin.prototype.createLink = function(id) {};


/**
 * @param {string} id
 * @return {KmlLocation} */
GEPlugin.prototype.createLocation = function(id) {};


/**
 * @param {string} id
 * @return {KmlLod} */
GEPlugin.prototype.createLod = function(id) {};


/**
 * @param {string} id
 * @return {KmlLookAt} */
GEPlugin.prototype.createLookAt = function(id) {};


/**
 * @param {string} id
 * @return {KmlModel} */
GEPlugin.prototype.createModel = function(id) {};


/**
 * @param {string} id
 * @return {KmlMultiGeometry} */
GEPlugin.prototype.createMultiGeometry = function(id) {};


/**
 * @param {string} id
 * @return {KmlNetworkLink} */
GEPlugin.prototype.createNetworkLink = function(id) {};


/**
 * @param {string} kml
 * @return {KmlObject} */
GEPlugin.prototype.parseKml = function(kml) {};


/**
 * @param {string} url
 * @return {KmlObject} */
GEPlugin.prototype.getElementById = function(url) {};


/**
 * @param {string} url
 * @return {KmlObject} */
GEPlugin.prototype.getElementByUrl = function(url) {};


/**
 * @param {string} type
 * @return {KmlObjectList} */
GEPlugin.prototype.getElementsByType = function(type) {};


/**
 * @param {string} id
 * @return {KmlOrientation} */
GEPlugin.prototype.createOrientation = function(id) {};


/**
 * @param {string} id
 * @return {KmlPlacemark} */
GEPlugin.prototype.createPlacemark = function(id) {};


/**
 * @param {string} id
 * @return {KmlPoint} */
GEPlugin.prototype.createPoint = function(id) {};


/**
 * @param {string} id
 * @return {KmlPolygon} */
GEPlugin.prototype.createPolygon = function(id) {};


/**
 * @param {string} id
 * @return {KmlRegion} */
GEPlugin.prototype.createRegion = function(id) {};


/**
 * @param {string} id
 * @return {KmlScale} */
GEPlugin.prototype.createScale = function(id) {};


/**
 * @param {string} id
 * @return {KmlScreenOverlay} */
GEPlugin.prototype.createScreenOverlay = function(id) {};


/**
 * @param {string} id
 * @return {KmlStyle} */
GEPlugin.prototype.createStyle = function(id) {};


/**
 * @param {string} id
 * @return {KmlStyleMap} */
GEPlugin.prototype.createStyleMap = function(id) {};


/**
 * @param {string} id
 * @return {KmlTimeSpan} */
GEPlugin.prototype.createTimeSpan = function(id) {};


/**
 * @param {string} id
 * @return {KmlTimeStamp} */
GEPlugin.prototype.createTimeStamp = function(id) {};


/**
 * @param {string} id
 * @return {KmlViewerOptions} */
GEPlugin.prototype.createViewerOptions = function(id) {};


/**
 * @return {number} */
GEPlugin.prototype.getStreamingPercent = function() {};


/**
 * @return {string} */
GEPlugin.prototype.getApiVersion = function() {};


/**
 * @return {string} */
GEPlugin.prototype.getEarthVersion = function() {};


/**
 * @return {string} */
GEPlugin.prototype.getPluginVersion = function() {};


/**
 * @return {undefined} */
GEPlugin.prototype.balloonclose = function() {};


/**
 * @return {undefined} */
GEPlugin.prototype.frameend = function() {};


/**
 * @param {KmlBalloonOpeningEvent} event
 * @return {undefined} */
GEPlugin.prototype.balloonopening = function(event) {};


/**
 * @param {GEAbstractBalloon} newActiveBalloon
 * @return {undefined} */
GEPlugin.prototype.setBalloon = function(newActiveBalloon) {};


/**
 * @type {string} */
GEPlugin.prototype.LAYER_BORDERS;


/**
 * @type {string} */
GEPlugin.prototype.LAYER_BUILDINGS;


/**
 * @type {string} */
GEPlugin.prototype.LAYER_BUILDINGS_LOW_RESOLUTION;


/**
 * @type {string} */
GEPlugin.prototype.LAYER_ROADS;


/**
 * @type {string} */
GEPlugin.prototype.LAYER_TERRAIN;


/**
 * @type {string} */
GEPlugin.prototype.LAYER_TREES;


/**
 * @type {number} */
GEPlugin.prototype.SPEED_TELEPORT;


/**
 * @typedef {(string|number)}
 */
var GEMapTypeEnum;


/**
 * @type {GEMapTypeEnum}
 */
GEPlugin.prototype.MAP_TYPE_EARTH;


/**
 * @type {GEMapTypeEnum}
 */
GEPlugin.prototype.MAP_TYPE_SKY;


/**
 * @typedef {(string|number)}
 */
var GENavigationControlEnum;


/**
 * @type {GENavigationControlEnum}
 */
GEPlugin.prototype.NAVIGATION_CONTROL_LARGE;


/**
 * @type {GENavigationControlEnum}
 */
GEPlugin.prototype.NAVIGATION_CONTROL_SMALL;


/**
 * @typedef {(string|number)}
 */
var KmlColorModeEnum;


/**
 * @type {KmlColorModeEnum}
 */
GEPlugin.prototype.COLOR_NORMAL;


/**
 * @type {KmlColorModeEnum}
 */
GEPlugin.prototype.COLOR_RANDOM;


/**
 * @type {KmlColorModeEnum}
 */
GEPlugin.prototype.COLOR_INHERIT;


/**
 * @typedef {(string|number)}
 */
var GEEventPhaseEnum;


/**
 * @type {GEEventPhaseEnum}
 */
GEPlugin.prototype.EVENT_CAPTURING_PHASE;


/**
 * @type {GEEventPhaseEnum}
 */
GEPlugin.prototype.EVENT_AT_TARGET_PHASE;


/**
 * @type {GEEventPhaseEnum}
 */
GEPlugin.prototype.EVENT_BUBBLING_PHASE;


/**
 * @typedef {(string|number)}
 */
var GEHitTestModeEnum;


/**
 * @type {GEHitTestModeEnum}
 */
GEPlugin.prototype.HIT_TEST_GLOBE;


/**
 * @type {GEHitTestModeEnum}
 */
GEPlugin.prototype.HIT_TEST_TERRAIN;


/**
 * @type {GEHitTestModeEnum}
 */
GEPlugin.prototype.HIT_TEST_BUILDINGS;


/**
 * @typedef {(string|number)}
 */
var GEViewerOptionsValueEnum;


/**
 * @type {GEViewerOptionsValueEnum}
 */
GEPlugin.prototype.OPTION_STATE_DEFAULT;


/**
 * @type {GEViewerOptionsValueEnum}
 */
GEPlugin.prototype.OPTION_STATE_ENABLED;


/**
 * @type {GEViewerOptionsValueEnum}
 */
GEPlugin.prototype.OPTION_STATE_DISABLED;


/**
 * @typedef {(string|number)}
 */
var GEViewerOptionsTypeEnum;


/**
 * @type {GEViewerOptionsTypeEnum}
 */
GEPlugin.prototype.OPTION_SUNLIGHT;


/**
 * @type {GEViewerOptionsTypeEnum}
 */
GEPlugin.prototype.OPTION_HISTORICAL_IMAGERY;


/**
 * @type {GEViewerOptionsTypeEnum}
 */
GEPlugin.prototype.OPTION_STREET_VIEW;


/**
 * @typedef {(string|number)}
 */
var KmlRefreshModeEnum;


/**
 * @type {KmlRefreshModeEnum}
 */
GEPlugin.prototype.REFRESH_ON_CHANGE;


/**
 * @type {KmlRefreshModeEnum}
 */
GEPlugin.prototype.REFRESH_ON_INTERVAL;


/**
 * @type {KmlRefreshModeEnum}
 */
GEPlugin.prototype.REFRESH_ON_EXPIRE;


/**
 * @typedef {(string|number)}
 */
var KmlUnitsEnum;


/**
 * @type {KmlUnitsEnum}
 */
GEPlugin.prototype.UNITS_FRACTION;


/**
 * @type {KmlUnitsEnum}
 */
GEPlugin.prototype.UNITS_PIXELS;


/**
 * @type {KmlUnitsEnum}
 */
GEPlugin.prototype.UNITS_INSET_PIXELS;


/**
 * @typedef {(string|number)}
 */
var GEVisibilityEnum;


/**
 * @type {GEVisibilityEnum}
 */
GEPlugin.prototype.VISIBILITY_HIDE;


/**
 * @type {GEVisibilityEnum}
 */
GEPlugin.prototype.VISIBILITY_SHOW;


/**
 * @type {GEVisibilityEnum}
 */
GEPlugin.prototype.VISIBILITY_AUTO;


/**
 * @typedef {(string|number)}
 */
var KmlListItemTypeEnum;


/**
 * @type {KmlListItemTypeEnum}
 */
GEPlugin.prototype.LIST_ITEM_CHECK;


/**
 * @type {KmlListItemTypeEnum}
 */
GEPlugin.prototype.LIST_ITEM_CHECK_OFF_ONLY;


/**
 * @type {KmlListItemTypeEnum}
 */
GEPlugin.prototype.LIST_ITEM_CHECK_HIDE_CHILDREN;


/**
 * @type {KmlListItemTypeEnum}
 */
GEPlugin.prototype.LIST_ITEM_RADIO_FOLDER;


/**
 * @typedef {(string|number)}
 */
var KmlViewRefreshModeEnum;


/**
 * @type {KmlViewRefreshModeEnum}
 */
GEPlugin.prototype.VIEW_REFRESH_NEVER;


/**
 * @type {KmlViewRefreshModeEnum}
 */
GEPlugin.prototype.VIEW_REFRESH_ON_REQUEST;


/**
 * @type {KmlViewRefreshModeEnum}
 */
GEPlugin.prototype.VIEW_REFRESH_ON_STOP;


/**
 * @type {KmlViewRefreshModeEnum}
 */
GEPlugin.prototype.VIEW_REFRESH_ON_REGION;


/**
 * @typedef {(string|number)}
 */
var KmlAltitudeModeEnum;


/**
 * @type {KmlAltitudeModeEnum}
 */
GEPlugin.prototype.ALTITUDE_CLAMP_TO_GROUND;


/**
 * @type {KmlAltitudeModeEnum}
 */
GEPlugin.prototype.ALTITUDE_RELATIVE_TO_GROUND;


/**
 * @type {KmlAltitudeModeEnum}
 */
GEPlugin.prototype.ALTITUDE_ABSOLUTE;


/**
 * @type {KmlAltitudeModeEnum}
 */
GEPlugin.prototype.ALTITUDE_CLAMP_TO_SEA_FLOOR;


/**
 * @type {KmlAltitudeModeEnum}
 */
GEPlugin.prototype.ALTITUDE_RELATIVE_TO_SEA_FLOOR;
