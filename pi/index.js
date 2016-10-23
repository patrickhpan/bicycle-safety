const fs = require('fs');
const request = require('request');
const GPIO = require('pigpio').Gpio;
const NumberDisplay = require('./hardware/NumberDisplay');
const GPSReader = require('./hardware/GPSReader');

const CONFIG = require('./config');

var nDisplay = new NumberDisplay(CONFIG.GPIO.NUMBERDISPLAY);

let callback = data => {
	console.log(`(${data[0]}, ${data[1]})`)
	if (data[0] !== 0 && data[1] !== 0) {
		request(`http://localhost:8000/coordinate?lat=${data[0]}&long=${data[1]}`, (err, body, data) => {
			if (!err) {
				let num = Number(body);
				console.log(num)
				nDisplay.setNumber(num);
				nDisplay.dpOff();	
			}
		})
	} else {
		nDisplay.dpOn()
	}
}

let gps = new GPSReader(CONFIG.GPS.file, callback);


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
