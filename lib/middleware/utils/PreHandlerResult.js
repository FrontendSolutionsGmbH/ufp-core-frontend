"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PreHandlerResult = function PreHandlerResult() {
    var breakVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var handled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    (0, _classCallCheck3.default)(this, PreHandlerResult);

    this.break = breakVal;
    this.handled = handled;
};

exports.default = PreHandlerResult;