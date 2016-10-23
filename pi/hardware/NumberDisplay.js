const LED = require('./LED');

const NUMBERS = {
    0: [1, 1, 1, 1, 1, 1, 0],
    1: [0, 1, 1, 0, 0, 0, 0],
    2: [1, 1, 0, 1, 1, 0, 1],
    3: [1, 1, 1, 1, 0, 0, 1],
    4: [0, 1, 1, 0, 0, 1, 1],
    5: [1, 0, 1, 1, 0, 1, 1],
    6: [1, 0, 1, 1, 1, 1, 1],
    7: [1, 1, 1, 0, 0, 1, 0],
    8: [1, 1, 1, 1, 1, 1, 1],
    9: [1, 1, 1, 0, 0, 1, 1],
}

class NumberDisplay {
    constructor(config) {
        let {
            a, b, c, d, e, f, g, dp
        } = config;
        if (!(a && b && c && d && e && f && g && dp)) {
            throw "PinNotFoundException";
        }
        this._leds = [
            a, b, c, d, e, f, g
        ].map(pin => new LED(pin));
        this._dp = new LED(dp);
    }
    setNumber(number) {
        this.applyLayout(NUMBERS[number]);
    }
    applyLayout(layout) {
        this._leds.forEach((led,i) => {
            if (layout[i] === 1) {
                led.on();
            } else {
               led.off(); 
            }
        })
    }
    dpOn() {
        this._dp.on();
    }
    dpOff() {
        this._dp.off();
    }
}

module.exports = NumberDisplay;
