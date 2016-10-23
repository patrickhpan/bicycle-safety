const SerialPort = require('serialport');
const CONFIG = require('../config');

class GPSReader {    
    constructor(file, callback) {
        this.file = file;
        this.callback = callback;
        this.filter = filter;

        this._serialPort = new SerialPort(this.file, {
            parser: SerialPort.parsers.readline('\n')
        });

        this._serialPort.on('data', data => {
            if (this.filterGPGLL(data)) {
                let location = gpgllToLocation(data);
                callback(location);
            }
        });
    }

    filterGPGLL(line) {
        return line.match(/^\$GPGLL/);
    }

    gpgllToLocation(line) {
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
}

module.exports = GPSReader;