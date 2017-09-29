'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _JSUtils = require('../../utils/JSUtils');

var _ConfigConstants = require('./ConfigConstants');

var _ConfigConstants2 = _interopRequireDefault(_ConfigConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import update from 'react-addons-update'
// import ApiDefinition from 'api/ApiDefinition'
exports.default = {

    setConfigValue: function setConfigValue(_ref) {
        var _ref$key = _ref.key,
            key = _ref$key === undefined ? (0, _JSUtils.ThrowParam)('Config Key has to be set') : _ref$key,
            _ref$value = _ref.value,
            value = _ref$value === undefined ? (0, _JSUtils.ThrowParam)('Config value has to be set') : _ref$value,
            _ref$area = _ref.area,
            area = _ref$area === undefined ? _ConfigConstants2.default.DEFAULT_AREA : _ref$area;

        return {
            type: _ConfigConstants2.default.ACTION_NAMES.SET_CONFIG_VALUE,
            payload: {
                key: key,
                value: value,
                area: area
            }
        };
    }

};