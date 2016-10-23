const SerialPort = require('serialport');
const CONFIG = require('../config');

class GPSReader {    
    constructor(file, callback) {
        this.file = file;
        this.callback = callback;

        this._serialPort = new SerialPort(this.file, {
            parser: SerialPort.parsers.readline('\n')
        });

        this._serialPort.on('data', data => {
            if (this.filterGPGLL(data)) {
                let location = this.gpgllToLocation(data);
                callback(location);
            }
        });
    }

    filterGPGLL(line) {
        return line.match(/^\$GPGLL/);
    }

    gpgllToLocation(line) {
        let values = line.split(',');

        let latitude = Number(values[1].slice(0, 2));
        let latMins = Number(values[1].slice(2)) / 60;
        let longitude = Number(values[3].slice(1, 3));
        let longMins = Number(values[3].slice(3)) / 60;
        latitude += latMins;
        longitude += longMins;

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
