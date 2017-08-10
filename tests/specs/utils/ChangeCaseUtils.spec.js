import ChangeCaseUtils from 'utils/ChangeCaseUtils'

describe('utils ChangeCaseUtils', () => {
    it('Should be a object', () => {
        expect(ChangeCaseUtils).to.be.a('object')
    })
    describe('camelCaseToConstant', () => {
        it('Should change string case', () => {
            expect(ChangeCaseUtils.camelCaseToConstant('TypeOfData.AlphaBeta')).to.equal('TYPE_OF_DATA_._ALPHA_BETA')

        })
    })
    describe('toSnakeCaseUpperCase', () => {
        it('Should change string case', () => {
            expect(ChangeCaseUtils.toSnakeCaseUpperCase('TypeOfData.AlphaBeta')).to.equal('TYPE_OF_DATA_ALPHA_BETA')
        })
    })
    describe('toSnakeCase', () => {
        it('Should change string case', () => {
            expect(ChangeCaseUtils.toSnakeCase('TypeOfData.AlphaBeta')).to.equal('type_of_data_alpha_beta')
        })
    })
    describe('toSnakeCaseUpperCase2', () => {
        it('Should change string case', () => {
            expect(ChangeCaseUtils.toSnakeCaseUpperCase2('TypeOfData.AAAAlphaBeta')).to.equal('TYPE_OF_DATA_AAAALPHA_BETA')
            expect(ChangeCaseUtils.toSnakeCaseUpperCase2('TypeOfData.AAAA.AlphaBeta')).to.equal('TYPE_OF_DATA_AAAA_ALPHA_BETA')
        })
    })
    describe('toSnakeCase2', () => {
        it('Should change string case', () => {
            expect(ChangeCaseUtils.toSnakeCase2('TypeOfData.AAAAlphaBeta')).to.equal('type_of_data_aaaalpha_beta')
            expect(ChangeCaseUtils.toSnakeCase2('TypeOfData.AAAA.AlphaBeta')).to.equal('type_of_data_aaaa_alpha_beta')
        })
    })
})