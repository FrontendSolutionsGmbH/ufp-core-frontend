import StartupEpic from 'startup/StartupEpic'
import ConfigureEpics from 'epic/ConfigureEpics'
import StartupConstants from 'startup/StartupConstants'
function noop() {}

describe('startup StartupEpic', () => {
    describe('startupStep', () => {
        noop()
        let stubedgetEpics
        let store
        beforeEach(() => {
            ConfigureEpics.reset()
            store={
                getState: noop(),
                dispatch:sinon.spy()
            }
            stubedgetEpics=sinon.stub(ConfigureEpics, 'getEpics')
        })

        afterEach(() => {
            stubedgetEpics.restore()
        })
        it('Should dispatch thunk actioncreator loadStage', () => {
            noop()
            var next=sinon.spy()
            var actionCreator1= noop
            var actionCreator2=(id, para2) => ({
              type: 'ACTION_CREATOR2_TYPE',
                payload:{
                    id:id,
                    para2: para2
                }
            })
            var actionCreator2Spy=sinon.spy(actionCreator2)
            store.getState = () => ({
                ufpStartup: {
                    status:{
                        appInitialised: false,
                        currentStageIndex: 0,
                        totalFinishedSteps: 1,
                        loadingState: 'loading',
                        stagePercentage: 100,
                        stepPercentage: 50,
                        totalPercentage: 50,
                        totalStages: 2,
                        totalSteps: 2,
                    },
                    stageDefinition: {
                        stage000: [{
                            stage:0,
                            name: 'step1',
                            required: true,
                            actionCreator: actionCreator1,
                            actionCreatorParams:['test'],
                            actionNameSuccess: 'SUCCESS1',
                            actionNameFailure: 'FAULURE1'}],
                        stage001: [{
                            stage:1,
                            name: 'step1',
                            required: true,
                            actionCreator: actionCreator2Spy,
                            actionCreatorParams:[21,'paramter2'],
                            actionNameSuccess: 'SUCCESS2',
                            actionNameFailure: 'FAULURE2'}]
                    }
                }
            })
            stubedgetEpics.returns([StartupEpic.startupStep])
            ConfigureEpics.createEpicMiddleware()(store)(next)({
                type:'SOME_SUCCESS_TYPE'
            })
            expect(next.callCount).to.equal(1)
            expect(next.args[0][0]).to.deep.equal({
                type:'SOME_SUCCESS_TYPE'
            })
            expect(store.dispatch.callCount).to.equal(1)
            expect(store.dispatch.args[0][0]).to.be.a('function') // epic maps to a thunk action
            store.dispatch.args[0][0](store.dispatch, store.getState) //call thunk
            expect(store.dispatch.args[1][0]).to.be.a('function') // loadStage is a thunk action
            store.dispatch.args[1][0](store.dispatch, store.getState) //call loadStage



            expect(store.dispatch.args[2][0]).to.deep.equal({ //loadStage dispatch UFP_STARTUP_NEXT_STAGE
                type: StartupConstants.ActionConstants.UFP_STARTUP_NEXT_STAGE,
                payload:{
                    stageIndex: 1
                }
            })
            expect(store.dispatch.args[3][0]).to.deep.equal({ //loadStage dispatch actioncreator2
                type: 'ACTION_CREATOR2_TYPE',
                payload:{
                    id:21,
                    para2: 'paramter2'
                }
            })
            expect(actionCreator2Spy.getCall(0).args).to.deep.equal([21, 'paramter2'])
        })
        it('Should dispatch nothing for type  StartupConstants.ActionConstants.UFP_STARTUP_NEXT_STAGE', () => {
            var next=sinon.spy()
            store.getState = () => ({
                ufpStartup: {
                }
            })
            stubedgetEpics.returns([StartupEpic.startupStep])
            ConfigureEpics.createEpicMiddleware()(store)(next)({
                type:StartupConstants.ActionConstants.UFP_STARTUP_NEXT_STAGE
            })
            expect(store.dispatch.callCount).to.equal(0)
        })
        it('Should dispatch nothing for type  StartupConstants.ActionConstants.UFP_STARTUP_NEXT_STAGE', () => {
            var next=sinon.spy()
            store.getState = () => ({
                ufpStartup: {
                }
            })
            stubedgetEpics.returns([StartupEpic.startupStep])
            ConfigureEpics.createEpicMiddleware()(store)(next)({
                type:StartupConstants.ActionConstants.UFP_STARTUP_NEXT_STAGE
            })
            expect(store.dispatch.callCount).to.equal(0)
        })
        it('Should dispatch nothing if stage not finished', () => {
            var next=sinon.spy()
            store.getState = () => ({
                ufpStartup: {
                    status:{
                        appInitialised: false,
                        currentStageIndex: 0,
                        totalFinishedSteps: 1,
                        loadingState: 'loading',
                        stagePercentage: 50,
                        stepPercentage: 50,
                        totalPercentage: 50,
                        totalStages: 1,
                        totalSteps: 2,
                    }
                }
            })
            stubedgetEpics.returns([StartupEpic.startupStep])
            ConfigureEpics.createEpicMiddleware()(store)(next)({
                type:'SOME_TYPE'
            })
            expect(store.dispatch.callCount).to.equal(0) // epic does not map
        })
    })
    describe('startupFinish', () => {

        let stubedgetEpics
        let store
        beforeEach(() => {
            ConfigureEpics.reset()
            store={
                getState: noop(),
                dispatch:sinon.spy()
            }
            stubedgetEpics=sinon.stub(ConfigureEpics, 'getEpics')
        })

        afterEach(() => {
            stubedgetEpics.restore()
        })
        it('Should dispatch UFP_STARTUP_FINISHED if stage 100 and last stage', () => {
            var next=sinon.spy()
            store.getState = () => ({
                ufpStartup: {
                    status:{
                        appInitialised: false,
                        currentStageIndex: 0,
                        totalFinishedSteps: 2,
                        loadingState: 'loading',
                        stagePercentage: 100,
                        stepPercentage: 100,
                        totalPercentage: 100,
                        totalStages: 1,
                        totalSteps: 2,
                    }
                }
            })
            stubedgetEpics.returns([StartupEpic.startupFinish])
            ConfigureEpics.createEpicMiddleware()(store)(next)({
                type:'SOME_TYPE'
            })
            expect(store.dispatch.callCount).to.equal(1) // epic does not map
            expect(store.dispatch.args[0][0]).to.be.a('function') // epic maps to a thunk action
            store.dispatch.args[0][0](store.dispatch, store.getState)
            expect(store.dispatch.args[1][0]).to.deep.equal({
                type: StartupConstants.ActionConstants.UFP_STARTUP_FINISHED,
                payload: {
                    getState: store.getState
                }
            })
        })
        it('Should dispatch UFP_STARTUP_FINISHED if type UFP_STARTUP_NO_STEPS', () => {
            var next=sinon.spy()
            store.getState = noop
            stubedgetEpics.returns([StartupEpic.startupFinish])
            ConfigureEpics.createEpicMiddleware()(store)(next)({
                type: StartupConstants.ActionConstants.UFP_STARTUP_NO_STEPS
            })
            expect(store.dispatch.callCount).to.equal(1) // epic does not map
            expect(store.dispatch.args[0][0]).to.be.a('function') // epic maps to a thunk action
            store.dispatch.args[0][0](store.dispatch, store.getState)
            expect(store.dispatch.args[1][0]).to.deep.equal({
                type: StartupConstants.ActionConstants.UFP_STARTUP_FINISHED,
                payload: {
                    getState: store.getState
                }
            })
        })
        it('Should dispatch nothing if stage not finished and not last stage', () => {
            var next=sinon.spy()
            store.getState = () => ({
                ufpStartup: {
                    status:{
                        appInitialised: false,
                        currentStageIndex: 0,
                        totalFinishedSteps: 1,
                        loadingState: 'loading',
                        stagePercentage: 100,
                        stepPercentage: 50,
                        totalPercentage: 50,
                        totalStages: 2,
                        totalSteps: 2,
                    }
                }
            })
            stubedgetEpics.returns([StartupEpic.startupFinish])
            ConfigureEpics.createEpicMiddleware()(store)(next)({
                type: 'SOME_TYPE'
            })
            expect(store.dispatch.callCount).to.equal(0) // epic does not map
        })
    })
})