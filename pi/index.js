const GPIO = require('pigpio').Gpio;
const CONFIG = require('./config');
const LED = require('./hardware/LED');

let led = new LED(CONFIG.GPIO.LED);
let isOn = false;
setInterval(led.toggle, 1000)