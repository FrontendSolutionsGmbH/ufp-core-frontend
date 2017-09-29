'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reduxForm = require('redux-form');

var Runfest = {
    name: 'ufp-redux-form',
    description: 'Ufp Redux Form Wrapper',

    onRegistered: function onRegistered(_ref) {
        var UfpCore = _ref.UfpCore;

        UfpCore.registerReducer({
            id: 'form',
            reducer: _reduxForm.reducer
        });
    }
}; /**
    * the runfest.js defines the properties of the ufp-module and serves as RUNtimemaniFEST
    * @type {{name: string}}
    */
exports.default = Runfest;