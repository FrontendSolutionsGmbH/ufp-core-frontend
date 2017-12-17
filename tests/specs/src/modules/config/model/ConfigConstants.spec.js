import ConfigConstants from 'modules/config/model/ConfigConstants'

describe('Module Ufp-Config ConfigConstants ', () => {

    it('Should Exist', () => {
        expect(ConfigConstants).to.exist
    })

    it('NAME=ConfigReducer', () => {
        expect(ConfigConstants.NAME)
            .to
            .equal('ConfigReducer')
    })
    it('DEFAULT_AREA=default', () => {
        expect(ConfigConstants.DEFAULT_AREA)
            .to
            .equal('default')
    })
    it('DEFAULT_VALUE=NOT-SET', () => {
        expect(ConfigConstants.DEFAULT_VALUE)
            .to
            .equal('NOT-SET')
    })
    it('ACTION_NAMES.SET_CONFIG_VALUE=SET_CONFIG_VALUE', () => {
        expect(ConfigConstants.ACTION_NAMES.SET_CONFIG_VALUE)
            .to
            .equal('SET_CONFIG_VALUE')
    })

})
