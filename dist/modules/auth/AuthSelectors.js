'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticatedSelector = exports.AuthState = undefined;

var _AuthConstants = require('./AuthConstants');

var _AuthConstants2 = _interopRequireDefault(_AuthConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthState = exports.AuthState = function AuthState(state) {
  return state[_AuthConstants2.default.reducerName];
};

var isAuthenticatedSelector = exports.isAuthenticatedSelector = function isAuthenticatedSelector(state) {
  return AuthState(state).authtoken !== 'undefined';
};

exports.default = {
  isAuthenticatedSelector: isAuthenticatedSelector
};