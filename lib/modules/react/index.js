'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appCreatorFunction = exports.registerRootProvider = exports.registerRootSibbling = exports.ReactRunfest = exports.Runfest = undefined;

var _Runfest2 = require('./Runfest');

var _Runfest3 = _interopRequireDefault(_Runfest2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Runfest = exports.Runfest = _Runfest3.default;
var ReactRunfest = exports.ReactRunfest = _Runfest3.default;

var registerRootSibbling = exports.registerRootSibbling = _Runfest3.default.registerRootSibbling;
var registerRootProvider = exports.registerRootProvider = _Runfest3.default.registerProvider;
var appCreatorFunction = exports.appCreatorFunction = _Runfest3.default.register;