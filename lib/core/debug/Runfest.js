'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'Ufp Debug',
    description: 'Ufp Debug - redux logger...',
    onRegistered: function onRegistered(_ref) {
        var UfpCore = _ref.UfpCore;

        UfpCore.registerMiddleware({
            id: 'Redux-Logger',
            middleware: _reduxLogger2.default
        });
    }

}; /**
    * the manifest.js defines the properties of the ufp-module
    * @type {{name: string}}
    */