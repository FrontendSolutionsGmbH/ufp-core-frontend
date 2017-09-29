'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEpic = exports.EpicRunfest = exports.Runfest = undefined;

var _Runfest2 = require('./Runfest');

var _Runfest3 = _interopRequireDefault(_Runfest2);

var _ConfigureEpicsInternal = require('./ConfigureEpicsInternal');

var _ConfigureEpicsInternal2 = _interopRequireDefault(_ConfigureEpicsInternal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Runfest = exports.Runfest = _Runfest3.default;
var EpicRunfest = exports.EpicRunfest = _Runfest3.default;

var registerEpic = exports.registerEpic = _ConfigureEpicsInternal2.default.registerEpic;