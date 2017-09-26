import UfpCore from 'core/UfpCore'

describe('(UfpCore) Exists', () => {

    it('Should export a constant LOCATION_CHANGE.', () => {

        console.log('UFPCore is ', UfpCore)
        expect(UfpCore)
            .to
            .equal('LOCATION_CHANGE')
    })

})
