'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ConfigureEpics = require('../epic/ConfigureEpics');

var _ConfigureEpics2 = _interopRequireDefault(_ConfigureEpics);

var _StartupEpic = require('./StartupEpic');

var _StartupEpic2 = _interopRequireDefault(_StartupEpic);

var _JSUtils = require('../utils/JSUtils');

var _JSUtils2 = _interopRequireDefault(_JSUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StartupConfiguration = function () {
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
            _ConfigureEpics2.default.registerEpic({ epic: _StartupEpic2.default.startupStep });
            _ConfigureEpics2.default.registerEpic({ epic: _StartupEpic2.default.startupFinish });
        }
    }, {
        key: 'registerStagedResource',
        value: function registerStagedResource(_ref) {
            var stage = _ref.stage,
                name = _ref.name,
                actionCreator = _ref.actionCreator,
                _ref$actionCreatorPar = _ref.actionCreatorParams,
                actionCreatorParams = _ref$actionCreatorPar === undefined ? [] : _ref$actionCreatorPar,
                _ref$required = _ref.required,
                required = _ref$required === undefined ? true : _ref$required,
                actionNameSuccess = _ref.actionNameSuccess,
                actionNameFailure = _ref.actionNameFailure;

            var stageString = _JSUtils2.default.pad('000', stage); //for lexicographically sort
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
            var name = _ref2.name,
                actionCreator = _ref2.actionCreator,
                actionCreatorParams = _ref2.actionCreatorParams,
                actionNameSuccess = _ref2.actionNameSuccess,
                actionNameFailure = _ref2.actionNameFailure;

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
            var name = _ref3.name,
                actionCreator = _ref3.actionCreator,
                actionCreatorParams = _ref3.actionCreatorParams,
                actionNameSuccess = _ref3.actionNameSuccess,
                actionNameFailure = _ref3.actionNameFailure;

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
}();

exports.default = new StartupConfiguration();