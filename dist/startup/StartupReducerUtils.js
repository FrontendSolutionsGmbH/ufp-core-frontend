'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _StartupConstants = require('./StartupConstants');

var _StartupConstants2 = _interopRequireDefault(_StartupConstants);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var LoadingStateEnum = _StartupConstants2['default'].LoadingStateEnum;

var getInitialStatus = function getInitialStatus(StartupStageDefinition) {
    // calculate total steps by counting through the definition
    var totalSteps = 0;
    // good ole iterate iterate but no external lib used, todo: fixme: provide Object.reduce() helper method
    for (var i in StartupStageDefinition) {
        var stage = StartupStageDefinition[i];
        Object.keys(stage).map(function () {
            totalSteps++;
        });
    }
    var result = {
        currentStageIndex: -1,
        appInitialised: false,
        loadingState: LoadingStateEnum.UNINITIALISED,
        stagePercentage: 0,
        totalPercentage: 0,
        stepPercentage: 0,
        totalStages: Object.keys(StartupStageDefinition).length,
        totalSteps: totalSteps,
        totalFinishedSteps: 0
    };
    return result;
};

var getInitialStageStatus = function getInitialStageStatus(StartupStageDefinition) {
    var obj = {};
    Object.keys(StartupStageDefinition).sort().map(function (StartupStageDefinitionName, index) {
        var stage = StartupStageDefinition[StartupStageDefinitionName];
        obj[index] = {
            totalSteps: stage.length,
            successCount: 0,
            failureCount: 0
        };
    });
    return obj;
};

var getInitialStepStatus = function getInitialStepStatus(StartupStageDefinition) {
    // // // console.log('StartupReducer creating ', Object.assign({}, StartupStageDefinition))
    var result = {};
    for (var i in StartupStageDefinition) {
        var stage = StartupStageDefinition[i];

        //   // // console.log('StartupReducer Creating initialstate startup2:', stage)

        for (var j in stage) {
            var current = stage[j];
            result[current.name] = LoadingStateEnum.UNINITIALISED;
        }
    }

    // // // console.log('StartupReducer Creating initialstate startup4:', result)
    return result;
};

var getInitialState = function getInitialState(StartupStageDefinition) {
    return {
        status: getInitialStatus(StartupStageDefinition),
        stageStatus: getInitialStageStatus(StartupStageDefinition),
        stepStatus: getInitialStepStatus(StartupStageDefinition),
        stageDefinition: StartupStageDefinition
    };
};

var updateStatus = function updateStatus(state) {

    var currentStageIndex = state.status.currentStageIndex;
    var totalCount = state.stageStatus[currentStageIndex].totalSteps;
    var successCount = state.stageStatus[currentStageIndex].successCount;
    //var failureCount=state.stageStatus[currentStageIndex].failureCount
    //console.log('totalcount',totalCount, failureCount, successCount)

    if (totalCount === successCount) {
        // set next stage
        state = (0, _reactAddonsUpdate2['default'])(state, { status: { stagePercentage: { $set: 100 } } }); //epic will start next stage or report finish
        // console.log('StartupReducer Stage finished ', state)
    } else {
            // if stage is not finished update percentage for current stage
            state = (0, _reactAddonsUpdate2['default'])(state, { status: { stagePercentage: { $set: Math.round(successCount / totalCount * 100.0) } } });

            // console.log('StartupReducer Stage not finished ', currentStage, state)
        }

    // and update total percentage accordingly
    var totalPercentage = Math.round(currentStageIndex / state.status.totalStages * 100);
    // // // console.log('StartupReducer actualizing percentages stage1 ', state.status.stagePercentage)
    //  // // console.log('StartupReducer actualizing percentages total2 ', totalPercentage)
    //console.log('StartupReducer actualizing percentages total3', totalPercentage + ((state.status.stagePercentage / state.status.totalStages) * 0.01) * 100.0)
    state = (0, _reactAddonsUpdate2['default'])(state, { status: { totalPercentage: { $set: totalPercentage + state.status.stagePercentage / state.status.totalStages * 0.01 * 100.0 } } });
    state = (0, _reactAddonsUpdate2['default'])(state, { status: { stepPercentage: { $set: state.status.totalFinishedSteps / state.status.totalSteps * 100.0 } } });

    return state;
};

var stepReducer = function stepReducer(state, action) {

    if (state === undefined || !state.status || state.status.currentStageIndex === -1) {
        return state;
    }

    var currentStageIndex = state.status.currentStageIndex;
    var stageKeys = Object.keys(state.stageDefinition).sort();
    //  // // console.log('StartupReducer ', currentStageIndex, stageKeys)
    // marker flag if any of the registered actions are incoming (dont update state otherwise)
    var currentStage = state.stageDefinition[stageKeys[currentStageIndex]];

    currentStage.some(function (stepDef) {
        // // console.log('StartupReducer checking', stepDef)
        // // console.log('StartupReducer checking', action.type, stepDef.actionNameSuccess)
        // // console.log('StartupReducer checking', action.type === stepDef.actionNameSuccess)
        if (action.type === stepDef.actionNameSuccess) {
            state = (0, _reactAddonsUpdate2['default'])(state, { stepStatus: _defineProperty({}, stepDef.name, { $set: LoadingStateEnum.SUCCESS }) });
            // increase step for every success
            state = (0, _reactAddonsUpdate2['default'])(state, { status: { totalFinishedSteps: { $set: state.status.totalFinishedSteps + 1 } } });
            //update count in stageStatus
            state = (0, _reactAddonsUpdate2['default'])(state, { stageStatus: _defineProperty({}, currentStageIndex, { successCount: { $set: state.stageStatus[currentStageIndex].successCount + 1 } }) });
            state = updateStatus(state);
            // console.log('StartupReducer success', stepDef)
            return true; //breaks the execution
        } else if (action.type === stepDef.actionNameFailure) {
                state = (0, _reactAddonsUpdate2['default'])(state, { stepStatus: _defineProperty({}, stepDef.name, { $set: LoadingStateEnum.FAILURE }) });
                //update count in stageStatus
                if (stepDef.required === true) {
                    state = (0, _reactAddonsUpdate2['default'])(state, { stageStatus: _defineProperty({}, currentStageIndex, { failureCount: { $set: state.stageStatus[currentStageIndex].failureCount + 1 } }) });
                } else {
                    state = (0, _reactAddonsUpdate2['default'])(state, { status: { totalFinishedSteps: { $set: state.status.totalFinishedSteps + 1 } } });
                    state = (0, _reactAddonsUpdate2['default'])(state, { stageStatus: _defineProperty({}, currentStageIndex, { successCount: { $set: state.stageStatus[currentStageIndex].successCount + 1 } }) });
                }

                state = updateStatus(state);
                // console.log('StartupReducer failed', stepDef)
                return true; //breaks the execution
            }
        return false; //continue the execution
    });
    return state;
};

exports['default'] = {
    updateStatus: updateStatus,
    getInitialState: getInitialState,
    getInitialStepStatus: getInitialStepStatus,
    getInitialStageStatus: getInitialStageStatus,
    stepReducer: stepReducer
};
module.exports = exports['default'];