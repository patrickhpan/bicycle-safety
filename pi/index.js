const GPIO = require('pigpio').Gpio;
const CONFIG = require('./config');
const LED = require('./hardware/LED');

let led = new LED(CONFIG.GPIO.LED);
setInterval(function() { 
	led.toggle()
}, 500)
