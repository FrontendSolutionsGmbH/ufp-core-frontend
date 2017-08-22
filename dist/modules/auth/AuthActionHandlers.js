'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _AuthConstants$Action;

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _AuthConstants = require('./AuthConstants');

var _AuthConstants2 = _interopRequireDefault(_AuthConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_AuthConstants$Action = {}, (0, _defineProperty3.default)(_AuthConstants$Action, _AuthConstants2.default.ActionConstants.LOGIN_SUCCESS, function (state, action) {

  window.localStorage.setItem('authtoken', 'sometoken');
  return (0, _reactAddonsUpdate2.default)(state, {
    authtoken: { $set: 'sometoken' }
  });
}), (0, _defineProperty3.default)(_AuthConstants$Action, _AuthConstants2.default.ActionConstants.LOGOUT, function (state, action) {
  window.localStorage.setItem('authtoken', undefined);
  return (0, _reactAddonsUpdate2.default)(state, {
    authtoken: { $set: 'undefined' }
  });
}), _AuthConstants$Action);