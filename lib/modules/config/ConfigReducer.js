'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConfigActionHandlers = require('./ConfigActionHandlers');

var _ConfigActionHandlers2 = _interopRequireDefault(_ConfigActionHandlers);

var _ReduxUtils = require('../../utils/ReduxUtils');

var _ReduxUtils2 = _interopRequireDefault(_ReduxUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (initialState) {
  return _ReduxUtils2.default.createReducer(initialState, _ConfigActionHandlers2.default);
};