'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.checkLogin = exports.login = undefined;

var _AuthConstants = require('./AuthConstants');

var _AuthConstants2 = _interopRequireDefault(_AuthConstants);

var _AuthSelectors = require('./AuthSelectors');

var _AuthSelectors2 = _interopRequireDefault(_AuthSelectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = function login() {
  return function (dispatch, getState) {
    var r = confirm("For Login Success press ok");
    if (r == true) {
      dispatch({
        type: _AuthConstants2.default.ActionConstants.LOGIN_SUCCESS
      });
    } else {
      dispatch({
        type: _AuthConstants2.default.ActionConstants.LOGIN_FAILURE
      });
    }
  };
};

var checkLogin = exports.checkLogin = function checkLogin() {
  return function (dispatch, getState) {
    var isAuthenticated = _AuthSelectors2.default.isAuthenticatedSelector(getState());
    //console.log('isAuthenticated', isAuthenticated)
    if (isAuthenticated) {
      var r = confirm("For still loggedin?");
      if (r == true) {
        dispatch({
          type: _AuthConstants2.default.ActionConstants.CHECK_LOGIN
        });
      } else {
        dispatch(logout());
        dispatch({
          type: _AuthConstants2.default.ActionConstants.CHECK_LOGIN
        });
      }
    } else {
      dispatch({
        type: _AuthConstants2.default.ActionConstants.CHECK_LOGIN
      });
    }
  };
};

var logout = exports.logout = function logout() {
  return {
    type: _AuthConstants2.default.ActionConstants.LOGOUT
  };
};

exports.default = {
  login: login,
  logout: logout,
  checkLogin: checkLogin
};