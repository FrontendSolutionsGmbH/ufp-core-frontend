'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Error class for an UFPAction that does not conform to the UFPAction definition
 *
 * @class InvalidUFPAction
 * @access public
 * @param {array} validationErrors - an array of validation errors
 */
var InvalidUFPAction = function (_Error) {
    _inherits(InvalidUFPAction, _Error);

    function InvalidUFPAction(validationErrors) {
        _classCallCheck(this, InvalidUFPAction);

        var _this = _possibleConstructorReturn(this, (InvalidUFPAction.__proto__ || Object.getPrototypeOf(InvalidUFPAction)).call(this));

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
    _inherits(UfpMiddlewareRequestCancelledError, _Error2);

    function UfpMiddlewareRequestCancelledError() {
        _classCallCheck(this, UfpMiddlewareRequestCancelledError);

        var _this2 = _possibleConstructorReturn(this, (UfpMiddlewareRequestCancelledError.__proto__ || Object.getPrototypeOf(UfpMiddlewareRequestCancelledError)).call(this));

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
    _inherits(UfpMiddlewareMaxRetryReachedError, _Error3);

    function UfpMiddlewareMaxRetryReachedError() {
        _classCallCheck(this, UfpMiddlewareMaxRetryReachedError);

        var _this3 = _possibleConstructorReturn(this, (UfpMiddlewareMaxRetryReachedError.__proto__ || Object.getPrototypeOf(UfpMiddlewareMaxRetryReachedError)).call(this));

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
    _inherits(UfpMiddlewareResulthandlerMoreThenOneSuccessError, _Error4);

    function UfpMiddlewareResulthandlerMoreThenOneSuccessError() {
        _classCallCheck(this, UfpMiddlewareResulthandlerMoreThenOneSuccessError);

        var _this4 = _possibleConstructorReturn(this, (UfpMiddlewareResulthandlerMoreThenOneSuccessError.__proto__ || Object.getPrototypeOf(UfpMiddlewareResulthandlerMoreThenOneSuccessError)).call(this));

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
    _inherits(InternalError, _Error5);

    function InternalError(message) {
        _classCallCheck(this, InternalError);

        var _this5 = _possibleConstructorReturn(this, (InternalError.__proto__ || Object.getPrototypeOf(InternalError)).call(this));

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
    _inherits(RequestError, _Error6);

    function RequestError(message) {
        _classCallCheck(this, RequestError);

        var _this6 = _possibleConstructorReturn(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).call(this));

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
    _inherits(ApiError, _Error7);

    function ApiError(status, statusText, response) {
        _classCallCheck(this, ApiError);

        var _this7 = _possibleConstructorReturn(this, (ApiError.__proto__ || Object.getPrototypeOf(ApiError)).call(this));

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
    _inherits(ResultParserError, _Error8);

    function ResultParserError(message) {
        _classCallCheck(this, ResultParserError);

        var _this8 = _possibleConstructorReturn(this, (ResultParserError.__proto__ || Object.getPrototypeOf(ResultParserError)).call(this));

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
exports.default = { InvalidUFPAction: InvalidUFPAction, UfpMiddlewareRequestCancelledError: UfpMiddlewareRequestCancelledError, UfpMiddlewareMaxRetryReachedError: UfpMiddlewareMaxRetryReachedError, UfpMiddlewareResulthandlerMoreThenOneSuccessError: UfpMiddlewareResulthandlerMoreThenOneSuccessError, InternalError: InternalError, RequestError: RequestError, ApiError: ApiError, ResultParserError: ResultParserError };