'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateUFPAction = exports.isUFPAction = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _UfpRequestActions = require('./UfpRequestActions');

var _UfpRequestActions2 = _interopRequireDefault(_UfpRequestActions);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UfpMiddlewareUtils = require('./UfpMiddlewareUtils');

var _UfpMiddlewareUtils2 = _interopRequireDefault(_UfpMiddlewareUtils);

var _UfpMiddlewareConstants = require('./UfpMiddlewareConstants');

var _UfpMiddlewareConstants2 = _interopRequireDefault(_UfpMiddlewareConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UFPTypes = _propTypes2.default.shape({
    END: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,
    FAILURE: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,
    REQUEST: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,
    SUCCESS: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired
}).isRequired;
var UFPActionPropTypes = (0, _defineProperty3.default)({}, _UfpRequestActions2.default.UFP_REQUEST_ACTION, _propTypes2.default.shape({
    ufpDefinition: _propTypes2.default.shape({
        url: _propTypes2.default.string.isRequired,
        method: _propTypes2.default.oneOf([_UfpMiddlewareConstants2.default.RequestMethodConstants.GET, _UfpMiddlewareConstants2.default.RequestMethodConstants.POST, _UfpMiddlewareConstants2.default.RequestMethodConstants.DELETE, _UfpMiddlewareConstants2.default.RequestMethodConstants.PATCH, _UfpMiddlewareConstants2.default.RequestMethodConstants.PUT]).isRequired,
        requestType: _propTypes2.default.string,
        actionConstants: _propTypes2.default.object
    }).isRequired,
    ufpData: _propTypes2.default.shape({
        urlParams: _propTypes2.default.object,
        queryParams: _propTypes2.default.object,
        body: _propTypes2.default.any
    }).isRequired,
    ufpTypes: _propTypes2.default.object,
    ufpPayload: _propTypes2.default.object,
    // ufpActionCreators: PropTypes.object,
    ufpResultHandler: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        matcher: _propTypes2.default.func.isRequired,
        handler: _propTypes2.default.func.isRequired
    })).isRequired,
    ufpPreHandler: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        matcher: _propTypes2.default.func.isRequired,
        handler: _propTypes2.default.func.isRequired
    })).isRequired
}));
var UFPTypesPropTypes = (0, _defineProperty3.default)({}, _UfpRequestActions2.default.UFP_REQUEST_ACTION, _propTypes2.default.oneOfType([_propTypes2.default.shape({
    ufpTypes: UFPTypes
}), _propTypes2.default.shape({
    ufpDefinition: _propTypes2.default.shape({
        actionConstants: UFPTypes
    })
})]));

var isUFPAction = function isUFPAction(action) {
    return (typeof action === 'undefined' ? 'undefined' : (0, _typeof3.default)(action)) === 'object' && action.hasOwnProperty(_UfpRequestActions2.default.UFP_REQUEST_ACTION);
};

/**
 * Checks an action against the RSAA definition, returning a (possibly empty)
 * array of validation errors.
 *
 * @function validateRSAA
 * @access public
 * @param {object} action - The action to check against the RSAA definition
 * @returns {array}
 */
var validateUFPAction = function validateUFPAction(action) {
    try {
        _UfpMiddlewareUtils2.default.ReactPropTypesCheck(action, UFPActionPropTypes, true);
    } catch (e) {
        //  console.error('Validation returned check ', action)
        //  console.error('Validation returned check ', action[UfpRequestActions.UFP_REQUEST_ACTION])
        //  console.error('Validation returned check ', action[UfpRequestActions.UFP_REQUEST_ACTION]['ufpTypes'])
        // console.error('Validation returned ', e)
        //  console.error('--->' + e + '<--')
        return [e];
    }
    try {
        _UfpMiddlewareUtils2.default.ReactPropTypesCheck(action, UFPTypesPropTypes, true);
    } catch (e) {
        //console.error('Validation returned check ', e.message)
        var err = new Error('Failed prop type: The prop `UFPREQUESTACTION.ufpTypes` or ' + '`UFPREQUESTACTION.ufpDefinition.actionConstants` need to be defined');
        return [err];
    }
    return [];
};

exports.isUFPAction = isUFPAction;
exports.validateUFPAction = validateUFPAction;