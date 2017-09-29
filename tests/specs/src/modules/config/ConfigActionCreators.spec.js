import ConfigConstants from 'modules/config/ConfigConstants'
import ConfigActionCreators from 'modules/config/ConfigActionCreators'

describe('Module Ufp-Config ConfigActionCreators ', () => {

    it('Should Exist', () => {
        expect(ConfigActionCreators).to.exist
    })

    it('Should throw with null params', () => {
        expect(() => ConfigActionCreators.setConfigValue())
            .to
            .throw()
    })

    it('Should throw with empty params', () => {
        expect(() => ConfigActionCreators.setConfigValue({}))
            .to
            .throw()
    })

    it('Should throw with only key params', () => {
        expect(() => ConfigActionCreators.setConfigValue({key: 'willi'}))
            .to
            .throw()
    })

    it('Should throw with only value params', () => {
        expect(() => ConfigActionCreators.setConfigValue({value: 'willi'}))
            .to
            .throw()
    })

    it('Payload contains correct values', () => {

        let result = ConfigActionCreators.setConfigValue({
            key: 'foo',
            value: 'bar'
        })

        // console.log('Result of set is ', result)

        expect(result.type)
            .be
            .equal(ConfigConstants.ACTION_NAMES.SET_CONFIG_VALUE)
        expect(result.payload.key)
            .be
            .equal('foo')
        expect(result.payload.value)
            .be
            .equal('bar')
        expect(result.payload.area)
            .be
            .equal(ConfigConstants.DEFAULT_AREA)

    })
    it('Payload contains correct values including area', () => {

        let result = ConfigActionCreators.setConfigValue({
            key: 'foo',
            value: 'bar',
            area: 'areatest'
        })

        // console.log('Result of set is ', result)

        expect(result.type)
            .be
            .equal(ConfigConstants.ACTION_NAMES.SET_CONFIG_VALUE)
        expect(result.payload.key)
            .be
            .equal('foo')
        expect(result.payload.value)
            .be
            .equal('bar')
        expect(result.payload.area)
            .be
            .equal('areatest')

    })

})

/**
 {type: 'SET_CONFIG_VALUE', payload: Object{key: 'foo', value: 'bar', area: 'default'}}
 **/