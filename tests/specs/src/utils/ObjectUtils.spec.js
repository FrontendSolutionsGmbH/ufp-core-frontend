import ObjectUtils from 'utils/ObjectUtils'
import update from 'immutability-helper'
describe('Class ObjectUtils', () => {

    it('Should Exist', () => {
        expect(ObjectUtils).to.exist
    })

    describe('createUpdate Test', () => {

        it('createUpdate Should Exist', () => {
            expect(ObjectUtils.createUpdate).to.exist
        })

        it('makeUpdate creates update() config from path and input obj {}', () => {

            var input = {}

            let result = ObjectUtils.createUpdate(input, 'foo.bar.value', 'foobarvalue')

            // verify expected response
            expect(result.foo).to.exist
            expect(result.foo.$set).to.exist

            // execute generated update command
            let newObject = update(input, result)

            expect(newObject.foo).to.exist
            expect(newObject.foo.bar).to.exist
            expect(newObject.foo.bar.value).to.exist
            expect(newObject.foo.bar.value)
                .to
                .equal('foobarvalue')

            // console.log('createUpdate Result is ', result)
            // console.log('createUpdate Result is Object ', newObject)

        })

        it('makeUpdate creates update() config from path and input obj { foo: string }', () => {
            let input = {foo: 'test'}
            let result = ObjectUtils.createUpdate(input, 'foo.bar.value', 'foobarvalue')

            expect(result.foo).to.exist
            expect(result.foo.$set).to.exist

            let newObject = update(input, result)

            expect(newObject.foo).to.exist
            expect(newObject.foo.bar).to.exist
            expect(newObject.foo.bar.value).to.exist
            expect(newObject.foo.bar.value)
                .to
                .equal('foobarvalue')

        })

        it('makeUpdate creates update() config from path and input obj { foo: ...}', () => {

            let input = {foo: {}}
            let result = ObjectUtils.createUpdate(input, 'foo.bar.value', 'foobarvalue')
            console.log(result)
            expect(result.foo).to.exist
            expect(result.foo.bar).to.exist
            expect(result.foo.bar.$set).to.exist

            let newObject = update(input, result)

            expect(newObject.foo).to.exist
            expect(newObject.foo.bar).to.exist
            expect(newObject.foo.bar.value).to.exist
            expect(newObject.foo.bar.value)
                .to
                .equal('foobarvalue')

        })
    })

    describe('getObjectForPath Test', () => {

        it('buildUpdateObjectSetValue Should Exist', () => {
            expect(ObjectUtils.getObjectForPath).to.exist
        })

        it('getObjectForPath creates object from path', () => {
            let result = ObjectUtils.getObjectForPath('foo.bar.value', 'foobarvalue')
            expect(result).to.exist
            expect(result.foo).to.exist
            expect(result.foo.bar).to.exist
            expect(result.foo.bar.value).to.exist
            expect(result.foo.bar.value)
                .to
                .equal('foobarvalue')
        })
    })

    describe('buildUpdateObjectSetValue Test', () => {

        it('buildUpdateObjectSetValue Should Exist', () => {
            expect(ObjectUtils.buildUpdateObjectSetValue).to.exist
        })

        it('buildUpdateObjectSetValue is deprecated and should throw error on call', () => {

            expect(() => ObjectUtils.buildUpdateObjectSetValue('foo.bar.value', 'foobarvalue'))
                .to
                .throw()
        })
    })

    describe('isObjectEmpty Test', () => {
        it('isObjectEmpty Should Exist', () => {
            expect(ObjectUtils.isObjectEmpty).to.exist
        })

        it('isObjectEmpty test', () => {
            expect(ObjectUtils.isObjectEmpty({})).to.be.true
            expect(ObjectUtils.isObjectEmpty({foo: undefined})).to.be.false
        })
    })

})

