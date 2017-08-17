import StartupConstants from './StartupConstants'
import StartupSelectors from './StartupSelectors'
import StartupActionCreators from './StartupActionCreators'

const startupStep = (action$, store) => {
    console.log('startupStep Epic Action called ', action$, store)
    return action$.filter((action) => {
        console.log('startupStep Epic Action called state:', store.getState())
        if (action.type !== StartupConstants.ActionConstants.UFP_STARTUP_NEXT_STAGE) {
            var totalStageCount = StartupSelectors.TotalStagesSelector(store.getState())
            var currentStageIndex = StartupSelectors.CurrentStageIndexSelector(store.getState())
            var currentStagePercentage = StartupSelectors.StagePercentageSelector(store.getState())
            console.log('startupStep Epic Action called ', {totalStageCount, currentStageIndex, currentStagePercentage})
            if (currentStagePercentage >= 100 && (currentStageIndex + 1) !==  totalStageCount) {
                return true //stage finished and is not last stage
            }
        }
        return false
    }).mapTo((dispatch, getState) => {
        var currentStageIndex = StartupSelectors.CurrentStageIndexSelector(getState())
        console.log('startup finished stage:', currentStageIndex)
        console.log('Startup load next stage:', currentStageIndex + 1)
        dispatch(StartupActionCreators.loadStage(currentStageIndex + 1))
    }).takeUntil(action$.ofType(StartupConstants.ActionConstants.UFP_STARTUP_FINISHED))
}

const startupFinish = (action$, store) => {
    console.log('startupFinish Epic Action called ', action$)
    return action$.filter((action) => {
        // console.log('startupFinish Epic Action called ', store.getState())
        if (action.type === StartupConstants.ActionConstants.UFP_STARTUP_NO_STEPS) {
            console.log('startupFinish Epic Action called return TRUE - no steps registered')
            return true
        } else {
            var totalStageCount = StartupSelectors.TotalStagesSelector(store.getState())
            var currentStageIndex = StartupSelectors.CurrentStageIndexSelector(store.getState())
            var currentStagePercentage = StartupSelectors.StagePercentageSelector(store.getState())
            if (currentStagePercentage >= 100 && (currentStageIndex + 1) ===  totalStageCount) {
                console.log('startupFinish Epic Action called return TRUE')
                return true  //stage finished and is last stage
            }
            return false
        }
    }).mapTo((dispatch, getState) => {
            dispatch({
                type: StartupConstants.ActionConstants.UFP_STARTUP_FINISHED,
                payload: {
                    getState: getState
                }
            })
        }
    ).takeUntil(action$.ofType(StartupConstants.ActionConstants.UFP_STARTUP_FINISHED))
}

export default {
    startupStep,
    startupFinish
}
