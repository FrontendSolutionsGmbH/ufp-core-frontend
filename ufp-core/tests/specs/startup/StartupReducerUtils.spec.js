import StartupReducerUtils from 'startup/StartupReducerUtils'


describe('startup StartupReducerUtils', () => {
    describe('getInitialState', () => {
        it('should return the expected result', () => {
            var stageDef = {
                stage000: [{
                    stage: 0,
                    name: 'step1',
                    required: true,
                    actionCreator: 'aFunction',
                    actionCreatorParams: ['test'],
                    actionNameSuccess: 'SUCCESS1',
                    actionNameFailure: 'FAULURE1'
                }],
                stage001: [{
                    stage: 1,
                    name: 'step2',
                    required: true,
                    actionCreator: 'aFunction',
                    actionCreatorParams: [21, 'paramter2'],
                    actionNameSuccess: 'SUCCESS2',
                    actionNameFailure: 'FAULURE2'
                }]

            }
            var res = StartupReducerUtils.getInitialState(stageDef)
            expect(res).to.deep.equal({
                status: {
                    currentStageIndex: -1,
                    appInitialised: false,
                    loadingState: 'notLoaded',
                    stagePercentage: 0,
                    totalPercentage: 0,
                    stepPercentage: 0,
                    totalStages: 2,
                    totalSteps: 2,
                    totalFinishedSteps: 0
                },
                stageStatus: {
                    0: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 1
                    },
                    1: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 1
                    }
                },
                stepStatus: {
                    step1: 'notLoaded',
                    step2: 'notLoaded'
                },
                stageDefinition: stageDef
            })
        })
    })
    describe('updateStatus', () => {
        it('should return the expected result', () => {
            var state = {
                status: {
                    currentStageIndex: 0,
                    appInitialised: false,
                    loadingState: 'loading',
                    stagePercentage: 0,
                    totalPercentage: 0,
                    stepPercentage: 0,
                    totalStages: 2,
                    totalSteps: 3,
                    totalFinishedSteps: 1
                },
                stageStatus: {
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
                }
            }
            var newState=StartupReducerUtils.updateStatus(state)
            expect(newState).to.deep.equal({
                status: {
                    currentStageIndex: 0,
                    appInitialised: false,
                    loadingState: 'loading',
                    stagePercentage: 50,
                    totalPercentage: 25,
                    stepPercentage: 33.33333333333333,
                    totalStages: 2,
                    totalSteps: 3,
                    totalFinishedSteps: 1
                },
                stageStatus: {
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
                }
            })
        })
        it('should return the expected result', () => {
            var state = {
                status: {
                    currentStageIndex: 0,
                    appInitialised: false,
                    loadingState: 'loading',
                    stagePercentage: 0,
                    totalPercentage: 0,
                    stepPercentage: 0,
                    totalStages: 2,
                    totalSteps: 3,
                    totalFinishedSteps: 2
                },
                stageStatus: {
                    0: {
                        failureCount: 0,
                        successCount: 2,
                        totalSteps: 2
                    },
                    1: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 1
                    }
                }
            }
            var newState=StartupReducerUtils.updateStatus(state)
            expect(newState.status).to.have.property('stagePercentage', 100)
        })
    })
    describe('stepReducer', () => {
        var stubedUpdateStatus
        beforeEach(() => {
            stubedUpdateStatus=sinon.stub(StartupReducerUtils, 'updateStatus')
        })

        afterEach(() => {
            stubedUpdateStatus.restore()
        })
        it('should return the expected result if a actionNameSuccess matches', () => {
            /* istanbul ignore next */
            stubedUpdateStatus.callsFake((state) => state)
            var state = {
                status: {
                    currentStageIndex: 0,
                    appInitialised: false,
                    loadingState: 'loading',
                    stagePercentage: 0,
                    totalPercentage: 0,
                    stepPercentage: 0,
                    totalStages: 2,
                    totalSteps: 3,
                    totalFinishedSteps: 0
                },
                stageStatus: {
                    0: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 2
                    },
                    1: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 1
                    }
                },
                stepStatus: {
                    step1: 'notLoaded',
                    step2: 'notLoaded',
                    step3: 'notLoaded'
                },
                stageDefinition: {
                    stage000: [{
                        stage: 0,
                        name: 'step1',
                        required: true,
                        actionCreator: 'aFunction',
                        actionCreatorParams: ['test'],
                        actionNameSuccess: 'SUCCESS1',
                        actionNameFailure: 'FAILURE1'
                    },{
                        stage: 0,
                        name: 'step2',
                        required: true,
                        actionCreator: 'aFunction1',
                        actionCreatorParams: ['test'],
                        actionNameSuccess: 'SUCCESS2',
                        actionNameFailure: 'FAILURE2'
                    }],
                    stage001: [{
                        stage: 1,
                        name: 'step3',
                        required: true,
                        actionCreator: 'aFunction',
                        actionCreatorParams: [21, 'paramter2'],
                        actionNameSuccess: 'SUCCESS3',
                        actionNameFailure: 'FAILURE3'
                    }]

                }
            }
            var newState=StartupReducerUtils.stepReducer(state, {type: 'SUCCESS1'})
            expect(newState.stepStatus.step1).to.equal('success')
            expect(newState.status.totalFinishedSteps).to.equal(1)
            expect(newState.stageStatus[0].successCount).to.equal(1)
        })
        it('should return the expected result if a actionNameFailure matches', () => {
            /* istanbul ignore next */
            stubedUpdateStatus.callsFake((state) => state)
            var state = {
                status: {
                    currentStageIndex: 0,
                    appInitialised: false,
                    loadingState: 'loading',
                    stagePercentage: 0,
                    totalPercentage: 0,
                    stepPercentage: 0,
                    totalStages: 2,
                    totalSteps: 3,
                    totalFinishedSteps: 0
                },
                stageStatus: {
                    0: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 2
                    },
                    1: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 1
                    }
                },
                stepStatus: {
                    step1: 'notLoaded',
                    step2: 'notLoaded',
                    step3: 'notLoaded'
                },
                stageDefinition: {
                    stage000: [{
                        stage: 0,
                        name: 'step1',
                        required: true,
                        actionCreator: 'aFunction',
                        actionCreatorParams: ['test'],
                        actionNameSuccess: 'SUCCESS1',
                        actionNameFailure: 'FAILURE1'
                    },{
                        stage: 0,
                        name: 'step2',
                        required: true,
                        actionCreator: 'aFunction1',
                        actionCreatorParams: ['test'],
                        actionNameSuccess: 'SUCCESS2',
                        actionNameFailure: 'FAILURE2'
                    }],
                    stage001: [{
                        stage: 1,
                        name: 'step3',
                        required: true,
                        actionCreator: 'aFunction',
                        actionCreatorParams: [21, 'paramter2'],
                        actionNameSuccess: 'SUCCESS3',
                        actionNameFailure: 'FAILURE3'
                    }]

                }
            }
            var newState=StartupReducerUtils.stepReducer(state, {type: 'FAILURE1'})
            expect(newState.stepStatus.step1).to.equal('failure')
            expect(newState.status.totalFinishedSteps).to.equal(0)
            expect(newState.stageStatus[0].successCount).to.equal(0)
            expect(newState.stageStatus[0].failureCount).to.equal(1)
        })
        it('should return the expected result if a actionNameFailure matches but not required', () => {
            /* istanbul ignore next */
            stubedUpdateStatus.callsFake((state) => state)
            var state = {
                status: {
                    currentStageIndex: 0,
                    appInitialised: false,
                    loadingState: 'loading',
                    stagePercentage: 0,
                    totalPercentage: 0,
                    stepPercentage: 0,
                    totalStages: 2,
                    totalSteps: 3,
                    totalFinishedSteps: 0
                },
                stageStatus: {
                    0: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 2
                    },
                    1: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 1
                    }
                },
                stepStatus: {
                    step1: 'notLoaded',
                    step2: 'notLoaded',
                    step3: 'notLoaded'
                },
                stageDefinition: {
                    stage000: [{
                        stage: 0,
                        name: 'step1',
                        required: false,
                        actionCreator: 'aFunction',
                        actionCreatorParams: ['test'],
                        actionNameSuccess: 'SUCCESS1',
                        actionNameFailure: 'FAILURE1'
                    },{
                        stage: 0,
                        name: 'step2',
                        required: true,
                        actionCreator: 'aFunction1',
                        actionCreatorParams: ['test'],
                        actionNameSuccess: 'SUCCESS2',
                        actionNameFailure: 'FAILURE2'
                    }],
                    stage001: [{
                        stage: 1,
                        name: 'step3',
                        required: true,
                        actionCreator: 'aFunction',
                        actionCreatorParams: [21, 'paramter2'],
                        actionNameSuccess: 'SUCCESS3',
                        actionNameFailure: 'FAILURE3'
                    }]

                }
            }
            var newState=StartupReducerUtils.stepReducer(state, {type: 'FAILURE1'})
            expect(newState.stepStatus.step1).to.equal('failure')
            expect(newState.status.totalFinishedSteps).to.equal(1)
            expect(newState.stageStatus[0].successCount).to.equal(1)
            expect(newState.stageStatus[0].failureCount).to.equal(0)
        })
        it('should return the state before if currentStageIndex === -1', () => {
            /* istanbul ignore next */
            stubedUpdateStatus.callsFake((state) => state)
            var state = {
                status: {
                    currentStageIndex: -1,
                    appInitialised: false,
                    loadingState: 'loading',
                    stagePercentage: 0,
                    totalPercentage: 0,
                    stepPercentage: 0,
                    totalStages: 2,
                    totalSteps: 3,
                    totalFinishedSteps: 0
                },
                stageStatus: {
                    0: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 2
                    },
                    1: {
                        failureCount: 0,
                        successCount: 0,
                        totalSteps: 1
                    }
                },
                stepStatus: {
                    step1: 'notLoaded',
                    step2: 'notLoaded',
                    step3: 'notLoaded'
                },
                stageDefinition: {
                    stage000: [{
                        stage: 0,
                        name: 'step1',
                        required: false,
                        actionCreator: 'aFunction',
                        actionCreatorParams: ['test'],
                        actionNameSuccess: 'SUCCESS1',
                        actionNameFailure: 'FAILURE1'
                    },{
                        stage: 0,
                        name: 'step2',
                        required: true,
                        actionCreator: 'aFunction1',
                        actionCreatorParams: ['test'],
                        actionNameSuccess: 'SUCCESS2',
                        actionNameFailure: 'FAILURE2'
                    }],
                    stage001: [{
                        stage: 1,
                        name: 'step3',
                        required: true,
                        actionCreator: 'aFunction',
                        actionCreatorParams: [21, 'paramter2'],
                        actionNameSuccess: 'SUCCESS3',
                        actionNameFailure: 'FAILURE3'
                    }]

                }
            }
            var newState=StartupReducerUtils.stepReducer(state, {type: 'FAILURE1'})
            expect(newState===state).to.equal(true)
        })
        it('should return the state before if no matching actionNameSuccess or actionNameFailure', () => {
            /* istanbul ignore next */
            stubedUpdateStatus.callsFake((state) => state)
            var state = {
                status: {
                    currentStageIndex: 0,

                },
                stageDefinition: {
                    stage000: [{
                        stage: 0,
                        name: 'step1',
                        required: false,
                        actionCreator: 'aFunction',
                        actionCreatorParams: ['test'],
                        actionNameSuccess: 'SUCCESS1',
                        actionNameFailure: 'FAILURE1'
                    },{
                        stage: 0,
                        name: 'step2',
                        required: true,
                        actionCreator: 'aFunction1',
                        actionCreatorParams: ['test'],
                        actionNameSuccess: 'SUCCESS2',
                        actionNameFailure: 'FAILURE2'
                    }],
                    stage001: [{
                        stage: 1,
                        name: 'step3',
                        required: true,
                        actionCreator: 'aFunction',
                        actionCreatorParams: [21, 'paramter2'],
                        actionNameSuccess: 'SUCCESS3',
                        actionNameFailure: 'FAILURE3'
                    }]
                }
            }
            var newState=StartupReducerUtils.stepReducer(state, {type: 'SOME_OTHER_TYPE'})
            expect(newState===state).to.equal(true)
        })
    })
})