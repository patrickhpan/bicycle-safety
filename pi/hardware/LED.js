const GPIO = require('pigpio').GPIO;

class LED {
    constuctor(pin, min = 0, max = 255) {
        this.pin = pin;
        this.min = min;
        this.max = max;
        this.level = this.min;

        this._led = new GPIO(pin, { mode: GPIO.output });
    }
    _setLevel(level) {
        this.level = level;
        this._led.pwmWrite(level);
    }
    on() {
        this._setLevel(this.max)
    }
    off() {
        this._setLevel(this.min)
    }
    toggle() {
        if (this.level - this.min < this.max - this.level) {
            this.on()
        } else {
            this.off();
        }
    }
    setLevel(level) {
        level = level > this.max ? this.max : level;
        level = level < this.min ? this.min : level;
        this._setLevel(level)
    }
}

module.exports = LED;