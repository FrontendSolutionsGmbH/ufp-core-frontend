'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

/**
 * Extract JSON body from a server response
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
        return context$1$0.abrupt('return', Promise.resolve());

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

function PropTypesCheck(data, propTypes) {
  try {
    ReactPropTypesCheck(data, propTypes, true);
    return true;
  } catch (e) {
    // console.error('Validation error', e)
    return false;
  }
}

var ReactPropTypesCheck = function ReactPropTypesCheck(object, propTypes, _throw) {

  // const stringJSON = JSON.stringify(object)
  var error = _propTypes2['default'].checkPropTypes(propTypes, object, 'prop');
  if (error) {
    if (_throw) {
      throw error;
    } else {
      console.error(error.message);
    }
  }
};

exports['default'] = {
  getJSON: getJSON,
  ReactPropTypesCheck: ReactPropTypesCheck,
  PropTypesCheck: PropTypesCheck
};
module.exports = exports['default'];