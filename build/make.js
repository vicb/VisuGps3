{
  "inherits": "config.js",
  "id": "vgps3",
  "mode": "ADVANCED",
  "define": {
    "vgps3.track.PROXY_URL": "tests/fixtures/tracks/json/",
    "vgps3.VERSION": "3.0.0-beta1",
    "goog.DEBUG": false,
    "goog.Disposable.MONITORING_MODE": 0
  },
  "debug": false,
  "pretty-print": false,
  "output-wrapper": [
    "/**\n",
    " * VisuGps3 Copyright 2012 Victor Berchet <victor@suumit.com>\n",
    " */\n",
    "%output%"
  ],
  "name-suffixes-to-strip": [
    "logger",
    "logger_"
  ],
  "type-prefixes-to-strip": [
    "goog.debug.Console",
    "goog.debug.Logger",
    "goog.debug.Trace",
    "goog.asserts",
    "goog.testing"
  ],
  "output-file": "../dist/vgps3.js"
}
