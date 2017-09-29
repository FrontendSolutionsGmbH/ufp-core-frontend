'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResultParserError = exports.ApiError = exports.RequestError = exports.InternalError = exports.UfpMiddlewareResulthandlerMoreThenOneSuccessError = exports.UfpMiddlewareMaxRetryReachedError = exports.UfpMiddlewareRequestCancelledError = exports.InvalidUFPAction = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Error class for an UFPAction that does not conform to the UFPAction definition
 *
 * @class InvalidUFPAction
 * @access public
 * @param {array} validationErrors - an array of validation errors
 */
var InvalidUFPAction = function (_Error) {
  (0, _inherits3.default)(InvalidUFPAction, _Error);

  function InvalidUFPAction(validationErrors) {
    (0, _classCallCheck3.default)(this, InvalidUFPAction);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InvalidUFPAction.__proto__ || Object.getPrototypeOf(InvalidUFPAction)).call(this));

    _this.name = 'InvalidUFPAction';
    _this.message = 'Invalid UFPAction';
    _this.validationErrors = validationErrors;
    return _this;
  }

  return InvalidUFPAction;
}(Error);

/**
 * Error class for an error resolved by action promise when Request cancelled by Prehandler
 *
 * @class UfpMiddlewareRequestCancelledError
 * @access public
 * @param {string} message - the error message
 */


var UfpMiddlewareRequestCancelledError = function (_Error2) {
  (0, _inherits3.default)(UfpMiddlewareRequestCancelledError, _Error2);

  function UfpMiddlewareRequestCancelledError() {
    (0, _classCallCheck3.default)(this, UfpMiddlewareRequestCancelledError);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (UfpMiddlewareRequestCancelledError.__proto__ || Object.getPrototypeOf(UfpMiddlewareRequestCancelledError)).call(this));

    _this2.name = 'UfpMiddlewareRequestCancelledError';
    _this2.message = 'UfpMiddlewareRequest Cancelled';
    return _this2;
  }

  return UfpMiddlewareRequestCancelledError;
}(Error);

/**
 * Error class for an error when max retry reached
 *
 * @class UfpMiddlewareMaxRetryReachedError
 * @access public
 */


var UfpMiddlewareMaxRetryReachedError = function (_Error3) {
  (0, _inherits3.default)(UfpMiddlewareMaxRetryReachedError, _Error3);

  function UfpMiddlewareMaxRetryReachedError() {
    (0, _classCallCheck3.default)(this, UfpMiddlewareMaxRetryReachedError);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (UfpMiddlewareMaxRetryReachedError.__proto__ || Object.getPrototypeOf(UfpMiddlewareMaxRetryReachedError)).call(this));

    _this3.name = 'UfpMiddlewareMaxRetryReachedError';
    _this3.message = 'UfpMiddleware reached the maxRetryCount';
    return _this3;
  }

  return UfpMiddlewareMaxRetryReachedError;
}(Error);

/**
 * Error class for an error when max retry reached
 *
 * @class UfpMiddlewareMaxRetryReachedError
 * @access public
 */


var UfpMiddlewareResulthandlerMoreThenOneSuccessError = function (_Error4) {
  (0, _inherits3.default)(UfpMiddlewareResulthandlerMoreThenOneSuccessError, _Error4);

  function UfpMiddlewareResulthandlerMoreThenOneSuccessError() {
    (0, _classCallCheck3.default)(this, UfpMiddlewareResulthandlerMoreThenOneSuccessError);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (UfpMiddlewareResulthandlerMoreThenOneSuccessError.__proto__ || Object.getPrototypeOf(UfpMiddlewareResulthandlerMoreThenOneSuccessError)).call(this));

    _this4.name = 'UfpMiddlewareResulthandlerMoreThenOneSuccessError';
    _this4.message = 'UfpMiddlewareResulthandlerMoreThenOneSuccessError';
    return _this4;
  }

  return UfpMiddlewareResulthandlerMoreThenOneSuccessError;
}(Error);
/**
 * Error class for a custom `payload` or `meta` function throwing
 *
 * @class InternalError
 * @access public
 * @param {string} message - the error message
 */


var InternalError = function (_Error5) {
  (0, _inherits3.default)(InternalError, _Error5);

  function InternalError(message) {
    (0, _classCallCheck3.default)(this, InternalError);

    var _this5 = (0, _possibleConstructorReturn3.default)(this, (InternalError.__proto__ || Object.getPrototypeOf(InternalError)).call(this));

    _this5.name = 'InternalError';
    _this5.message = message;
    return _this5;
  }

  return InternalError;
}(Error);

/**
 * Error class for an error raised trying to make an API call
 *
 * @class RequestError
 * @access public
 * @param {string} message - the error message
 */


var RequestError = function (_Error6) {
  (0, _inherits3.default)(RequestError, _Error6);

  function RequestError(message) {
    (0, _classCallCheck3.default)(this, RequestError);

    var _this6 = (0, _possibleConstructorReturn3.default)(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).call(this));

    _this6.name = 'RequestError';
    _this6.message = message;
    return _this6;
  }

  return RequestError;
}(Error);

/**
 * Error class for an API response outside the 200 range
 *
 * @class ApiError
 * @access public
 * @param {number} status - the status code of the API response
 * @param {string} statusText - the status text of the API response
 * @param {object} response - the parsed JSON response of the API server if the
 *  'Content-Type' header signals a JSON response
 */


var ApiError = function (_Error7) {
  (0, _inherits3.default)(ApiError, _Error7);

  function ApiError(status, statusText, response) {
    (0, _classCallCheck3.default)(this, ApiError);

    var _this7 = (0, _possibleConstructorReturn3.default)(this, (ApiError.__proto__ || Object.getPrototypeOf(ApiError)).call(this));

    _this7.name = 'ApiError';
    _this7.status = status;
    _this7.statusText = statusText;
    _this7.response = response;
    _this7.message = status + ' - ' + statusText;
    return _this7;
  }

  return ApiError;
}(Error);

var ResultParserError = function (_Error8) {
  (0, _inherits3.default)(ResultParserError, _Error8);

  function ResultParserError(message) {
    (0, _classCallCheck3.default)(this, ResultParserError);

    var _this8 = (0, _possibleConstructorReturn3.default)(this, (ResultParserError.__proto__ || Object.getPrototypeOf(ResultParserError)).call(this));

    _this8.name = 'ResultParserError';
    _this8.message = message;
    return _this8;
  }

  return ResultParserError;
}(Error);

exports.InvalidUFPAction = InvalidUFPAction;
exports.UfpMiddlewareRequestCancelledError = UfpMiddlewareRequestCancelledError;
exports.UfpMiddlewareMaxRetryReachedError = UfpMiddlewareMaxRetryReachedError;
exports.UfpMiddlewareResulthandlerMoreThenOneSuccessError = UfpMiddlewareResulthandlerMoreThenOneSuccessError;
exports.InternalError = InternalError;
exports.RequestError = RequestError;
exports.ApiError = ApiError;
exports.ResultParserError = ResultParserError;
exports.default = {
  InvalidUFPAction: InvalidUFPAction,
  UfpMiddlewareRequestCancelledError: UfpMiddlewareRequestCancelledError,
  UfpMiddlewareMaxRetryReachedError: UfpMiddlewareMaxRetryReachedError,
  UfpMiddlewareResulthandlerMoreThenOneSuccessError: UfpMiddlewareResulthandlerMoreThenOneSuccessError,
  InternalError: InternalError,
  RequestError: RequestError,
  ApiError: ApiError,
  ResultParserError: ResultParserError
};