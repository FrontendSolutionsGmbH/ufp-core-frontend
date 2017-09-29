'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MenuActionCreators = require('./MenuActionCreators');

var _MenuActionCreators2 = _interopRequireDefault(_MenuActionCreators);

var _MenuSelectors = require('./MenuSelectors');

var _MenuSelectors2 = _interopRequireDefault(_MenuSelectors);

var _MenuReducer = require('./MenuReducer');

var _MenuReducer2 = _interopRequireDefault(_MenuReducer);

var _epic = require('../epic');

var _MenuConstants = require('./MenuConstants');

var _MenuConstants2 = _interopRequireDefault(_MenuConstants);

var _JSUtils = require('../../utils/JSUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * the runfest.js defines the properties of the ufp-module RUNtimemaniFEST
 * @type {{name: string}}
 */
var Runfest = {
    name: _MenuConstants2.default.NAME,
    description: 'Ufp Menu - provides menu management functionality',
    actionCreators: _MenuActionCreators2.default,
    selectors: _MenuSelectors2.default,

    onRegistered: function onRegistered(_ref) {
        var _ref$UfpCore = _ref.UfpCore,
            UfpCore = _ref$UfpCore === undefined ? (0, _JSUtils.ThrowParam)('UfpCore Instance Required') : _ref$UfpCore;

        UfpCore.registerRunfest(_epic.EpicRunfest);

        UfpCore.registerReducer({
            id: _MenuConstants2.default.NAME,
            reducer: _MenuReducer2.default
        });
    }
};

exports.default = Runfest;