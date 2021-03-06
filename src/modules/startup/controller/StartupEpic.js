import UfpCoreConstants from '../../../core/UfpCoreConstants'
import StartupConstants from './../model/StartupConstants'
import StartupSelectors from './../model/StartupSelectors'
import StartupActionCreators from './StartupActionCreators'
import {ofType} from 'redux-observable'
import {mapTo, filter, takeUntil} from 'rxjs/operators'

const startupInit = (action$) => {
    return action$.pipe(
        filter((action) => action.type === UfpCoreConstants.ACTION_NAMES.STARTUP)
        , mapTo(
            StartupActionCreators.initialiseApplication()
        ))
}
const startupStep = (action$, state$) => {
    //console.log('startupStep Epic Action called ', action$, store)
    return action$.pipe(
        filter((action) => {
            const state = state$.value
            // console.log('startupStep Epic Action called state:', state$)
            if (action.type !== StartupConstants.ActionConstants.UFP_STARTUP_NEXT_STAGE) {
                var totalStageCount = StartupSelectors.TotalStagesSelector(state)
                var currentStageIndex = StartupSelectors.CurrentStageIndexSelector(state)
                var currentStagePercentage = StartupSelectors.StagePercentageSelector(state)
                console.log('startupStep Epic Action called ', action,
                {
                    totalStageCount,
                        currentStageIndex,
                        currentStagePercentage
                }
            )
                if ((currentStagePercentage >= 100) && (currentStageIndex + 1 !== totalStageCount)) {
                    console.log('startupStep Executing')
                    return true //stage finished and is not last stage
                }
            }
            return false
        })
        ,
        mapTo((dispatch, getState) => {
            const state = getState()
            var currentStageIndex = StartupSelectors.CurrentStageIndexSelector(state)
            console.log('startupstep finished stage:', currentStageIndex)
            console.log('Startupstep load next stage:', currentStageIndex + 1)
            dispatch(StartupActionCreators.loadStage(currentStageIndex + 1))
        })
        , takeUntil(action$.pipe(ofType(StartupConstants.ActionConstants.UFP_STARTUP_FINISHED)))
    )
}

const startupFinish = (action$, state$) => {
    // console.log('startupFinish Epic Action called ', action$)
    return action$.pipe(
        filter((action) => {
            const state = state$.value
            console.log('startupFinish Epic Action called ', state$)
            if (action.type === StartupConstants.ActionConstants.UFP_STARTUP_NO_STEPS) {
                console.log('startupFinish Epic Action called return TRUE - no steps registered')
                return true
            } else {
                var appInitialised = StartupSelectors.AppInitialisedSelector(state)
                var totalStageCount = StartupSelectors.TotalStagesSelector(state)
                var currentStageIndex = StartupSelectors.CurrentStageIndexSelector(state)
                var currentStagePercentage = StartupSelectors.StagePercentageSelector(state)

                console.log('startupFinish Epic Action check', appInitialised, totalStageCount, currentStageIndex, currentStagePercentage)

                if (currentStagePercentage >= 100 && (currentStageIndex + 1) === totalStageCount && !appInitialised) {
                    console.log('startupFinish Epic Action called return TRUE')
                    return true //stage finished and is last stage
                }
                return false
            }
        }),
        mapTo((dispatch, getState) => {
                dispatch({
                    type: StartupConstants.ActionConstants.UFP_STARTUP_FINISHED,
                    payload: {
                        globalState: getState()
                    }
                })
            }
        )
        , takeUntil(
            action$.pipe(
                ofType(StartupConstants.ActionConstants.UFP_STARTUP_FINISHED))
        )
    )
}

export default {
    startupStep,
    startupFinish,
    startupInit
}
