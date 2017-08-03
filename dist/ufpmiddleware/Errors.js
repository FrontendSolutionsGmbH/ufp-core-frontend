/**
 * Error class for an UFPAction that does not conform to the UFPAction definition
 *
 * @class InvalidUFPAction
 * @access public
 * @param {array} validationErrors - an array of validation errors
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidUFPAction = (function (_Error) {
    _inherits(InvalidUFPAction, _Error);

    function InvalidUFPAction(validationErrors) {
        _classCallCheck(this, InvalidUFPAction);

        _get(Object.getPrototypeOf(InvalidUFPAction.prototype), 'constructor', this).call(this);
        this.name = 'InvalidUFPAction';
        this.message = 'Invalid UFPAction';
        this.validationErrors = validationErrors;
    }

    /**
     * Error class for a custom `payload` or `meta` function throwing
     *
     * @class InternalError
     * @access public
     * @param {string} message - the error message
     */
    return InvalidUFPAction;
})(Error);

var InternalError = (function (_Error2) {
    _inherits(InternalError, _Error2);

    function InternalError(message) {
        _classCallCheck(this, InternalError);

        _get(Object.getPrototypeOf(InternalError.prototype), 'constructor', this).call(this);
        this.name = 'InternalError';
        this.message = message;
    }

    /**
     * Error class for an error raised trying to make an API call
     *
     * @class RequestError
     * @access public
     * @param {string} message - the error message
     */
    return InternalError;
})(Error);

var RequestError = (function (_Error3) {
    _inherits(RequestError, _Error3);

    function RequestError(message) {
        _classCallCheck(this, RequestError);

        _get(Object.getPrototypeOf(RequestError.prototype), 'constructor', this).call(this);
        this.name = 'RequestError';
        this.message = message;
    }

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
    return RequestError;
})(Error);

var ApiError = (function (_Error4) {
    _inherits(ApiError, _Error4);

    function ApiError(status, statusText, response) {
        _classCallCheck(this, ApiError);

        _get(Object.getPrototypeOf(ApiError.prototype), 'constructor', this).call(this);
        this.name = 'ApiError';
        this.status = status;
        this.statusText = statusText;
        this.response = response;
        this.message = status + ' - ' + statusText;
    }

    return ApiError;
})(Error);

var ResultParserError = (function (_Error5) {
    _inherits(ResultParserError, _Error5);

    function ResultParserError(message) {
        _classCallCheck(this, ResultParserError);

        _get(Object.getPrototypeOf(ResultParserError.prototype), 'constructor', this).call(this);
        this.name = 'ResultParserError';
        this.message = message;
    }

    return ResultParserError;
})(Error);

exports.InvalidUFPAction = InvalidUFPAction;
exports.InternalError = InternalError;
exports.RequestError = RequestError;
exports.ApiError = ApiError;
exports.ResultParserError = ResultParserError;
exports['default'] = { InvalidUFPAction: InvalidUFPAction, InternalError: InternalError, RequestError: RequestError, ApiError: ApiError, ResultParserError: ResultParserError };