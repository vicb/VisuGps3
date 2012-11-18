{
    "id": "vgps3",
    "inputs": [
        "src/vgps3/vgps3.js"
    ],
    "paths": [
        "src/vgps3",
        "src/vgps3/plugins/track",
        "src/vgps3/plugins/chart",
        "src/vgps3/plugins/ign",
        "src/vgps3/plugins/route",
        "src/vgps3/plugins/earth"
    ],
    "externs": [
        "src/vgps3/plugins/chart/externs/google_viz_api_v1.0.js",
        "src/vgps3/plugins/earth/externs/google_earth_plugin.js",
        "//google_maps_api_v3.js",
        "//google_loader_api.js"
    ],
    "define": {
        "vgps3.VERSION": "3.0.0-beta1"
    },
    "output-file": "dist/vgps3.js"
}
