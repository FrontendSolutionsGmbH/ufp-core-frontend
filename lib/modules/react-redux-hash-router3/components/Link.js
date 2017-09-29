'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Link = require('react-router/lib/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * wrapper class for containing the required router imports for a specific
 * router inside the bundle, with the goal to have the least update problems
 * as possible
 *
 */

exports.default = _Link2.default;