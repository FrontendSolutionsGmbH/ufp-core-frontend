import MenuReducerName from 'menu/MenuReducerName'


describe('menu MenuReducerName', () => {
    afterEach(() => {
        MenuReducerName.reset()
    })
    describe('get', () => {
        it('Should without set call return ufpMenu', () => {
            expect(MenuReducerName.get()).to.be.equal('ufpMenu')
        })
        it('Should return the new value after set', () => {
            MenuReducerName.set('menu')
            expect(MenuReducerName.get()).to.be.equal('menu')
        })
    })
    describe('set', () => {
        it('Should set the name', () => {
            MenuReducerName.set('menu')
            expect(MenuReducerName.get()).to.be.equal('menu')
        })
        it('Should set the name only once', () => {
            MenuReducerName.set('menu')
            expect(MenuReducerName.get()).to.be.equal('menu')
            MenuReducerName.set('menuxxxxxx')
            expect(MenuReducerName.get()).to.be.equal('menu')
        })
    })
    describe('reset', () => {
        it('Should reset and make possible to call set again', () => {
            MenuReducerName.set('menu')
            expect(MenuReducerName.get()).to.be.equal('menu')
            MenuReducerName.reset()
            MenuReducerName.set('menuX')
            expect(MenuReducerName.get()).to.be.equal('menuX')
        })
    })
    describe('reducerNameOriginal', () => {
        it('Should return ufpMenu and be readonly', () => {
            expect(MenuReducerName.reducerNameOriginal).to.be.equal('ufpMenu')
            var res
            try {
                MenuReducerName.reducerNameOriginal='newValue'
            } catch(err) {
                res=err
            }
            expect(res).to.be.a('error')
        })
    })
})