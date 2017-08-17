'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _StartupReducerName = require('./StartupReducerName');

var _StartupReducerName2 = _interopRequireDefault(_StartupReducerName);

var StartupState = function StartupState(state) {
    return state[_StartupReducerName2['default'].get()];
};
exports.StartupState = StartupState;
var GetStatusSelector = function GetStatusSelector(state) {
    return StartupState(state).status;
};
exports.GetStatusSelector = GetStatusSelector;
var StepStatusSelector = function StepStatusSelector(state) {
    return StartupState(state).stepStatus;
};
exports.StepStatusSelector = StepStatusSelector;
var StageStatusSelector = function StageStatusSelector(state) {
    return StartupState(state).stageStatus;
};
exports.StageStatusSelector = StageStatusSelector;
var StageDefinitionSelector = function StageDefinitionSelector(state) {
    return StartupState(state).stageDefinition;
};

exports.StageDefinitionSelector = StageDefinitionSelector;
var AppInitialisedSelector = function AppInitialisedSelector(state) {
    return GetStatusSelector(state).appInitialised;
};
exports.AppInitialisedSelector = AppInitialisedSelector;
var LoadingStateSelector = function LoadingStateSelector(state) {
    return GetStatusSelector(state).loadingState;
};
exports.LoadingStateSelector = LoadingStateSelector;
var CurrentStageIndexSelector = function CurrentStageIndexSelector(state) {
    return GetStatusSelector(state).currentStageIndex;
};
exports.CurrentStageIndexSelector = CurrentStageIndexSelector;
var TotalFinishedStepsSelector = function TotalFinishedStepsSelector(state) {
    return GetStatusSelector(state).totalFinishedSteps;
};
exports.TotalFinishedStepsSelector = TotalFinishedStepsSelector;
var TotalStagesSelector = function TotalStagesSelector(state) {
    return GetStatusSelector(state).totalStages;
};
exports.TotalStagesSelector = TotalStagesSelector;
var TotalStepsSelector = function TotalStepsSelector(state) {
    return GetStatusSelector(state).totalSteps;
};

exports.TotalStepsSelector = TotalStepsSelector;
var TotalPercentageSelector = function TotalPercentageSelector(state) {
    return GetStatusSelector(state).totalPercentage;
};
exports.TotalPercentageSelector = TotalPercentageSelector;
var StagePercentageSelector = function StagePercentageSelector(state) {
    return GetStatusSelector(state).stagePercentage;
};
exports.StagePercentageSelector = StagePercentageSelector;
var StepPercentageSelector = function StepPercentageSelector(state) {
    return GetStatusSelector(state).stepPercentage;
};

exports.StepPercentageSelector = StepPercentageSelector;
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
exports['default'] = StartupSelectors;