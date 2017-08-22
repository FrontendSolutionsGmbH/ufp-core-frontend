'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

require('rxjs/add/observable/of');

require('rxjs/add/operator/mapTo');

require('rxjs/add/operator/takeUntil');

require('rxjs/add/operator/filter');

var _reduxObservable = require('redux-observable');

var _JSUtils = require('../utils/JSUtils.js');

var _JSUtils2 = _interopRequireDefault(_JSUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Singleton Epic Configuration, use this class to register epics
 */
var ConfigureEpics = function () {
    function ConfigureEpics() {
        (0, _classCallCheck3.default)(this, ConfigureEpics);
        this.epics = [];
    }

    (0, _createClass3.default)(ConfigureEpics, [{
        key: 'registerEpic',
        value: function registerEpic() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { epic: _JSUtils2.default.ThrowParam('epic has to be provided') },
                _ref$epic = _ref.epic,
                epic = _ref$epic === undefined ? _JSUtils2.default.ThrowParam('epic has to be provided') : _ref$epic;

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
            return (0, _reduxObservable.createEpicMiddleware)(_reduxObservable.combineEpics.apply(undefined, (0, _toConsumableArray3.default)(this.getEpics())));
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.epics = [];
        }
    }]);
    return ConfigureEpics;
}();

exports.default = new ConfigureEpics(); //same instance everytime