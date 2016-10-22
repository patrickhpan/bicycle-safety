const SerialPort = require('serialport');
const CONFIG = require('../config');

var gpsPort = new SerialPort(CONFIG.GPS.file, {
    parser: SerialPort.parsers.readline('\n')
});

let filterGPGLL = line => !!(line.match(/^\$GPGLL/));
let gpgllToLocation = line => {
    let values = line.split(',');
    let latitude = Number(values[1]);
    let longitude = Number(values[3]);

    var latMinute = latitude % 100;
    latitude = (latitude % 100) / 100 + latMinute / 60;
    var longMinute = longitude % 100;
    longitude = (longitude % 100) / 100 + longMinute / 60;

    if (values[2] === 'S') {
        latitude *= -1;
    } 
    if (values[4] === 'W') {
        longitude *= -1;
    }
    return [latitude, longitude];
}

gpsPort.on('data', data => {
    if (filterGPGLL(data)) {
        let coordinate = gpgllToLocation(data);
        console.log(`(${coordinate[0]}, ${coordinate[1]})`);
    }
    
})
