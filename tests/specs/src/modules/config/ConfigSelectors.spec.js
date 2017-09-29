import ConfigConstants from 'modules/config/ConfigConstants'
import ConfigSelectors from 'modules/config/ConfigSelectors'

describe('Module Ufp-Config ConfigSelectors ', () => {

    it('Should Exist', () => {
        expect(ConfigSelectors).to.exist
    })

    it('getConfigValue Should Exist ', () => {
        expect(ConfigSelectors.getConfigValue).to.exist
    })

})

/**
 {type: 'SET_CONFIG_VALUE', payload: Object{key: 'foo', value: 'bar', area: 'default'}}
 **/