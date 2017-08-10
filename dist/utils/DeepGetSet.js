'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.get = get;
exports.set = set;

function get(_x, _x2, _x3) {
    var _again = true;

    _function: while (_again) {
        var object = _x,
            keys = _x2,
            defaultVal = _x3;
        _again = false;

        keys = Array.isArray(keys) ? keys : keys.split('.');
        object = object[keys[0]];
        if (object && keys.length > 1) {
            _x = object;
            _x2 = keys.slice(1);
            _x3 = defaultVal;
            _again = true;
            continue _function;
        }
        return object === undefined ? defaultVal : object;
    }
}

function set(_x4, _x5, _x6) {
    var _again2 = true;

    _function2: while (_again2) {
        var object = _x4,
            keys = _x5,
            val = _x6;
        _again2 = false;

        keys = Array.isArray(keys) ? keys : keys.split('.');
        if (keys.length > 1) {
            object[keys[0]] = object[keys[0]] || {};
            _x4 = object[keys[0]];
            _x5 = keys.slice(1);
            _x6 = val;
            _again2 = true;
            continue _function2;
        }
        object[keys[0]] = val;
    }
}

exports['default'] = {
    get: get,
    set: set
};