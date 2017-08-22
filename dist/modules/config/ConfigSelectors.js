'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigDataSelector = exports.ConfigState = undefined;

var _ConfigConstants = require('./ConfigConstants');

var _ConfigConstants2 = _interopRequireDefault(_ConfigConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigState = exports.ConfigState = function ConfigState(state) {
  return state[_ConfigConstants2.default.reducerName];
};
var ConfigDataSelector = exports.ConfigDataSelector = function ConfigDataSelector(state) {
  return ConfigState(state).data;
};

exports.default = {
  ConfigDataSelector: ConfigDataSelector
};