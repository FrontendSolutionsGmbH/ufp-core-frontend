'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _UfpMiddlewareHelperUtils = require('../UfpMiddlewareHelperUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createAxiosLikeErrorResponse = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config, code, response) {
        var err;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        err = new Error('Request failed with status code ' + response.status);

                        err.config = config;
                        if (code) {
                            err.code = code;
                        }
                        err.response = response;
                        _context.next = 6;
                        return (0, _UfpMiddlewareHelperUtils.getJSON)(response);

                    case 6:
                        err.response.data = _context.sent;
                        return _context.abrupt('return', err);

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createAxiosLikeErrorResponse(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var FetchRequest = {

    ufpMiddlewareRequest: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(config) {
            var requestResponse, isResolve, responseClone, result;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)));

                            _context2.next = 3;
                            return fetch(config.fetchUrl, {
                                method: config.method,
                                body: config.data,
                                credentials: config.credentials,
                                headers: config.headers || {}
                            });

                        case 3:
                            requestResponse = _context2.sent;
                            isResolve = (0, _UfpMiddlewareHelperUtils.validateStatus)(requestResponse.status);

                            if (isResolve) {
                                _context2.next = 11;
                                break;
                            }

                            // in case of error retrieve content this way
                            responseClone = requestResponse.clone();
                            _context2.next = 9;
                            return createAxiosLikeErrorResponse(config, responseClone.status, responseClone);

                        case 9:
                            result = _context2.sent;
                            return _context2.abrupt('return', result);

                        case 11:
                            _context2.next = 13;
                            return (0, _UfpMiddlewareHelperUtils.getJSON)(requestResponse);

                        case 13:
                            requestResponse.data = _context2.sent;
                            return _context2.abrupt('return', requestResponse);

                        case 15:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function ufpMiddlewareRequest(_x4) {
            return _ref2.apply(this, arguments);
        };
    }()

};

exports.default = FetchRequest;