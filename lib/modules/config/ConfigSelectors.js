'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _JSUtils = require('../../utils/JSUtils');

var _ConfigConstants = require('./ConfigConstants');

var _ConfigConstants2 = _interopRequireDefault(_ConfigConstants);

var _UfpCoreSelectors = require('../../core/UfpCoreSelectors');

var _UfpCoreSelectors2 = _interopRequireDefault(_UfpCoreSelectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getReducerState = function getReducerState(state) {
    return _UfpCoreSelectors2.default.getUfpState(state)[_ConfigConstants2.default.NAME];
};

exports.default = {
    getConfigValue: function getConfigValue(globalState, _ref) {
        var _ref$key = _ref.key,
            key = _ref$key === undefined ? (0, _JSUtils.ThrowParam)('Config Key has to be set') : _ref$key,
            _ref$area = _ref.area,
            area = _ref$area === undefined ? _ConfigConstants2.default.DEFAULT_AREA : _ref$area;

        // console.log('Retrieving config value', globalState, area, key)
        var state = getReducerState(globalState).data;
        // console.log('Retrieving config value', state, area, key)
        return state && state[area] ? state[area][key] : undefined;
    }
};