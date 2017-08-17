import ConfigureEpics from 'epic/ConfigureEpics'
import StartupConfiguration from 'startup/StartupConfiguration'

describe('startup StartupConfiguration', () => {

    describe('registerStage0Resource', () => {
        it('Should register 2 steps at stage 0 ', () => {
            var actionCreator=sinon.stub()
            StartupConfiguration.reset()
            expect(Object.keys(StartupConfiguration.get()).length).to.equal(0) //stageobject has 0 stages
            StartupConfiguration.registerStage0Resource({
                stage:0,
                name: 'test',
                required: true,
                actionCreator: actionCreator,
                actionCreatorParams:[21],
                actionNameSuccess: 'SUCCESS',
                actionNameFailure: 'FAULURE'
            })
            StartupConfiguration.registerStage0Resource({
                stage:0,
                name: 'test',
                required: true,
                actionCreator: actionCreator,
                actionCreatorParams:[21],
                actionNameSuccess: 'SUCCESS',
                actionNameFailure: 'FAULURE'
            })
            var config=StartupConfiguration.get()
            expect(Object.keys(config).length).to.equal(1) //stageobject has 1 stage
            expect(config[Object.keys(config)[0]].length).to.equal(2) //steparray of stage 0  has length 2
            StartupConfiguration.reset()
        })
    })
    describe('registerStage 0 and 1 Resource', () => {
        it('Should register 2 steps at stage 0 ', () => {
            var actionCreator=sinon.stub()
            StartupConfiguration.reset()
            expect(Object.keys(StartupConfiguration.get()).length).to.equal(0) //stageobject has 0 stages
            StartupConfiguration.registerStage0Resource({
                name: 'test',
                required: true,
                actionCreator: actionCreator,
                actionCreatorParams:[21],
                actionNameSuccess: 'SUCCESS',
                actionNameFailure: 'FAULURE'
            })
            StartupConfiguration.registerStage1Resource({
                name: 'test',
                required: true,
                actionCreator: actionCreator,
                actionCreatorParams:[21],
                actionNameSuccess: 'SUCCESS',
                actionNameFailure: 'FAULURE'
            })
            var config=StartupConfiguration.get()
            expect(Object.keys(config).length).to.equal(2) //stageobject has 2 stages
            expect(config[Object.keys(config)[0]].length).to.equal(1) //steparray of stage 0  has length 1
            expect(config[Object.keys(config)[1]].length).to.equal(1) //steparray of stage 1  has length 1
            StartupConfiguration.reset()
        })

    })
    describe('registerStageResource with no actioncreatorparmas', () => {
        it('Should register 2 steps at stage 0 ', () => {
            var actionCreator=sinon.stub()
            StartupConfiguration.reset()
            expect(Object.keys(StartupConfiguration.get()).length).to.equal(0) //stageobject has 0 stages
            StartupConfiguration.registerStagedResource({
                name: 'test',
                required: true,
                actionCreator: actionCreator,
                actionNameSuccess: 'SUCCESS',
                actionNameFailure: 'FAULURE'
            })
            var config=StartupConfiguration.get()
            expect(Object.keys(config).length).to.equal(1) //stageobject has 1 stage
            expect(config[Object.keys(config)[0]].length).to.equal(1) //steparray of stage 0  has length 1
            StartupConfiguration.reset()
        })

    })
    describe('init', () => {
        let stubedregisterEpics
        let registerEpicSpy
        beforeEach(() => {
            ConfigureEpics.reset()
            registerEpicSpy=sinon.spy()
            stubedregisterEpics=sinon.stub(ConfigureEpics, 'registerEpic')
            stubedregisterEpics.callsFake(registerEpicSpy)
        })

        afterEach(() => {
            stubedregisterEpics.restore()
        })
        it('Should call 2 times register epics', () => {
            StartupConfiguration.init()
            expect(registerEpicSpy.callCount).to.equal(2)
        })

    })
})