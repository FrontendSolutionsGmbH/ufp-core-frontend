'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

(0, _tape2['default'])('Assert object values', function (t) {
  t.plan(2);
  t.equal(_index2['default'].name, 'ES6 Starter Kit');
  t.equal(_index2['default'].version, '1.0');
});