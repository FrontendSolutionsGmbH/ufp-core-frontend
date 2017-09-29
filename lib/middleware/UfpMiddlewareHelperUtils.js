'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSON = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _checkPropTypes = require('check-prop-types');

var _checkPropTypes2 = _interopRequireDefault(_checkPropTypes);

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
var getJSON = exports.getJSON = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(res) {
    var contentType, emptyCodes;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contentType = res.headers.get('Content-Type');
            emptyCodes = [204, 205];

            if (!(!~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json'))) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.json());

          case 6:
            return _context.abrupt('return', Promise.resolve({}));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getJSON(_x) {
    return _ref.apply(this, arguments);
  };
}();

function isEmptyObject(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
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
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (t) {
    return t;
  };

  return arr.reduce(function (acc, curr) {
    return (0, _deepmerge2.default)(acc, selector(curr) || {});
  }, {});
};
var createAxiosLikeErrorResponse = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(config, code, response) {
    var err;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = new Error('Request failed with status code ' + response.status);

            err.config = config;
            if (code) {
              err.code = code;
            }
            err.response = response;
            _context2.next = 6;
            return getJSON(response);

          case 6:
            err.response.data = _context2.sent;
            return _context2.abrupt('return', err);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function createAxiosLikeErrorResponse(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

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