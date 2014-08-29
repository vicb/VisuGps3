# VisuGps3

Display GPS tracks on top of Google maps.

![VisuGps3](https://raw.github.com/vicb/VisuGps3/master/doc/vgps3.jpg)

Powered by:

- [Google Maps API v3](https://developers.google.com/maps/documentation/javascript/),
- [Google Chart Tools](https://developers.google.com/chart/),
- [Google Closure Tools](https://developers.google.com/closure/),
- [Google Earth Plugin](http://www.google.com/earth/explore/products/plugin.html),
- [Font Awesome](http://fortawesome.github.com/Font-Awesome/).

This is the next version of [VisuGps](https://github.com/vicb/VisuGps), one of my
first web project. It has been rewritten to leverage the latest JS API form Google
as the maps API v2 will be deprecated in 2013.

## Supported features

- Display a single or multiple tracks on top of a map,
- Display charts for elevation, horizontal & vertical speed,
- The track can be viewed in 3D
  - on platforms where the [GE plugin is supported](http://www.google.com/earth/explore/products/plugin.html),
  - without any plugin if your browser support WebGL thanks to DoArama - based on Cesium
- Display markers for routes,
- Measure distances with the path plugin,
- Display restricted airspaces,
- Display skyways thanks to [Michael von Känel](http://thermal.kk7.ch/),
- Switch to full screen mode,
- Topographic maps:
  - [France IGN](http://www.ign.fr/),
  - [Spain IGN](http://www.ign.es/),
  - [Switzerland SwissTopo](http://www.swisstopo.ch/),
  - [Europe 4UMaps](http://www.4umaps.eu/).

## Roadmap

### future versions

- use GeoJSON

## Contributors

- [Tom Payne](https://github.com/twpayne)

## Credits

- [Josh Livni](https://github.com/jlivni): Parts of the earth plugin have been inspired by his
  [Earth API library for Maps v3](http://code.google.com/p/google-maps-utility-library-v3/source/browse/trunk/googleearth/src/googleearth.js)
- Shama [explains](http://www.developpez.net/forums/d999116/applications/sig-systeme-dinformation-geographique/ign-api-geoportail/affichage-couches-ign-sous-googlemap/) how to integrate geoportal tiles within Google maps API.
- Marcin Grysko [explains](http://grysz.com/2011/04/12/how-ign-tile-servers-work/) how the spain ign tile server works.
- Nianwei Liu for some [Transverse Mercator projection code](http://code.google.com/p/google-maps-utility-library-v3/source/browse/trunk/arcgislink/src/arcgislink.js).
