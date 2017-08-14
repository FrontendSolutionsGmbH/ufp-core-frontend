'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _checkPropTypes = require('check-prop-types');

var _checkPropTypes2 = _interopRequireDefault(_checkPropTypes);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function ReactPropTypesCheck(object, propTypes, _throw) {
    // const stringJSON = JSON.stringify(object)
    var errorString = (0, _checkPropTypes2['default'])(propTypes, object, 'prop');
    if (errorString) {
        if (_throw) {
            throw new Error(errorString);
        } else {
            console.error(errorString);
        }
    }
}
function PropTypesCheck(data, propTypes) {
    try {
        ReactPropTypesCheck(data, propTypes, true);
        return true;
    } catch (e) {
        // console.error('Validation error', e)
        return false;
    }
}
/**
 * Extract JSON body from a server response made with fetch
 *
 * @function getJSON
 * @access public
 * @param {object} res - A raw response object
 * @returns {promise|undefined}
 */
var getJSON = function getJSON(res) {
    var contentType, emptyCodes;
    return regeneratorRuntime.async(function getJSON$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                contentType = res.headers.get('Content-Type');
                emptyCodes = [204, 205];

                if (!(! ~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json'))) {
                    context$1$0.next = 6;
                    break;
                }

                return context$1$0.abrupt('return', res.json());

            case 6:
                return context$1$0.abrupt('return', Promise.resolve({}));

            case 7:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
};

exports.getJSON = getJSON;
function isEmptyObject(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

function errorToObject(err) {
    if (!(err instanceof Error)) {
        throw new TypeError('invalid input argument. Must provide an error object. Value: `' + err + '`.');
    }
    var keys;
    var out = {};
    out.errorToObject = true;
    out.message = err.message;
    if (err.stack) {
        out.stack = err.stack;
    }
    // Possible Node.js (system error) properties...
    if (err.code) {
        out.code = err.code;
    }
    // Any enumerable properties...
    keys = Object.keys(err);
    for (var i = 0; i < keys.length; i++) {
        if (err[keys[i]] instanceof Response) {
            out[keys[i]] = err[keys[i]];
        } else {
            out[keys[i]] = JSON.parse(JSON.stringify(err[keys[i]]));
        }
    }
    return out;
}

function validateStatus(status) {
    return status >= 200 && status < 300;
}

var mergeArrayOfObjects = function mergeArrayOfObjects(arr) {
    var selector = arguments.length <= 1 || arguments[1] === undefined ? function (t) {
        return t;
    } : arguments[1];

    return arr.reduce(function (acc, curr) {
        return (0, _deepmerge2['default'])(acc, selector(curr) || {});
    }, {});
};
var createAxiosLikeErrorResponse = function createAxiosLikeErrorResponse(config, code, response) {
    var err;
    return regeneratorRuntime.async(function createAxiosLikeErrorResponse$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                err = new Error('Request failed with status code ' + response.status);

                err.config = config;
                if (code) {
                    err.code = code;
                }
                err.response = response;
                context$1$0.next = 6;
                return regeneratorRuntime.awrap(getJSON(response));

            case 6:
                err.response.data = context$1$0.sent;
                return context$1$0.abrupt('return', err);

            case 8:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
};

var addToArrayIfNotExist = function addToArrayIfNotExist(arr, item) {
    if (arr.indexOf(item) === -1) {
        arr.push(item);
    }
};

var createConfigDefault = function createConfigDefault(config) {
    config.headers = {
        'Content-Type': 'application/json'
    };
    return config;
};

function infoLogger() {
    console.log.apply(console, arguments);
}

exports['default'] = {
    ReactPropTypesCheck: ReactPropTypesCheck,
    PropTypesCheck: PropTypesCheck,
    getJSON: getJSON,
    isEmptyObject: isEmptyObject,
    errorToObject: errorToObject,
    validateStatus: validateStatus,
    mergeArrayOfObjects: mergeArrayOfObjects,
    createAxiosLikeErrorResponse: createAxiosLikeErrorResponse,
    addToArrayIfNotExist: addToArrayIfNotExist,
    createConfigDefault: createConfigDefault,
    infoLogger: infoLogger
};