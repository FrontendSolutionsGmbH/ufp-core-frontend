'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StepPercentageSelector = exports.StagePercentageSelector = exports.TotalPercentageSelector = exports.TotalStepsSelector = exports.TotalStagesSelector = exports.TotalFinishedStepsSelector = exports.CurrentStageIndexSelector = exports.LoadingStateSelector = exports.AppInitialisedSelector = exports.StageDefinitionSelector = exports.StageStatusSelector = exports.StepStatusSelector = exports.GetStatusSelector = exports.StartupState = undefined;

var _StartupReducerName = require('./StartupReducerName');

var _StartupReducerName2 = _interopRequireDefault(_StartupReducerName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StartupState = exports.StartupState = function StartupState(state) {
    return state[_StartupReducerName2.default.get()];
};
var GetStatusSelector = exports.GetStatusSelector = function GetStatusSelector(state) {
    return StartupState(state).status;
};
var StepStatusSelector = exports.StepStatusSelector = function StepStatusSelector(state) {
    return StartupState(state).stepStatus;
};
var StageStatusSelector = exports.StageStatusSelector = function StageStatusSelector(state) {
    return StartupState(state).stageStatus;
};
var StageDefinitionSelector = exports.StageDefinitionSelector = function StageDefinitionSelector(state) {
    return StartupState(state).stageDefinition;
};

var AppInitialisedSelector = exports.AppInitialisedSelector = function AppInitialisedSelector(state) {
    return GetStatusSelector(state).appInitialised;
};
var LoadingStateSelector = exports.LoadingStateSelector = function LoadingStateSelector(state) {
    return GetStatusSelector(state).loadingState;
};
var CurrentStageIndexSelector = exports.CurrentStageIndexSelector = function CurrentStageIndexSelector(state) {
    return GetStatusSelector(state).currentStageIndex;
};
var TotalFinishedStepsSelector = exports.TotalFinishedStepsSelector = function TotalFinishedStepsSelector(state) {
    return GetStatusSelector(state).totalFinishedSteps;
};
var TotalStagesSelector = exports.TotalStagesSelector = function TotalStagesSelector(state) {
    return GetStatusSelector(state).totalStages;
};
var TotalStepsSelector = exports.TotalStepsSelector = function TotalStepsSelector(state) {
    return GetStatusSelector(state).totalSteps;
};

var TotalPercentageSelector = exports.TotalPercentageSelector = function TotalPercentageSelector(state) {
    return GetStatusSelector(state).totalPercentage;
};
var StagePercentageSelector = exports.StagePercentageSelector = function StagePercentageSelector(state) {
    return GetStatusSelector(state).stagePercentage;
};
var StepPercentageSelector = exports.StepPercentageSelector = function StepPercentageSelector(state) {
    return GetStatusSelector(state).stepPercentage;
};

var StartupSelectors = {
    StageDefinitionSelector: StageDefinitionSelector,
    StepStatusSelector: StepStatusSelector,
    StageStatusSelector: StageStatusSelector,

    AppInitialisedSelector: AppInitialisedSelector,
    LoadingStateSelector: LoadingStateSelector,
    CurrentStageIndexSelector: CurrentStageIndexSelector,
    TotalFinishedStepsSelector: TotalFinishedStepsSelector,
    TotalStagesSelector: TotalStagesSelector,
    TotalStepsSelector: TotalStepsSelector,

    TotalPercentageSelector: TotalPercentageSelector,
    StagePercentageSelector: StagePercentageSelector,
    StepPercentageSelector: StepPercentageSelector

};
exports.default = StartupSelectors;