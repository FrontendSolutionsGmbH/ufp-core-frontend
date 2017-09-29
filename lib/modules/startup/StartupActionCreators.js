'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _StartupConstants = require('./StartupConstants');

var _StartupConstants2 = _interopRequireDefault(_StartupConstants);

var _StartupSelectors = require('./StartupSelectors');

var _StartupSelectors2 = _interopRequireDefault(_StartupSelectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialiseApplication = function initialiseApplication() {
    return loadStage(0);
};

var loadStage = function loadStage(stageIndex) {
    return function (dispatch, getState) {
        var stageDefinition = _StartupSelectors2.default.StageDefinitionSelector(getState());
        //console.log('LOAD STAGE ', stageDefinition)
        var stages = Object.keys(stageDefinition).sort();
        //console.log('LOAD STAGE ', stageIndex, stageDefinition[stages[stageIndex]], getState())

        if (stages.length > 0) {
            dispatch({
                type: _StartupConstants2.default.ActionConstants.UFP_STARTUP_NEXT_STAGE,
                payload: {
                    stageIndex: stageIndex
                }
            });
            stageDefinition[stages[stageIndex]].forEach(function (element) {
                dispatch(element.actionCreator.apply(element.actionCreator, element.actionCreatorParams));
            });
        } else {
            dispatch({
                type: _StartupConstants2.default.ActionConstants.UFP_STARTUP_NO_STEPS
            });
        }
    };
};

exports.default = {
    initialiseApplication: initialiseApplication,
    loadStage: loadStage
};