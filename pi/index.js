const fs = require('fs');
const GPIO = require('pigpio').Gpio;
// const LED = require('./hardware/LED');
const NumberDisplay = require('./hardware/NumberDisplay');
const GPSReader = require('./hardware/GPSReader');

const CONFIG = require('./config');

var nDisplay = new NumberDisplay(CONFIG.GPIO.NUMBERDISPLAY);
var i = 0;

setInterval(function () { 
	i = i % 10;
	nDisplay.setNumber(i++);
}, 20)

// let red = new LED(CONFIG.GPIO.LED.RED);
// let green = new LED(CONFIG.GPIO.LED.GREEN);
//let stream = fs.createWriteStream(`gps-${+new Date()}.txt`);
// let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
// let stream = fs.createWriteStream('gps-${date}.txt');

// let callback = data => {
// 	if (data[0] !== 0 && data[1] !== 0) {
// 		green.on()
// 		red.off()
// 		stream.write(`${new Date().toString()}: data[0], data[1]\n`)
// 	} else {
// 		green.off()
// 		red.on()
// 		stream.write(`${new Date().toString()}: failed to lock`)
// 	}
// }

// stream.once('open', () => {
// 	let gps = new GPSReader(CONFIG.GPS.file, callback);
// })
// =======
// let callback = data => {
// 	if (data[0] !== 0 && data[1] !== 0) {
// 		green.on()
// 		red.off()
// 		stream.write(`${new Date().toString()}: ${data[0]}, ${data[1]}\n`)
// 	} else {
// 		green.off()
// 		red.on()
// 		stream.write(`${new Date().toString()}: failed to lock\n`)
// 	}
// }

// stream.once('open', () => {
// 	let gps = new GPSReader(CONFIG.GPS.file, callback);
// })
// >>>>>>> 546a73989feb6cc4233657aedb92bf10da122ee7
