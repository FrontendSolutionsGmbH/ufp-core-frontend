'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerStagedResource = exports.StartupRunfest = exports.Runfest = undefined;

var _Runfest2 = require('./Runfest');

var _Runfest3 = _interopRequireDefault(_Runfest2);

var _StartupConfiguration2 = require('./StartupConfiguration');

var _StartupConfiguration3 = _interopRequireDefault(_StartupConfiguration2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Runfest = exports.Runfest = _Runfest3.default;
var StartupRunfest = exports.StartupRunfest = _Runfest3.default;
var registerStagedResource = exports.registerStagedResource = _StartupConfiguration3.default.registerStagedResource;