const SerialPort = require('serialport');
const CONFIG = require('../config');

var gpsPort = SerialPort(CONFIG.GPS.file, {
    parser: SerialPort.parsers.readline('\n')
});

gpsPort.on('data', data => {
    console.log(`Received ${data}`);
})