'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AuthActionHandlers = require('./AuthActionHandlers');

var _AuthActionHandlers2 = _interopRequireDefault(_AuthActionHandlers);

var _ufpCore = require('ufp-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = {
  authtoken: window.localStorage.getItem('authtoken')
};

exports.default = _ufpCore.UFPUtils.ReduxUtils.createReducer(initialState, _AuthActionHandlers2.default);