'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

require('rxjs/add/observable/of');

require('rxjs/add/operator/mapTo');

require('rxjs/add/operator/takeUntil');

require('rxjs/add/operator/filter');

var _reduxObservable = require('redux-observable');

var _utilsJSUtilsJs = require('../utils/JSUtils.js');

var _utilsJSUtilsJs2 = _interopRequireDefault(_utilsJSUtilsJs);

/**
 * Singleton Epic Configuration, use this class to register epics
 */

var ConfigureEpics = (function () {
    function ConfigureEpics() {
        _classCallCheck(this, ConfigureEpics);

        this.epics = [];
    }

    _createClass(ConfigureEpics, [{
        key: 'registerEpic',
        value: function registerEpic() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? { epic: _utilsJSUtilsJs2['default'].ThrowParam('epic has to be provided') } : arguments[0];

            var _ref$epic = _ref.epic;
            var epic = _ref$epic === undefined ? _utilsJSUtilsJs2['default'].ThrowParam('epic has to be provided') : _ref$epic;

            //logger.debug('ConfigureEpics.registerEpic', epic)
            this.epics.push(epic);
        }
    }, {
        key: 'getEpics',
        value: function getEpics() {
            //logger.debug('ConfigureEpics.getEpics', this)
            return this.epics;
        }
    }, {
        key: 'createEpicMiddleware',
        value: function createEpicMiddleware() {
            return (0, _reduxObservable.createEpicMiddleware)(_reduxObservable.combineEpics.apply(undefined, _toConsumableArray(this.getEpics())));
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.epics = [];
        }
    }]);

    return ConfigureEpics;
})();

exports['default'] = new ConfigureEpics();
//same instance everytime
module.exports = exports['default'];