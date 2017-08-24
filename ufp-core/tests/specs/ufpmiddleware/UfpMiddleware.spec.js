
import UFPRequestActions from 'ufpmiddleware/UfpRequestActions'
import {InvalidUFPAction} from 'ufpmiddleware/Errors'
import UFPMiddlewareConfiguration from 'ufpmiddleware/UfpMiddlewareConfiguration'
import UfpMiddlewareUtils from 'ufpmiddleware/UfpMiddlewareUtils'
import createUfpMiddleware from 'ufpmiddleware/UfpMiddleware'
function noop() {}
function jsonOk (body={}) {
    return new window.Response(JSON.stringify(body), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })
}

function jsonError (status, body={}) {
    return new window.Response(JSON.stringify(body), {
        status: status,
        headers: {
            'Content-type': 'application/json'
        }
    })
}
describe('ufpmiddleware UfpMiddleware', () => {
    let stubedConfigGet
    let stubedFetch
    let stubedInfoLogger
    beforeEach(() => {
        stubedInfoLogger=sinon.stub(UfpMiddlewareUtils, 'infoLogger')

        stubedConfigGet=sinon.stub(UFPMiddlewareConfiguration, 'get')
        stubedFetch=sinon.stub(window, 'fetch')
    })

    afterEach(() => {
        stubedInfoLogger.restore()
        stubedFetch.restore()
        stubedConfigGet.restore()
    })
    it('Should create UfpMiddleware and returning for not ufpAction', (done) => {
       noop()
       expect(createUfpMiddleware).to.be.a('function')
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:noop
        }
        var notUFPAction={
            type:'test',
            payload:{}
        }
       expect(createUfpMiddleware()).to.be.a('function')
       expect(createUfpMiddleware()(store)).to.be.a('function')
        createUfpMiddleware()(store)(next)(notUFPAction)
        expect(next.callCount).to.be.equal(1)
        expect(next.getCall(0).args[0]).to.be.deep.equal(notUFPAction)
        done()
    })
    it('Should create UfpMiddleware and returning for not ufpAction', async() => {

        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var notValidUFPAction={
            [UFPRequestActions.UFP_REQUEST_ACTION]:{}
        }

        var result =await createUfpMiddleware()(store)(next)(notValidUFPAction)
        expect(next.callCount).to.be.equal(0)
        expect(store.dispatch.callCount).to.be.equal(1)
        expect(result).to.be.an('error')
        expect(result.name).to.be.equal('InvalidUFPAction')
    })
    it('Should call for validUFPAction', async() => {
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [],
                unhandledResultHandler: []
            },
            preRequestHandling: [],
            createConfig: (config) => {
                config.headers = {
                    'Content-Type': 'application/json'
                }
                return config
            }
        })
        stubedFetch.resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: [{
                matcher:() => true,
                handler:() => ({ handled:true, success: true, retry:false})
            }]
        }}

        var result =await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(next.callCount).to.be.equal(0)
        expect(store.dispatch.callCount).to.be.equal(3) //request, success , end

    })
    it('Should work if no createConfig registered', async() => {
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [],
                unhandledResultHandler: []
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: []
        }}

        var result= await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(next.callCount).to.be.equal(0)
        expect(store.dispatch.callCount).to.be.equal(3) //request, success , end

    })
    it('Should make no request if PreHandler returned break:true', async() => {
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [],
                unhandledResultHandler: []
            },
            preRequestHandling: [{
                matcher:() => true,
                handler: () => ({
                    break:true,
                    handled:true
                })
            }],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: []
        }}

        var result= await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(next.callCount).to.be.equal(0)
        expect(store.dispatch.callCount).to.be.equal(2) //END and FAILURE with payload is Error

    })

    it('Should call infoLogger when options.debug:true', async() => {
        //stubedInfoLogger.callsFake(() =>  console.log('stub called'))
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [],
                unhandledResultHandler: [{
                    matcher:() => true,
                    handler: () => ({
                        handled:true,
                        success:true,
                        retry:false
                    })
                }]
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: []
        }}

        var result= await createUfpMiddleware({debug:true})(store)(next)(validUFPAction)
        expect(stubedInfoLogger.callCount).to.be.equal(2)
    })
    it('Should call infoLogger when options.debug:true', async() => {
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [],
                unhandledResultHandler: [{
                    matcher:() => true,
                    handler: () => ({
                        handled:true,
                        success:false,
                        retry:false
                    })
                }]
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonError(400))
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: []
        }}

        var result= await createUfpMiddleware({debug:true})(store)(next)(validUFPAction)
        expect(stubedInfoLogger.callCount).to.be.equal(2)
    })
    it('Should return success ufpAction resulthandler', async() => {
        //stubedInfoLogger.callsFake(() =>  console.log('stub called'))
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [],
                unhandledResultHandler: []
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END111',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: [{
                matcher:() => true,
                handler: () => ({
                    handled:true,
                    success:true,
                    retry:false
                })
            }]
        }}
        var result= await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(store.dispatch.callCount).to.be.equal(3) //REQUEST ,SUCCESS , END
    })
    it('Should return handled false  ufpAction resulthandler, and generic resulthandler true', async() => {
        //stubedInfoLogger.callsFake(() =>  console.log('stub called'))
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [{
                    matcher:() => true,
                    handler: () => ({
                        handled:false,
                        success:false,
                        retry:false
                    })
                }],
                unhandledResultHandler: [{
                    matcher:() => true,
                    handler: () => ({
                        handled:true,
                        success:true,
                        retry:false
                    })
                }]
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END111',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: [{
                matcher:() => false,
                handler: noop
            }]
        }}
        var result= await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(store.dispatch.callCount).to.be.equal(3) //REQUEST ,SUCCESS , END
    })
    it('Should return handled true by generic resulthandler true', async() => {
        //stubedInfoLogger.callsFake(() =>  console.log('stub called'))
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [{
                    matcher:() => true,
                    handler: () => ({
                        handled:true,
                        success:true,
                        retry:false
                    })
                }],
                unhandledResultHandler: []
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: []
        }}
        var result= await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(store.dispatch.callCount).to.be.equal(3) //REQUEST ,SUCCESS , END
    })
    it('Should return 2 times true by unhandledResultHandler', async() => {
        //stubedInfoLogger.callsFake(() =>  console.log('stub called'))
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [],
                unhandledResultHandler: [{
                    matcher:() => true,
                    handler: () => ({
                        handled:true,
                        success:true,
                        retry:false
                    })
                },{
                    matcher:() => true,
                    handler: () => ({
                        handled:true,
                        success:true,
                        retry:false
                    })
                }]
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: []
        }}
        var result= await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(store.dispatch.callCount).to.be.equal(3) //REQUEST ,SUCCESS , END
    })
    it('Should call error response', async() => {
        //stubedInfoLogger.callsFake(() =>  console.log('stub called'))
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [{
                    matcher:() => true,
                    handler: () => ({
                        handled:true,
                        success: false,
                        retry:false
                    })
                }],
                unhandledResultHandler: []
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonError(404))
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: []
        }}
        var result= await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(store.dispatch.callCount).to.be.equal(3) //REQUEST , END and FAILURE
    })
    it('Should return failure when 2 times success', async() => {
        //stubedInfoLogger.callsFake(() =>  console.log('stub called'))
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [{
                    matcher:() => true,
                    handler: () => ({
                        handled:true,
                        success: true,
                        retry:false
                    })
                }, {
                    matcher:() => true,
                    handler: () => ({
                        handled:true,
                        success: true,
                        retry:false
                    })
                }],
                unhandledResultHandler: []
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END111',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: []
        }}
        var result= await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(store.dispatch.callCount).to.be.equal(3) //REQUEST , END and FAILURE with error
    })
    it('Should return failure when 2 times success', async() => {
        //stubedInfoLogger.callsFake(() =>  console.log('stub called'))
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [],
                unhandledResultHandler: []
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END111',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: [{
                matcher:() => true,
                handler: () => ({
                    handled:true,
                    success: true,
                    retry:false
                })
            }, {
                matcher:() => true,
                handler: () => ({
                    handled:true,
                    success: true,
                    retry:false
                })
            }]
        }}
        var result= await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(store.dispatch.callCount).to.be.equal(3) //REQUEST , END and FAILURE with error
    })
    it('Should return error when max retry reached', async() => {
        //stubedInfoLogger.callsFake(() =>  console.log('stub called'))
        stubedConfigGet.returns({
            resultHandlings: {
                genericResultHandler: [{
                    matcher:() => true,
                    handler: () => ({
                        handled:true,
                        success:false,
                        retry:true
                    })
                }],
                unhandledResultHandler: []
            },
            preRequestHandling: [],
            createConfig: undefined
        })
        stubedFetch.onCall(0).resolves(jsonOk())
        stubedFetch.onCall(1).resolves(jsonOk())
        stubedFetch.onCall(2).resolves(jsonOk())
        stubedFetch.onCall(3).resolves(jsonOk())
        stubedFetch.onCall(4).resolves(jsonOk())
        var next=sinon.spy()
        var store={
            getState:noop,
            dispatch:sinon.spy()
        }
        var validUFPAction={[UFPRequestActions.UFP_REQUEST_ACTION]:{
            ufpDefinition:{
                url:'api/Globals',
                method: 'get',
                actionConstants: {
                    END:'END',
                    FAILURE:'FAILURE',
                    REQUEST:'REQUEST',
                    SUCCESS:'SUCCESS'
                }
            },
            ufpData:{},
            ufpPreHandler: [],
            ufpResultHandler: []
        }}
        var result= await createUfpMiddleware()(store)(next)(validUFPAction)
        expect(store.dispatch.callCount).to.be.equal(3) //REQUEST , END and FAILURE with error
    }).timeout(15000);
})
