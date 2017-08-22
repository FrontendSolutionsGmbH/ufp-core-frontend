'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _StartupConstants$Act;

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _StartupConstants = require('./StartupConstants');

var _StartupConstants2 = _interopRequireDefault(_StartupConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingStateEnum = _StartupConstants2.default.LoadingStateEnum;

exports.default = (_StartupConstants$Act = {}, (0, _defineProperty3.default)(_StartupConstants$Act, _StartupConstants2.default.ActionConstants.UFP_STARTUP_NEXT_STAGE, function (state) {
    //   // console.log('StartupReducer next stage')
    return (0, _reactAddonsUpdate2.default)(state, {
        status: {
            loadingState: { $set: LoadingStateEnum.LOADING },
            currentStageIndex: { $set: state.status.currentStageIndex + 1 },
            stagePercentage: { $set: 0 }
        }
    });
}), (0, _defineProperty3.default)(_StartupConstants$Act, _StartupConstants2.default.ActionConstants.UFP_STARTUP_FINISHED, function (state) {
    //  // console.log('StartupReducer finalizing ', state)
    return (0, _reactAddonsUpdate2.default)(state, {
        status: {
            appInitialised: { $set: true },
            loadingState: { $set: LoadingStateEnum.SUCCESS },
            totalPercentage: { $set: 100 }
        }
    });
}), _StartupConstants$Act);