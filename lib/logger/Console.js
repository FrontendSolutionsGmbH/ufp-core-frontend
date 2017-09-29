'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var styleCenterText = ['background: linear-gradient(#D33106, #571402)', 'border: 1px solid #3E0E02', 'color: white', 'display: block', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset', 'line-height: 40px', 'text-align: center', 'font-weight: bold'].join(';');

exports.default = {

    log: function log(message) {
        var _console;

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
        }

        (_console = console).log.apply(_console, ['c%' + message, styleCenterText].concat(rest));
    },
    warn: function warn(message) {
        var _console2;

        for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            rest[_key2 - 1] = arguments[_key2];
        }

        (_console2 = console).warn.apply(_console2, ['c%' + message, styleCenterText].concat(rest));
    },
    error: function error(message) {
        var _console3;

        for (var _len3 = arguments.length, rest = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            rest[_key3 - 1] = arguments[_key3];
        }

        (_console3 = console).error.apply(_console3, ['c%' + message, styleCenterText].concat(rest));
    },
    info: function info(message) {
        var _console4;

        for (var _len4 = arguments.length, rest = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            rest[_key4 - 1] = arguments[_key4];
        }

        (_console4 = console).info.apply(_console4, ['c%' + message, styleCenterText].concat(rest));
    }
};