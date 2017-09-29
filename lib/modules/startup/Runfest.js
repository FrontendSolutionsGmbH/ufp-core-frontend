'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _StartupActionCreators = require('./StartupActionCreators');

var _StartupActionCreators2 = _interopRequireDefault(_StartupActionCreators);

var _StartupSelectors = require('./StartupSelectors');

var _StartupSelectors2 = _interopRequireDefault(_StartupSelectors);

var _StartupConfiguration = require('./StartupConfiguration');

var _StartupConfiguration2 = _interopRequireDefault(_StartupConfiguration);

var _StartupConstants = require('./StartupConstants');

var _StartupConstants2 = _interopRequireDefault(_StartupConstants);

var _StartupReducer = require('./StartupReducer');

var _StartupReducer2 = _interopRequireDefault(_StartupReducer);

var _JSUtils = require('../../utils/JSUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
var onceRegistered = false;

var Runfest = {
    name: _StartupConstants2.default.NAME,
    description: 'Ufp Startup - manages sequentially execution of actions for initialisation',
    actionCreators: _StartupActionCreators2.default,
    selectors: _StartupSelectors2.default,

    onRegistered: function onRegistered(_ref) {
        var _ref$UfpCore = _ref.UfpCore,
            UfpCore = _ref$UfpCore === undefined ? (0, _JSUtils.ThrowParam)('UfpCore Instance Required') : _ref$UfpCore;

        if (onceRegistered) {
            // TBD: TODO: manage multi onregister calls in core
            return;
        }
        onceRegistered = true;

        UfpCore.registerReducer({
            id: _StartupConstants2.default.NAME,
            reducer: _StartupReducer2.default
        });
        // register epics for us
        _StartupConfiguration2.default.init();
    }
};

exports.default = Runfest;