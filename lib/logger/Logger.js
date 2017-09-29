'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var factorLogger = function factorLogger(name) {
  return {
    log: function log(message) {
      var _console;

      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      (_console = console).log.apply(_console, [name + ' ' + message].concat(params));
    }
  };
};

exports.default = {
  factorLogger: factorLogger

};