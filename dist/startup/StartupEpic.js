'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _StartupConstants = require('./StartupConstants');

var _StartupConstants2 = _interopRequireDefault(_StartupConstants);

var _StartupSelectors = require('./StartupSelectors');

var _StartupSelectors2 = _interopRequireDefault(_StartupSelectors);

var _StartupActionCreators = require('./StartupActionCreators');

var _StartupActionCreators2 = _interopRequireDefault(_StartupActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startupStep = function startupStep(action$, store) {
    //console.log('startupStep Epic Action called ', action$, store)
    return action$.filter(function (action) {
        //console.log('startupStep Epic Action called state:', store.getState())
        if (action.type !== _StartupConstants2.default.ActionConstants.UFP_STARTUP_NEXT_STAGE) {
            var totalStageCount = _StartupSelectors2.default.TotalStagesSelector(store.getState());
            var currentStageIndex = _StartupSelectors2.default.CurrentStageIndexSelector(store.getState());
            var currentStagePercentage = _StartupSelectors2.default.StagePercentageSelector(store.getState());
            //console.log('startupStep Epic Action called ', {totalStageCount, currentStageIndex, currentStagePercentage})
            if (currentStagePercentage >= 100 && currentStageIndex + 1 !== totalStageCount) {
                return true; //stage finished and is not last stage
            }
        }
        return false;
    }).mapTo(function (dispatch, getState) {
        var currentStageIndex = _StartupSelectors2.default.CurrentStageIndexSelector(getState());
        //console.log('startup finished stage:', currentStageIndex)
        //console.log('Startup load next stage:', currentStageIndex + 1)
        dispatch(_StartupActionCreators2.default.loadStage(currentStageIndex + 1));
    }).takeUntil(action$.ofType(_StartupConstants2.default.ActionConstants.UFP_STARTUP_FINISHED));
};

var startupFinish = function startupFinish(action$, store) {
    //console.log('startupFinish Epic Action called ', action$)
    return action$.filter(function (action) {
        // console.log('startupFinish Epic Action called ', store.getState())
        if (action.type === _StartupConstants2.default.ActionConstants.UFP_STARTUP_NO_STEPS) {
            //console.log('startupFinish Epic Action called return TRUE - no steps registered')
            return true;
        } else {
            var appInitialised = _StartupSelectors2.default.AppInitialisedSelector(store.getState());
            var totalStageCount = _StartupSelectors2.default.TotalStagesSelector(store.getState());
            var currentStageIndex = _StartupSelectors2.default.CurrentStageIndexSelector(store.getState());
            var currentStagePercentage = _StartupSelectors2.default.StagePercentageSelector(store.getState());
            if (currentStagePercentage >= 100 && currentStageIndex + 1 === totalStageCount && !appInitialised) {
                //console.log('startupFinish Epic Action called return TRUE')
                return true; //stage finished and is last stage
            }
            return false;
        }
    }).mapTo(function (dispatch, getState) {
        dispatch({
            type: _StartupConstants2.default.ActionConstants.UFP_STARTUP_FINISHED,
            payload: {
                getState: getState
            }
        });
    }).takeUntil(action$.ofType(_StartupConstants2.default.ActionConstants.UFP_STARTUP_FINISHED));
};

exports.default = {
    startupStep: startupStep,
    startupFinish: startupFinish
};