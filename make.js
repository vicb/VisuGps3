{
  "inherits": "make.dev.js",
  "id": "vgps3",
  "define": {
    //"vgps3.track.PROXY_URL": "tests/fixtures/tracks/json/",
    "vgps3.VERSION": "3.0.0-beta1",
    "goog.DEBUG": false
  },
  "debug": false,
  "pretty-print": simple,
  "mode": "ADVANCED",
  "output-wrapper": [
    "/**\n",
    " * VisuGps3 Copyright 2012 Victor Berchet <victor@suumit.com>\n",
    " */\n",
    "%output%"
  ],
  "name-suffixes-to-strip": ["logger", "logger_"],
  "type-prefixes-to-strip": ["goog.debug", "goog.asserts", "goog.testing"],
  "define": {
      "vgps3.VERSION": "3.0.0-beta1",
      "goog.Disposable.MONITORING_MODE": 0
  },
  "output-file": "dist/vgps3.js"
}
