'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchMediaQuery = undefined;

var _MediaQueryConstants = require('./MediaQueryConstants');

var _MediaQueryConstants2 = _interopRequireDefault(_MediaQueryConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// // console.log('MediaQueryConstants ACTION CREATOR CONSTANTS ARE ', MediaQueryConstants)
var matchMediaQuery = exports.matchMediaQuery = function matchMediaQuery(name, match) {
  return {
    type: _MediaQueryConstants2.default.ActionConstants.MATCH_MEDIA,
    payload: {
      name: name,
      match: match
    }
  };
};

exports.default = {
  matchMediaQuery: matchMediaQuery
};