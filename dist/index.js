'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ufpmiddleware = require('./ufpmiddleware');

var _ufpmiddleware2 = _interopRequireDefault(_ufpmiddleware);

var name = 'ufp core',
    version = '1.0';

var myObject = {
  name: name,
  version: version,
  UFPMiddleware: _ufpmiddleware2['default']
};

var UFPMiddleware = _ufpmiddleware2['default'];
exports.UFPMiddleware = UFPMiddleware;
exports['default'] = myObject;