'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'Ufp Additions',
    description: 'Ufp Additions - logger and thunk are added as per default',
    onRegistered: function onRegistered(_ref) {
        var UfpCore = _ref.UfpCore;

        // add the thunk middlewares to the ufp core
        UfpCore.registerMiddleware({
            id: 'Redux-Thunk',
            middleware: _reduxThunk2.default
        });
    }

}; /**
    * the manifest.js defines the properties of the ufp-module
    * @type {{name: string}}
    */