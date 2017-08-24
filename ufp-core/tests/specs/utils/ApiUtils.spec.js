import ApiUtils from 'utils/ApiUtils'

describe('utils ApiUtils', () => {
    it('Should be a object', () => {
        expect(ApiUtils).to.be.a('object')
    })
    describe('createActionConstantsForDefinition', () => {
        it('Should enhance ApiDefinition with ActionConstants', () => {
            var result=ApiUtils.createActionConstantsForApiDefinitions({Level1CamelCase:{level2:{url:'/hello', method:'post', requestType:'test'}}})
            expect(result.Level1CamelCase.level2.actionConstants).to.deep.equal(
                {REQUEST: 'LEVEL1_CAMEL_CASE_LEVEL2_REQUEST',
                    SUCCESS: 'LEVEL1_CAMEL_CASE_LEVEL2_SUCCESS',
                    END: 'LEVEL1_CAMEL_CASE_LEVEL2_END',
                    FAILURE: 'LEVEL1_CAMEL_CASE_LEVEL2_FAILURE'})
        })

    })
    describe('traverseDefinition', () => {
        it('Should travers a deep object of ApiDefinition', () => {
            var callbackHandler = sinon.stub();
            var definitionObj = {
                part: {
                    getGlobals: {
                        url: 'api/Globals',
                        method: 'get',
                        requestType: 'api'
                    }
                }
            }
            ApiUtils.traverseDefinition(definitionObj, callbackHandler)
            expect(callbackHandler.callCount).to.be.equal(1)
            expect(callbackHandler.getCall(0).args).to.be.deep.equal([['part', 'getGlobals'], {
                url: 'api/Globals',
                method: 'get',
                requestType: 'api'
            }])
        })
    })
})