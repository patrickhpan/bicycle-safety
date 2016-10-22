const fs = require('fs');
const GPIO = require('pigpio').Gpio;
const LED = require('./hardware/LED');
const GPSReader = require('./hardware/GPSReader');

const CONFIG = require('./config');

let led = new LED(CONFIG.GPIO.LED);
let stream = fs.createWriteStream(`gps-${+new Date()}.txt`);

let callback = data => {
	if (data[0] !== 0 && data[1] !== 0) {
		led.on()
		stream.write(`${new Date().toString()}: data[0], data[1]\n`)
	} else {
		led.off()
		stream.write(`${new Date().toString()}: failed to lock`)
	}
}

stream.once('open', () => {
	let gps = new GPSReader(CONFIG.GPS.file, callback);
})