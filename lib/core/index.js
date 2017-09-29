'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startupUfpCore = exports.registerRunfest = exports.registerEnhancerCreator = exports.registerMiddlewareCreator = exports.registerReducerCreator = exports.registerEnhancer = exports.registerMiddleware = exports.registerReducer = exports.registerInitialStateCallback = exports.UfpCore = undefined;

var _UfpCore2 = require('./UfpCore');

var _UfpCore3 = _interopRequireDefault(_UfpCore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UfpCore = exports.UfpCore = _UfpCore3.default;
var registerInitialStateCallback = exports.registerInitialStateCallback = _UfpCore3.default.registerInitialStateCallback;
var registerReducer = exports.registerReducer = _UfpCore3.default.registerReducer;
var registerMiddleware = exports.registerMiddleware = _UfpCore3.default.registerMiddleware;
var registerEnhancer = exports.registerEnhancer = _UfpCore3.default.registerEnhancer;
var registerReducerCreator = exports.registerReducerCreator = _UfpCore3.default.registerReducerCreator;
var registerMiddlewareCreator = exports.registerMiddlewareCreator = _UfpCore3.default.registerMiddlewareCreator;
var registerEnhancerCreator = exports.registerEnhancerCreator = _UfpCore3.default.registerEnhancerCreator;
var registerRunfest = exports.registerRunfest = _UfpCore3.default.registerRunfest;
var startupUfpCore = exports.startupUfpCore = _UfpCore3.default.startup;

// No default export! BECAUSE it creates hardwired dependency, cherrypick your methods