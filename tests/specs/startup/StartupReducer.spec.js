
import StartupReducer from 'startup/StartupReducer'
import StartupConstants from 'startup/StartupConstants'
import StartupReducerUtils  from 'startup/StartupReducerUtils'

describe('startup StartupReducer', () => {
    var stubedGetInitState
    var stubedStepReducer
    beforeEach(() => {
        stubedGetInitState=sinon.stub(StartupReducerUtils, 'getInitialState')
        stubedStepReducer=sinon.stub(StartupReducerUtils, 'stepReducer')
    })

    afterEach(() => {
        stubedGetInitState.restore()
        stubedStepReducer.restore()
    })
    it('Should return initialstate if called without state', () => {
        stubedGetInitState.returns({
            test:'test'
        })
        stubedStepReducer.callsFake((state) => state)
        expect(StartupReducer(undefined,{type: '@@@@@@@'})).to.deep.equal({ test:'test'})
    })
    it('Should increment stage if action type UFP_STARTUP_NEXT_STAGE', () => {

        stubedGetInitState.restore()
        stubedStepReducer.callsFake((state) => state)
        expect(StartupReducer({
            status: {
                loadingState: StartupConstants.LoadingStateEnum.UNINITIALISED,
                currentStageIndex: -1,
                stagePercentage: 0
            }
        }, {type: StartupConstants.ActionConstants.UFP_STARTUP_NEXT_STAGE})).to.deep.equal({
            status: {
                loadingState: StartupConstants.LoadingStateEnum.LOADING,
                currentStageIndex: 0,
                stagePercentage: 0
            }
        })
    })
    it('Should increment stage if action type UFP_STARTUP_FINISHED', () => {

        stubedGetInitState.restore()
        stubedStepReducer.callsFake((state) => state)
        expect(StartupReducer({
            status: {
                appInitialised: false,
                loadingState: StartupConstants.LoadingStateEnum.LOADING,
                totalPercentage: 0
            }
        }, {type: StartupConstants.ActionConstants.UFP_STARTUP_FINISHED})).to.deep.equal({
            status: {
                appInitialised:  true,
                loadingState: StartupConstants.LoadingStateEnum.SUCCESS,
                totalPercentage:  100
            }
        })
    })
})