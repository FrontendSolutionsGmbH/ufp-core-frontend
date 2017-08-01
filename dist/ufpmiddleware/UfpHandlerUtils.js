"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResultHandlerResult = function ResultHandlerResult() {
  var success = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var handled = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  var retry = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  _classCallCheck(this, ResultHandlerResult);

  this.success = success;
  this.handled = handled;
  this.retry = retry;
};

exports.ResultHandlerResult = ResultHandlerResult;

var PreHandlerResult = function PreHandlerResult() {
  var breakVal = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var handled = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  _classCallCheck(this, PreHandlerResult);

  this["break"] = breakVal;
  this.handled = handled;
};

exports.PreHandlerResult = PreHandlerResult;