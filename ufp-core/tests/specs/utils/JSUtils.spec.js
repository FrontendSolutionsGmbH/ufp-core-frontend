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
    describe('pad', () => {
        it('should fillup string left', () => {
            expect(JSUtils.pad('000', 't')).to.be.equal('00t')
        })
        it('should fillup string right', () => {
            expect(JSUtils.pad('000', 't', true)).to.be.equal('t00')
        })
        it('should return pad for undefined string', () => {
            expect(JSUtils.pad('000', undefined)).to.be.equal('000')
        })
    })

})