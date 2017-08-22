'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enquire = require('enquire.js');

var _enquire2 = _interopRequireDefault(_enquire);

var _MediaQueryActionCreators = require('./MediaQueryActionCreators');

var _MediaQueryActionCreators2 = _interopRequireDefault(_MediaQueryActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaQueryRegistration = {
  register: function register(store) {
    _enquire2.default.register('screen and (max-width: 767px)', {

      // Match function is called when the query is true
      match: function match() {
        // dispatch match event
        store.dispatch(_MediaQueryActionCreators2.default.matchMediaQuery('isMobile', true));
      },
      // Unmatch function is called when media query is false
      unmatch: function unmatch() {
        // dispatch unmatch events
        store.dispatch(_MediaQueryActionCreators2.default.matchMediaQuery('isMobile', false));
      }
    });
  }
};

exports.default = MediaQueryRegistration;