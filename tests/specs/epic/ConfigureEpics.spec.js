import ConfigureEpics from 'epic/ConfigureEpics'
function noop() {}
describe('epics ConfigureEpics', () => {
    let stubedgetEpics
    beforeEach(() => {
        stubedgetEpics=sinon.stub(ConfigureEpics, 'getEpics')
    })

    afterEach(() => {
        stubedgetEpics.restore()
    })
    it('Should call next with the origninal action and dispatch with the mapped action', () => {
        noop()
        var next=sinon.spy()
        var testEpic=action$ =>
            action$.filter(action => action.type === 'TEST_PING')
                .mapTo({type: 'TEST_PONG'})
        stubedgetEpics.returns([testEpic])
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        expect(ConfigureEpics).to.have.property('epics')
        ConfigureEpics.createEpicMiddleware()(store)(next)({
            type:'TEST_PING'
        })
        expect(next.callCount).to.equal(1)
        expect(next.args[0][0]).to.deep.equal({
            type:'TEST_PING'
        })
        expect(store.dispatch.callCount).to.equal(1)
        expect(store.dispatch.args[0][0]).to.deep.equal({
            type:'TEST_PONG'
        })
    })
    it('Should add the epic on register to the internal array', () => {
        stubedgetEpics.restore()
        var testEpic=noop
        expect(ConfigureEpics.getEpics()).to.deep.equal([])
        ConfigureEpics.registerEpic({epic:testEpic})
        expect(ConfigureEpics.getEpics().length).to.equal(1)
    })
    it('Should throw if no argument', (done) => {
        stubedgetEpics.restore()
        var error
        try {
            ConfigureEpics.registerEpic()
        } catch(err) {
            error=err
        }
        expect(error).to.be.a('error')
        done()
    })
    it('Should throw if no argument', (done) => {
        stubedgetEpics.restore()
        var error
        try {
            ConfigureEpics.registerEpic({})
        } catch(err) {
            error=err
        }
        expect(error).to.be.a('error')
        done()
    })
})