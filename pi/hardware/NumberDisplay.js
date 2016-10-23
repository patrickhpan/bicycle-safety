const LED = require('./LED');

const NUMBERS = {
    0: [1, 1, 1, 1, 1, 1, 0, 0],
    1: [0, 1, 1, 0, 0, 0, 0, 0],
    2: [1, 1, 0, 1, 1, 0, 1, 0],
    3: [1, 1, 1, 1, 0, 0, 1, 0],
    4: [0, 1, 1, 0, 0, 1, 1, 0],
    5: [1, 0, 1, 1, 0, 1, 1, 0],
    6: [1, 0, 1, 1, 1, 1, 1, 0],
    7: [1, 1, 1, 0, 0, 1, 0, 0],
    8: [1, 1, 1, 1, 1, 1, 1, 0],
    9: [1, 1, 1, 0, 0, 1, 1, 0],
}

class NumberDisplay {
    constructor(config) {
        let {
            a, b, c, d, e, f, g, dp
        } = config;
        if (!(a && b && c && d && e && f && g && dp)) {
            throw "PinNotFoundException";
        }
        this._pins = {
            a, b, c, d, e, f, g, dp
        }
    }
    setNumber(number) {
        number = number % 10;
        this.applyLayout(NUMBERS[number]);
    }
    applyLayout(layout) {
        this._pins.forEach(pin => {
            if (layout.shift() === 1) {
                pin.on();
            } else {
                pin.off();
            }
        })
    }
}

module.exports = NumberDisplay;