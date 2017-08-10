'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ufpmiddlewareIndexJs = require('./ufpmiddleware/index.js');

var _ufpmiddlewareIndexJs2 = _interopRequireDefault(_ufpmiddlewareIndexJs);

var _utilsIndexJs = require('./utils/index.js');

var _utilsIndexJs2 = _interopRequireDefault(_utilsIndexJs);

var name = 'ufp core',
    version = '1.0';

var myObject = {
  name: name,
  version: version,
  UFPMiddleware: _ufpmiddlewareIndexJs2['default'],
  UFPUtils: _utilsIndexJs2['default']
};
var UFPUtils = _utilsIndexJs2['default'];
exports.UFPUtils = UFPUtils;
var UFPMiddleware = _ufpmiddlewareIndexJs2['default'];
exports.UFPMiddleware = UFPMiddleware;
exports['default'] = myObject;