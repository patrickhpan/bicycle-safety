const fs = require('fs');
const GPIO = require('pigpio').Gpio;
const LED = require('./hardware/LED');
const GPSReader = require('./hardware/GPSReader');

const CONFIG = require('./config');

let red = new LED(CONFIG.GPIO.LED.RED);
let green = new LED(CONFIG.GPIO.LED.GREEN);
let stream = fs.createWriteStream(`gps-${+new Date()}.txt`);

let callback = data => {
	if (data[0] !== 0 && data[1] !== 0) {
		green.on()
		red.off()
		stream.write(`${new Date().toString()}: ${data[0]}, ${data[1]}\n`)
	} else {
		green.off()
		red.on()
		stream.write(`${new Date().toString()}: failed to lock\n`)
	}
}

stream.once('open', () => {
	let gps = new GPSReader(CONFIG.GPS.file, callback);
})
