'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _ApiDefinition = require('api/ApiDefinition');

var _ApiDefinition2 = _interopRequireDefault(_ApiDefinition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _defineProperty3.default)({}, _ApiDefinition2.default.getGlobals.actionConstants.SUCCESS, function (state, action) {
    //console.log('response', action.payload)
    return (0, _reactAddonsUpdate2.default)(state, {
        data: { $set: action.payload.data.result }
    });
});