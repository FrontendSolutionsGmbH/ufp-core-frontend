'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UfpCoreActionCreators = require('./UfpCoreActionCreators');

var _UfpCoreActionCreators2 = _interopRequireDefault(_UfpCoreActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Runfest = {
  name: 'Ufp Base',
  description: 'Ufp Base',
  actionCreators: _UfpCoreActionCreators2.default

}; /**
    * the manifest.js defines the properties of the ufp-module
    * @type {{name: string}}
    */
exports.default = Runfest;