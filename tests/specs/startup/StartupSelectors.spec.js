import StartupSelectors from 'startup/StartupSelectors'

var exampleState={
    ufpStartup: {
        stageDefinition: {
            stage000: [{name: 'step1'},{name: 'step2'}],
            stage001: [{name: 'step3'}]
        },
        stepStatus:{
            step1: 'success',
            step2: 'notLoaded',
            step3: 'notLoaded'
        },
        stageStatus:{
            0: {
                failureCount: 0,
                successCount: 1,
                totalSteps: 2
            },
            1: {
                failureCount: 0,
                successCount: 0,
                totalSteps: 1
            }
        },
        status:{
            appInitialised: false,
            currentStageIndex: 0,
            totalFinishedSteps: 1,
            loadingState: 'loading',
            stagePercentage: 50,
            stepPercentage: 33.33333333333333,
            totalPercentage: 25,
            totalStages: 2,
            totalSteps: 3,
        }
    }
}

describe('startup StartupSelectors', () => {

    it('Should return the correct part of state', () => {
        expect(StartupSelectors.StageDefinitionSelector(exampleState)).to.be.deep.equal({
            stage000: [{name: 'step1'},{name: 'step2'}],
            stage001: [{name: 'step3'}]
        })
    })
    it('Should return the correct part of state', () => {
        expect(StartupSelectors.StepStatusSelector(exampleState)).to.be.deep.equal({
            step1: 'success',
            step2: 'notLoaded',
            step3: 'notLoaded'
        })
    })
    it('Should return the correct part of state', () => {
        expect(StartupSelectors.StageStatusSelector(exampleState)).to.be.deep.equal({
            0: {
                failureCount: 0,
                successCount: 1,
                totalSteps: 2
            },
            1: {
                failureCount: 0,
                successCount: 0,
                totalSteps: 1
            }
        })
    })
    it('Should return the correct part of state', () => {
        expect(StartupSelectors.AppInitialisedSelector(exampleState)).to.be.equal(false)
    })
    it('Should return the correct part of state', () => {
        expect(StartupSelectors.LoadingStateSelector(exampleState)).to.be.equal('loading')
    })

    it('Should return the correct part of state', () => {
        expect(StartupSelectors.CurrentStageIndexSelector(exampleState)).to.be.equal(0)
    })
    it('Should return the correct part of state', () => {
        expect(StartupSelectors.TotalFinishedStepsSelector(exampleState)).to.be.equal(1)
    })
    it('Should return the correct part of state', () => {
        expect(StartupSelectors.TotalStagesSelector(exampleState)).to.be.equal(2)
    })
    it('Should return the correct part of state', () => {
        expect(StartupSelectors.TotalStepsSelector(exampleState)).to.be.equal(3)
    })
    it('Should return the correct part of state', () => {
        expect(StartupSelectors.TotalPercentageSelector(exampleState)).to.be.equal(25)
    })
    it('Should return the correct part of state', () => {
        expect(StartupSelectors.StagePercentageSelector(exampleState)).to.be.equal(50)
    })
    it('Should return the correct part of state', () => {
        expect(StartupSelectors.StepPercentageSelector(exampleState)).to.be.equal(33.33333333333333)
    })
})