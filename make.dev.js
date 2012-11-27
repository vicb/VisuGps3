{
  "id": "vgps3-dev",
  "inputs": [
    "src/vgps3/vgps3.js"
  ],
      "paths": [
    "src/vgps3"
  ],
      "externs": [
    "src/vgps3/plugins/chart/externs/google_viz_api_v1.0.js",
    "src/vgps3/plugins/earth/externs/google_earth_api.js",
    "//google_maps_api_v3.js",
    "//google_loader_api.js"
  ],
  "debug": true,
  "pretty-print": true,
  "mode": "SIMPLE",
  "level": "VERBOSE",
  "define": {
    "vgps3.track.PROXY_URL": "tests/fixtures/tracks/json/",
    "vgps3.ign.API_KEY": "",
    "vgps3.VERSION": "3.0-DEV",
    "goog.DEBUG": true
  },
  "output-file": "dist/vgps3.js"
}
