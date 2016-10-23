const SCALE = {
    LATS: 492,
    LONGS: 825,
    LAT_MIN: 42.3534,
    LAT_MAX: 42.4026,
    LONG_MIN: -71.1579,
    LONG_MAX: -71.0754,
    MAX = 38
}

var scaleLat = function (lat) {
    console.log(lat)
    lat = Math.min(lat, SCALE.LAT_MAX)
    lat = Math.max(lat, SCALE.LAT_MIN)
    return Math.round((lat - SCALE.LAT_MIN) / (SCALE.LAT_MAX - SCALE.LAT_MIN) * SCALE.LATS)
}

var scaleLong = function (long) { 
    console.log(long)
    long = Math.min(long, SCALE.LONG_MAX)
    long = Math.max(long, SCALE.LONG_MIN)
    return Math.round((long - SCALE.LONG_MIN) / (SCALE.LONG_MAX - SCALE.LONG_MIN) * SCALE.LONGS)
}

var coordinateToHeatmap = function(coords) {
    return Math.round([scaleLat(coords[0]), scaleLong(coords[1])] * (9 / SCALE.MAX))
}

module.exports = coordinateToHeatmap;