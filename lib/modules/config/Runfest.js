'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setConfigValueAction = undefined;

var _ConfigReducer = require('./ConfigReducer');

var _ConfigReducer2 = _interopRequireDefault(_ConfigReducer);

var _ConfigActionCreators = require('./ConfigActionCreators');

var _ConfigActionCreators2 = _interopRequireDefault(_ConfigActionCreators);

var _ConfigConstants = require('./ConfigConstants');

var _ConfigConstants2 = _interopRequireDefault(_ConfigConstants);

var _ConfigSelectors = require('./ConfigSelectors');

var _ConfigSelectors2 = _interopRequireDefault(_ConfigSelectors);

var _JSUtils = require('../../utils/JSUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setConfigValueAction = exports.setConfigValueAction = {
    name: 'SET_CONFIG_VALUE'
}; /**
    * the manifest.js defines the properties of the ufp-module
    * @type {{name: string}}
    */


var data = {};

var reducerCreatorFunction = function reducerCreatorFunction() {
    /**
     * create reducer here, containing all the assigned data in data variable
     */
    return (0, _ConfigReducer2.default)({ data: data });
};

var Runfest = {
    name: _ConfigConstants2.default.NAME,
    description: 'Ufp Config Reducer - property storage',
    actionCreators: _ConfigActionCreators2.default,
    selectors: _ConfigSelectors2.default,

    registerConfigDefault: function registerConfigDefault(initialState) {
        var area = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ConfigConstants2.default.DEFAULT_AREA;

        data[area] = Object.assign(data[area] || {}, initialState);
    },

    onRegistered: function onRegistered(_ref) {
        var _ref$UfpCore = _ref.UfpCore,
            UfpCore = _ref$UfpCore === undefined ? (0, _JSUtils.ThrowParam)('UfpCore Instance Required') : _ref$UfpCore;

        UfpCore.registerReducerCreator({
            id: Runfest.name,
            reducerCreatorFunction: reducerCreatorFunction
        });
    }
};

exports.default = Runfest;