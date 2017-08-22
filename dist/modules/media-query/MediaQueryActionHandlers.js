'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _MediaQueryConstants = require('./MediaQueryConstants');

var _MediaQueryConstants2 = _interopRequireDefault(_MediaQueryConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _defineProperty3.default)({}, _MediaQueryConstants2.default.ActionConstants.MATCH_MEDIA, function (state, action) {
  return (0, _reactAddonsUpdate2.default)(state, {
    screenSize: (0, _defineProperty3.default)({}, action.payload.name, { $set: action.payload.match })
  });
});