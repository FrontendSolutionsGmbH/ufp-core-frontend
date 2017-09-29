'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

require('rxjs/add/operator/mapTo');

require('rxjs/add/operator/count');

require('rxjs/add/operator/delay');

require('rxjs/add/operator/debounce');

require('rxjs/add/operator/map');

require('rxjs/add/operator/mergeMap');

require('rxjs/add/operator/takeUntil');

require('rxjs/add/operator/filter');

var _reduxObservable = require('redux-observable');

var _JSUtils = require('../../utils/JSUtils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Singleton Epic Configuration, use this class to register epics
 */

var epics = [];

var ConfigureEpicsInternal = {
    registerEpic: function registerEpic() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { epic: (0, _JSUtils.ThrowParam)('epic has to be provided') },
            _ref$epic = _ref.epic,
            epic = _ref$epic === undefined ? (0, _JSUtils.ThrowParam)('epic has to be provided') : _ref$epic;

        //logger.debug('ConfigureEpics.registerEpic', epic)
        epics.push(epic);
    },

    createEpicMiddleware: function createEpicMiddleware() {
        console.log('Creating Epic Middleware', epics);

        return (0, _reduxObservable.createEpicMiddleware)(_reduxObservable.combineEpics.apply(undefined, (0, _toConsumableArray3.default)(epics)));
    },

    reset: function reset() {
        epics = [];
    },

    getEpics: function getEpics() {
        return epics;
    }

};

exports.default = ConfigureEpicsInternal;