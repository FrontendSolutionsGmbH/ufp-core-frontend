'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReduxUtils = require('modules/utils/ReduxUtils');

var _ReduxUtils2 = _interopRequireDefault(_ReduxUtils);

var _MediaQueryActionHandlers = require('./MediaQueryActionHandlers');

var _MediaQueryActionHandlers2 = _interopRequireDefault(_MediaQueryActionHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = {
  screenSize: {
    isMobile: false
  }
};

exports.default = _ReduxUtils2.default.createReducer(initialState, _MediaQueryActionHandlers2.default);