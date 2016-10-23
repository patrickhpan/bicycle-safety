const CONFIG = {
    GPS: {
        file: '/dev/ttyACM0'
    },
    GPIO: { 
        LED: {
            RED: 17,
            GREEN: 18
        },
        NUMBERDISPLAY: {
            a: 4,
            b: 17,
            c: 18,
            d: 27,
            e: 22,
            f: 23,
            g: 24,
            dp: 25
        }
    }
}

module.exports = CONFIG;
