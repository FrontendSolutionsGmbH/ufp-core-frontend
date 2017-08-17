import StartupReducerName from 'startup/StartupReducerName'


describe('startup StartupReducerName', () => {
    afterEach(() => {
        StartupReducerName.reset()
    })
    describe('get', () => {
        it('Should without set call return ufpStartup', () => {
            expect(StartupReducerName.get()).to.be.equal('ufpStartup')
        })
        it('Should return the new value after set', () => {
            StartupReducerName.set('startup')
            expect(StartupReducerName.get()).to.be.equal('startup')
        })
    })
    describe('set', () => {
        it('Should set the name', () => {
            StartupReducerName.set('startup')
            expect(StartupReducerName.get()).to.be.equal('startup')
        })
        it('Should set the name only once', () => {
            StartupReducerName.set('startup')
            expect(StartupReducerName.get()).to.be.equal('startup')
            StartupReducerName.set('startupxxxxxx')
            expect(StartupReducerName.get()).to.be.equal('startup')
        })
    })
    describe('reset', () => {
        it('Should reset and make possible to call set again', () => {
            StartupReducerName.set('startup')
            expect(StartupReducerName.get()).to.be.equal('startup')
            StartupReducerName.reset()
            StartupReducerName.set('startupX')
            expect(StartupReducerName.get()).to.be.equal('startupX')
        })
    })
    describe('reducerNameOriginal', () => {
        it('Should return startup and be readonly', () => {
            expect(StartupReducerName.reducerNameOriginal).to.be.equal('ufpStartup')
            var res
            try {
                StartupReducerName.reducerNameOriginal='newValue'
            } catch(err) {
                res=err
            }
            expect(res).to.be.a('error')

        })
    })
})