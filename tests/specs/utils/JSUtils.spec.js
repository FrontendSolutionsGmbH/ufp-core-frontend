import JSUtils from 'utils/JSUtils'

describe('utils JSUtils', () => {
    describe('ThrowParam', () => {
        it('Should throw', (done) => {
            var error
            try {
                JSUtils.ThrowParam('test')
            } catch (err) {
                error=err
            }
            expect(error).to.be.a('error')
            done()
        })

    })

})