"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResultHandlerResult = exports.ResultHandlerResult = function ResultHandlerResult() {
  var success = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var _this = this;

  var handled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var retry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  _classCallCheck(this, ResultHandlerResult);

  this.addPayload = function (data) {
    _this.additionalPayload = data;
    return _this;
  };

  this.success = success;
  this.handled = handled;
  this.retry = retry;
};

var PreHandlerResult = exports.PreHandlerResult = function PreHandlerResult() {
  var breakVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var handled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  _classCallCheck(this, PreHandlerResult);

  this.break = breakVal;
  this.handled = handled;
};