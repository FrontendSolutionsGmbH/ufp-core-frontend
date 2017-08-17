'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _StartupConstants$ActionConstants$UFP_STARTUP_NEXT_STAGE$StartupConstants$ActionConstants$UFP_STARTUP_FINISHED;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _StartupConstants = require('./StartupConstants');

var _StartupConstants2 = _interopRequireDefault(_StartupConstants);

var LoadingStateEnum = _StartupConstants2['default'].LoadingStateEnum;

exports['default'] = (_StartupConstants$ActionConstants$UFP_STARTUP_NEXT_STAGE$StartupConstants$ActionConstants$UFP_STARTUP_FINISHED = {}, _defineProperty(_StartupConstants$ActionConstants$UFP_STARTUP_NEXT_STAGE$StartupConstants$ActionConstants$UFP_STARTUP_FINISHED, _StartupConstants2['default'].ActionConstants.UFP_STARTUP_NEXT_STAGE, function (state) {
    //   // console.log('StartupReducer next stage')
    return (0, _reactAddonsUpdate2['default'])(state, {
        status: {
            loadingState: { $set: LoadingStateEnum.LOADING },
            currentStageIndex: { $set: state.status.currentStageIndex + 1 },
            stagePercentage: { $set: 0 }
        }
    });
}), _defineProperty(_StartupConstants$ActionConstants$UFP_STARTUP_NEXT_STAGE$StartupConstants$ActionConstants$UFP_STARTUP_FINISHED, _StartupConstants2['default'].ActionConstants.UFP_STARTUP_FINISHED, function (state) {
    //  // console.log('StartupReducer finalizing ', state)
    return (0, _reactAddonsUpdate2['default'])(state, {
        status: {
            appInitialised: { $set: true },
            loadingState: { $set: LoadingStateEnum.SUCCESS },
            totalPercentage: { $set: 100 }
        }
    });
}), _StartupConstants$ActionConstants$UFP_STARTUP_NEXT_STAGE$StartupConstants$ActionConstants$UFP_STARTUP_FINISHED);
module.exports = exports['default'];