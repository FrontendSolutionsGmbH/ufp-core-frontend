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

var _UfpMiddlewareConfiguration = require('./UfpMiddlewareConfiguration');

var _UfpMiddlewareConfiguration2 = _interopRequireDefault(_UfpMiddlewareConfiguration);

var RequestMethodConstants = {
    POST: 'post',
    DELETE: 'delete',
    GET: 'get',
    PATCH: 'patch'
};

exports['default'] = {
    createUFPMiddleware: _UfpMiddleware2['default'],
    RequestMethodConstants: RequestMethodConstants,
    PreHandlerResult: _modulesUfpmiddlewareUfpHandlerUtils.PreHandlerResult,
    ResultHandlerResult: _modulesUfpmiddlewareUfpHandlerUtils.ResultHandlerResult,
    createActionCreatorForDefinition: _UfpMiddlewareActionCreator2['default'].createActionCreatorForDefinition,
    registerResultHandler: _UfpMiddlewareConfiguration2['default'].registerResultHandler,
    registerUnhandledHandler: _UfpMiddlewareConfiguration2['default'].registerUnhandledHandler,
    setCreateConfig: _UfpMiddlewareConfiguration2['default'].setCreateConfig
};
module.exports = exports['default'];