'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getJSON = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _checkPropTypes = require('check-prop-types');

var _checkPropTypes2 = _interopRequireDefault(_checkPropTypes);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ReactPropTypesCheck(object, propTypes, _throw) {
    // const stringJSON = JSON.stringify(object)
    var errorString = (0, _checkPropTypes2.default)(propTypes, object, 'prop');
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
var getJSON = exports.getJSON = async function getJSON(res) {
    var contentType = res.headers.get('Content-Type');
    var emptyCodes = [204, 205];

    if (!~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json')) {
        return res.json();
    } else {
        return _promise2.default.resolve({});
    }
};

function isEmptyObject(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
    return (0, _stringify2.default)(obj) === (0, _stringify2.default)({});
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
    keys = (0, _keys2.default)(err);
    for (var i = 0; i < keys.length; i++) {
        if (err[keys[i]] instanceof Response) {
            out[keys[i]] = err[keys[i]];
        } else {
            out[keys[i]] = JSON.parse((0, _stringify2.default)(err[keys[i]]));
        }
    }
    return out;
}

function validateStatus(status) {
    return status >= 200 && status < 300;
}

var mergeArrayOfObjects = function mergeArrayOfObjects(arr) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (t) {
        return t;
    };

    return arr.reduce(function (acc, curr) {
        return (0, _deepmerge2.default)(acc, selector(curr) || {});
    }, {});
};
var createAxiosLikeErrorResponse = async function createAxiosLikeErrorResponse(config, code, response) {
    var err = new Error('Request failed with status code ' + response.status);
    err.config = config;
    if (code) {
        err.code = code;
    }
    err.response = response;
    err.response.data = await getJSON(response);
    return err;
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

exports.default = {
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