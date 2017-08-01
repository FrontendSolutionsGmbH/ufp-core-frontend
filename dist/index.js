'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel-polyfill');

var _ufpmiddlewareIndexJs = require('./ufpmiddleware/index.js');

var _ufpmiddlewareIndexJs2 = _interopRequireDefault(_ufpmiddlewareIndexJs);

var name = 'ufp core',
    version = '1.0';

var myObject = {
  name: name,
  version: version,
  UFPMiddleware: _ufpmiddlewareIndexJs2['default']
};

var UFPMiddleware = _ufpmiddlewareIndexJs2['default'];
exports.UFPMiddleware = UFPMiddleware;
exports['default'] = myObject;