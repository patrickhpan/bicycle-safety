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