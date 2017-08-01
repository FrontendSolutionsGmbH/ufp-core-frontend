'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _UfpMiddleware = require('./UfpMiddleware');

var _UfpMiddleware2 = _interopRequireDefault(_UfpMiddleware);

var _modulesUfpmiddlewareUfpHandlerUtils = require('modules/ufpmiddleware/UfpHandlerUtils');

var _UfpMiddlewareActionCreator = require('./UfpMiddlewareActionCreator');

var _UfpMiddlewareActionCreator2 = _interopRequireDefault(_UfpMiddlewareActionCreator);

var createActionCreatorForDefinition = _UfpMiddlewareActionCreator2['default'].createActionCreatorForDefinition;
exports.createActionCreatorForDefinition = createActionCreatorForDefinition;
var createUFPMiddleware = _UfpMiddleware2['default'];
exports.createUFPMiddleware = createUFPMiddleware;
var ResultHandlerResult = _modulesUfpmiddlewareUfpHandlerUtils.ResultHandlerResult;
exports.ResultHandlerResult = ResultHandlerResult;
var PreHandlerResult = _modulesUfpmiddlewareUfpHandlerUtils.PreHandlerResult;
exports.PreHandlerResult = PreHandlerResult;
var RequestMethodConstants = {
  POST: 'post',
  DELETE: 'delete',
  GET: 'get',
  PATCH: 'patch'
};

exports.RequestMethodConstants = RequestMethodConstants;
exports['default'] = createUFPMiddleware;