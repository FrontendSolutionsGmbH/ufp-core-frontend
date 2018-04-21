import {ReplaceRouteVariables} from 'modules/react-redux-hash-router4/util'

const testData = {var1: 'testValue'}

describe('ReplaceRouteVariables tests ', () => {
    it('Should Exist', () => {
        expect(ReplaceRouteVariables).to.exist
    })

    it('Should replace vars', () => {

        expect(ReplaceRouteVariables(':var1', testData)).to.equal(testData.var1)
        expect(ReplaceRouteVariables('/:var1', testData)).to.equal(`/${testData.var1}`)
        expect(ReplaceRouteVariables('/:var1/:var2', testData)).to.equal(`/${testData.var1}`)
        expect(ReplaceRouteVariables('/:var1/:var2?', testData)).to.equal(`/${testData.var1}`)

    })

})
