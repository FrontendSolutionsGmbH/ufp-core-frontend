'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRootReducer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeRootReducer = exports.makeRootReducer = function makeRootReducer(asyncReducers) {
  return (0, _redux.combineReducers)((0, _extends3.default)({}, asyncReducers));
};

exports.default = {
  makeRootReducer: makeRootReducer
};