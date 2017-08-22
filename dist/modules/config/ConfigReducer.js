'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _ConfigActionHandlers = require('./ConfigActionHandlers');

var _ConfigActionHandlers2 = _interopRequireDefault(_ConfigActionHandlers);

var _ufpCore = require('ufp-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = {
   data: {}
};

exports.default = _ufpCore.UFPUtils.ReduxUtils.createReducer(initialState, _ConfigActionHandlers2.default);