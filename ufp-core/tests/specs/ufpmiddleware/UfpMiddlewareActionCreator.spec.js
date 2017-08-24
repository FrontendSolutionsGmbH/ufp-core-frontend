import UfpMiddlewareActionCreator from 'ufpmiddleware/UfpMiddlewareActionCreator'
import UFPRequestActions from 'ufpmiddleware/UfpRequestActions'
function noop() {}
describe('ufpmiddleware UfpMiddlewareActionCreator', () => {

    describe('createActionCreatorForDefinition', () => {
        it('Should create a UFPAction', () => {
            noop()
            expect(UfpMiddlewareActionCreator.createActionCreatorForDefinition).to.be.a('function')
            var testAction=( id, sort ) => UfpMiddlewareActionCreator.createActionCreatorForDefinition({url:'/hello/:id', method:'get', requestType:'test'})({urlParams:{id:id}, queryParams:{sort:sort}})

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
        it('Should create a UFPAction', () => {
            expect(UfpMiddlewareActionCreator.createActionCreatorForDefinition).to.be.a('function')
            var testAction=( id, sort, body ) => UfpMiddlewareActionCreator.createActionCreatorForDefinition({url:'/hello/:id', method:'post', requestType:'test'},
                [{
                    matcher:noop,
                    handler:noop
                }],[{
                    matcher:noop,
                    handler:noop
                }])({urlParams:{id:id}, queryParams:{sort:sort}, body:body})

            expect(testAction(7,'asc', {test:'test'})).to.be.deep.equal({
                [UFPRequestActions.UFP_REQUEST_ACTION]: {
                    ufpDefinition:{url:'/hello/:id', method:'post', requestType:'test'},
                    ufpData: {
                        urlParams:{id:7},
                        queryParams:{sort:'asc'},
                        body:{test:'test'}
                    },
                    ufpPayload: {},
                    ufpPreHandler: [{
                        matcher:noop,
                        handler:noop
                    }],
                    ufpResultHandler: [{
                        matcher:noop,
                        handler:noop
                    }]
                }
            })
        })
        it('Should create a UFPAction', () => {
            expect(UfpMiddlewareActionCreator.createActionCreatorForDefinition).to.be.a('function')
            var testAction=() =>UfpMiddlewareActionCreator.createActionCreatorForDefinition({url:'/hello', method:'get', requestType:'test'})()

            expect(testAction()).to.be.deep.equal({
                [UFPRequestActions.UFP_REQUEST_ACTION]: {
                    ufpDefinition:{url:'/hello', method:'get', requestType:'test'},
                    ufpData: {
                        urlParams:{},
                        queryParams:{},
                        body: undefined
                    },
                    ufpPayload: {},
                    ufpPreHandler: [],
                    ufpResultHandler: []
                }
            })
        })
        it('Should create a UFPAction', () => {
            expect(UfpMiddlewareActionCreator.createActionCreatorForDefinition).to.be.a('function')
            var testAction=() =>UfpMiddlewareActionCreator.createActionCreatorForDefinition()({ufpPayload:{test:'test'}})

            expect(testAction()).to.be.deep.equal({
                [UFPRequestActions.UFP_REQUEST_ACTION]: {
                    ufpDefinition:undefined,
                    ufpData: {
                        urlParams:{},
                        queryParams:{},
                        body: undefined
                    },
                    ufpPayload: {test:'test'},
                    ufpPreHandler: [],
                    ufpResultHandler: []
                }
            })
        })
    })
})