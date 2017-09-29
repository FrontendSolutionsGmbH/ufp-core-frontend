'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setConfigValue = exports.getConfigValue = exports.ConfigRunfest = exports.Runfest = exports.registerConfigDefault = undefined;

var _Runfest2 = require('./Runfest');

var _Runfest3 = _interopRequireDefault(_Runfest2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registerConfigDefault = exports.registerConfigDefault = _Runfest3.default.registerConfigDefault;
var Runfest = exports.Runfest = _Runfest3.default;
var ConfigRunfest = exports.ConfigRunfest = _Runfest3.default;
var getConfigValue = exports.getConfigValue = _Runfest3.default.selectors.getConfigValue;
var setConfigValue = exports.setConfigValue = _Runfest3.default.actionCreators.setConfigValue;