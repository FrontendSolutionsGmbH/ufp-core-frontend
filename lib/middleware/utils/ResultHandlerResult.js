"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResultHandlerResult = function ResultHandlerResult() {
    var success = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _this = this;

    var handled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var retry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    (0, _classCallCheck3.default)(this, ResultHandlerResult);

    this.addPayload = function (data) {
        _this.additionalPayload = data;
        return _this;
    };

    this.success = success;
    this.handled = handled;
    this.retry = retry;
};

exports.default = ResultHandlerResult;