import UfpMiddlewareActionCreator from 'ufpmiddleware/UfpMiddlewareActionCreator'
import UFPRequestActions from 'ufpmiddleware/UfpRequestActions'

describe('ufpmiddleware UfpMiddlewareActionCreator', () => {

    describe('createActionCreatorForDefinition', () => {
        it('Should create a UFPAction', () => {
            expect(UfpMiddlewareActionCreator.createActionCreatorForDefinition).to.be.a('function')
            var testAction=( id, sort ) =>UfpMiddlewareActionCreator.createActionCreatorForDefinition({url:'/hello/:id', method:'get', requestType:'test'})({urlParams:{id:id}, queryParams:{sort:sort}})

            expect(testAction(7,'asc')).to.be.deep.equal({
                [UFPRequestActions.UFP_REQUEST_ACTION]: {
                    ufpDefinition:{url:'/hello/:id', method:'get', requestType:'test'},
                    ufpData: {
                        urlParams:{id:7},
                        queryParams:{sort:'asc'},
                        body:undefined
                    },
                    ufpPayload: {},
                    ufpPreHandler: [],
                    ufpResultHandler: []
                }
            })
        })
    })
})