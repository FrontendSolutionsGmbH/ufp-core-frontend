import StartupActionCreators from 'startup/StartupActionCreators'
import StartupConstants from 'startup/StartupConstants'

describe('startup StartupActionCreators', () => {

    describe('initialiseApplication', () => {
        it('Should dispatch UFP_STARTUP_NEXT_STAGE and call registered actioncreators of first stage', () => {
            expect(StartupActionCreators.initialiseApplication()).to.be.a('function')
            var dispatch=sinon.spy()
            var actionCreator=sinon.stub()
            var getState=sinon.stub()
            getState.returns({
                ufpStartup:{
                    stageDefinition:{
                        stage000:[{
                            stage:0,
                            name: 'test',
                            required: true,
                            actionCreator: actionCreator,
                            actionCreatorParams:[21],
                            actionNameSuccess: 'SUCCESS',
                            actionNameFailure: 'FAULURE'
                        }]
                    }
                }
            })
            actionCreator.withArgs(21).returns( {
                type: 'SOME_TYPE',
                payload: {
                    id:21
                }
            })
            StartupActionCreators.initialiseApplication()(dispatch, getState)
            expect(dispatch.getCall(0).args[0]).to.deep.equal({
                type: StartupConstants.ActionConstants.UFP_STARTUP_NEXT_STAGE,
                payload:{
                    stageIndex: 0
                }
            })
            expect(dispatch.getCall(1).args[0]).to.deep.equal({
                type: 'SOME_TYPE',
                payload: {
                    id:21
                }
            })
            expect(actionCreator.getCall(0).args[0]).to.equal(21)
        })
        it('Should dispatch action with type UFP_STARTUP_NO_STEPS ', () => {
            expect(StartupActionCreators.initialiseApplication()).to.be.a('function')
            var dispatch=sinon.spy()
            var getState=sinon.stub()
            getState.returns({
                ufpStartup:{
                    stageDefinition:{
                    }
                }
            })

            StartupActionCreators.initialiseApplication()(dispatch, getState)
            expect(dispatch.getCall(0).args[0]).to.deep.equal({
                type: StartupConstants.ActionConstants.UFP_STARTUP_NO_STEPS,
            })
        })
    })
})