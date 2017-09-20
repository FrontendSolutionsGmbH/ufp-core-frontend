'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ConfigConstants = require('./ConfigConstants');

var _ConfigConstants2 = _interopRequireDefault(_ConfigConstants);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _defineProperty3.default)({}, _ConfigConstants2.default.ACTION_NAMES.SET_CONFIG_VALUE, function (state, action) {
    console.log('Config Reducer Setting config value', action.payload);

    //initialise main data container
    if (state.data === undefined) {
        state = (0, _reactAddonsUpdate2.default)(state, {
            data: { $set: {} }
        });
    }
    //initialise area data container
    if (state.data[action.payload.area] === undefined) {
        state = (0, _reactAddonsUpdate2.default)(state, {
            data: (0, _defineProperty3.default)({}, action.payload.area, { $set: {} })
        });
    }

    // and set final value
    return (0, _reactAddonsUpdate2.default)(state, {
        data: (0, _defineProperty3.default)({}, action.payload.area, (0, _defineProperty3.default)({}, action.payload.key, { $set: action.payload.value }))
    });
});