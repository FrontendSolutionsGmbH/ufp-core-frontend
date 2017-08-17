'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _epicConfigureEpics = require('../epic/ConfigureEpics');

var _epicConfigureEpics2 = _interopRequireDefault(_epicConfigureEpics);

var _StartupEpic = require('./StartupEpic');

var _StartupEpic2 = _interopRequireDefault(_StartupEpic);

var _utilsJSUtils = require('../utils/JSUtils');

var _utilsJSUtils2 = _interopRequireDefault(_utilsJSUtils);

var StartupConfiguration = (function () {
    function StartupConfiguration() {
        var _this = this;

        _classCallCheck(this, StartupConfiguration);

        this.StartupStages = {};

        this.get = function () {
            return _this.StartupStages;
        };

        this.reset = function () {
            _this.StartupStages = {};
        };
    }

    _createClass(StartupConfiguration, [{
        key: 'init',
        value: function init() {
            _epicConfigureEpics2['default'].registerEpic({ epic: _StartupEpic2['default'].startupStep });
            _epicConfigureEpics2['default'].registerEpic({ epic: _StartupEpic2['default'].startupFinish });
        }
    }, {
        key: 'registerStagedResource',
        value: function registerStagedResource(_ref) {
            var stage = _ref.stage;
            var name = _ref.name;
            var actionCreator = _ref.actionCreator;
            var _ref$actionCreatorParams = _ref.actionCreatorParams;
            var actionCreatorParams = _ref$actionCreatorParams === undefined ? [] : _ref$actionCreatorParams;
            var _ref$required = _ref.required;
            var required = _ref$required === undefined ? true : _ref$required;
            var actionNameSuccess = _ref.actionNameSuccess;
            var actionNameFailure = _ref.actionNameFailure;

            var stageString = _utilsJSUtils2['default'].pad('000', stage); //for lexicographically sort
            if (!this.StartupStages['stage' + stageString]) {
                this.StartupStages['stage' + stageString] = [];
            }
            this.StartupStages['stage' + stageString].push({
                name: name,
                required: required,
                actionCreator: actionCreator,
                actionCreatorParams: actionCreatorParams,
                actionNameSuccess: actionNameSuccess,
                actionNameFailure: actionNameFailure
            });
        }
    }, {
        key: 'registerStage0Resource',
        value: function registerStage0Resource(_ref2) {
            var name = _ref2.name;
            var actionCreator = _ref2.actionCreator;
            var actionCreatorParams = _ref2.actionCreatorParams;
            var actionNameSuccess = _ref2.actionNameSuccess;
            var actionNameFailure = _ref2.actionNameFailure;

            this.registerStagedResource({
                stage: 0,
                name: name,
                actionCreator: actionCreator,
                actionCreatorParams: actionCreatorParams,
                actionNameSuccess: actionNameSuccess,
                actionNameFailure: actionNameFailure
            });
        }
    }, {
        key: 'registerStage1Resource',
        value: function registerStage1Resource(_ref3) {
            var name = _ref3.name;
            var actionCreator = _ref3.actionCreator;
            var actionCreatorParams = _ref3.actionCreatorParams;
            var actionNameSuccess = _ref3.actionNameSuccess;
            var actionNameFailure = _ref3.actionNameFailure;

            this.registerStagedResource({
                stage: 1,
                name: name,
                actionCreator: actionCreator,
                actionCreatorParams: actionCreatorParams,
                actionNameSuccess: actionNameSuccess,
                actionNameFailure: actionNameFailure
            });
        }
    }]);

    return StartupConfiguration;
})();

exports['default'] = new StartupConfiguration();
module.exports = exports['default'];