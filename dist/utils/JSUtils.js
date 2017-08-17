'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var ThrowParam = function ThrowParam(string) {
    throw new Error(string);
};

function pad(pad, str, padRight) {
    if (typeof str === 'undefined') return pad;
    if (padRight) {
        return (str + pad).substring(0, pad.length);
    } else {
        return (pad + str).slice(-pad.length);
    }
}

exports['default'] = {
    ThrowParam: ThrowParam,
    pad: pad
};
module.exports = exports['default'];