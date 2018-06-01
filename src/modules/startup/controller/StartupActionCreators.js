import StartupConstants from './../model/StartupConstants'
import StartupSelectors from './../model/StartupSelectors'

const initialiseApplication = () => loadStage(0)

const loadStage = (stageIndex) => (dispatch, getState) => {
    var stageDefinition = StartupSelectors.StageDefinitionSelector(getState())
    var currentIndex = StartupSelectors.CurrentStageIndexSelector(getState())
    //console.log('LOAD STAGE ', stageDefinition)
    var stages = Object.keys(stageDefinition)
                       .sort()
    console.log('LOAD STAGE ', stageIndex, currentIndex, getState())
    if (currentIndex < stageIndex) {
        // warning: fixme: todo: latest redux-observable queues actions, which leads to
        // double sending of loadstage event, intervene here if current stage index is not
        // the requested one, temporary fix
        if (stages.length > 0) {
            dispatch({
                type: StartupConstants.ActionConstants.UFP_STARTUP_NEXT_STAGE,
                payload: {
                    stageIndex: stageIndex
                }
            })
            stageDefinition[stages[stageIndex]].forEach((element) => {
                dispatch(element.actionCreator.apply(element.actionCreator, element.actionCreatorParams))
            })
        } else {
            dispatch({
                type: StartupConstants.ActionConstants.UFP_STARTUP_NO_STEPS
            })
        }
    }else{

        console.log(`Ignoring loadstage call, requested stage ${stageIndex} already active`)

    }
}

export default {
    initialiseApplication,
    loadStage
}
