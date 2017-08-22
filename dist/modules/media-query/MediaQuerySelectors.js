'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobileSelector = exports.MediaQueryState = undefined;

var _MediaQueryConstants = require('./MediaQueryConstants');

var _MediaQueryConstants2 = _interopRequireDefault(_MediaQueryConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaQueryState = exports.MediaQueryState = function MediaQueryState(state) {
  return state[_MediaQueryConstants2.default.reducerName];
};

var isMobileSelector = exports.isMobileSelector = function isMobileSelector(state) {
  return MediaQueryState(state).screenSize.isMobile;
};

exports.default = {
  isMobileSelector: isMobileSelector
};