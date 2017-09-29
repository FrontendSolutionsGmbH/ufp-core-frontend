'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _JSUtils = require('../../utils/JSUtils');

var _ConfigureEpicsInternal = require('./ConfigureEpicsInternal');

var _ConfigureEpicsInternal2 = _interopRequireDefault(_ConfigureEpicsInternal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onceRegistered = false;

var Runfest = {
    name: 'ufp-redux-rxjs ',
    description: 'Ufp Redux RxJs Manifest',

    onRegistered: function onRegistered(_ref) {
        var _ref$UfpCore = _ref.UfpCore,
            UfpCore = _ref$UfpCore === undefined ? (0, _JSUtils.ThrowParam)('UfpCore Instance Required') : _ref$UfpCore;

        if (onceRegistered) {
            return;
        }
        onceRegistered = true;

        UfpCore.registerMiddlewareCreator({
            id: Runfest.name,
            middlewareCreatorFunction: _ConfigureEpicsInternal2.default.createEpicMiddleware
        });

        UfpCore.registerReducer({
            id: Runfest.name,
            reducer: function reducer() {
                var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ConfigureEpicsInternal2.default.getEpics();

                return state;
            }
        });
    }
};

exports.default = Runfest;