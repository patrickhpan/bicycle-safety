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
        this._leds = [
            a, b, c, d, e, f, g, dp
        ].map(pin => new LED(pin));
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
}

module.exports = NumberDisplay;
