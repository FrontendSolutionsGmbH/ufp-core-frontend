import ConfigReducerCreatorFunction from 'modules/config/ConfigReducerCreatorFunction'
import ConfigActionCreators from 'modules/config/ConfigActionCreators'

var configState = {}
function makeSetterTest(configReducer, {

    key,
    value,
    area

}) {
    /**
     * this method creates the required action obtained by the actioncreators
     * and forwards it to the reducer which should in turn return the changed
     * state
     */
    var result
    const setFooAction = ConfigActionCreators.setConfigValue({
        key,
        value,
        area
    })

    result = configReducer(configState, setFooAction)
    return result

}

describe('Module Ufp-Config ConfigReducer ', () => {

    /**
     * configstate is the current working state of the configreducer
     * this is the object we test here with our reduce
     *
     */


    it('Should Exist', () => {
        expect(ConfigReducerCreatorFunction).to.exist
    })

    var configReducer

    it('Reducer Creater returns non-null', () => {
        configReducer = ConfigReducerCreatorFunction(configState)

        expect(configReducer).to.exist
    })

    it('Should throw on missing action', () => {
        expect(() => configReducer(configState))
            .to
            .throw()

    })
    it('Should return unchanged state on empty action', () => {
        const result = configReducer(configState, {type: 'any-action'})

        expect(result)
            .to
            .equal(configState)

    })

    /**
     * having the rought expected behaviour tested, we now use the actionCreator
     * to obtain the actions for easing managing what we want to test, any
     * action is received at some point to the reducer
     */

    it('Test plain property set', () => {

        var result = makeSetterTest(configReducer, {
            key: 'foo',
            value: 'bar',
            area: 'areaTest'
        })

        console.log('RESULccccTI IS ', result)

        expect(result.data['areaTest']['foo']).to.exist
        expect(result.data['areaTest']['foo'])
            .to
            .equal('bar')
    })

    it('Test deep property set', () => {

        var result = makeSetterTest(configReducer, {
            key: 'foo.bar',
            value: 'bar',
            area: 'areaTest'
        })

        console.log('Result Deep Property  ', result)

        expect(result.data['areaTest']['foo']).to.exist
        expect(result.data['areaTest']['foo'])
            .to
            .exist
        expect(result.data['areaTest']['foo']['bar'])
            .to
            .equal('bar')

    })

    it('Test invalid input syntax', () => {

        const func = () => makeSetterTest(configReducer, {
            key: 'foo[0].bar',
            value: 'bar',
            area: 'areaTest'
        })

        expect(func)
            .to
            .throw()
    })

})
