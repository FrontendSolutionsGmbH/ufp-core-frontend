import UfpMiddlewareUtils from 'ufpmiddleware/UfpMiddlewareUtils.js'
import queryParams from 'ufpmiddleware/queryParams.js'

import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
const axiosInstance = axios.create()
var Promise = require("native-promise-only")

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

describe('ufpmiddleware UfpMiddlewareUtils', () => {

    describe('ufpMiddlewarePrepareConfig',() => {
        it('Should return a config with urlparams',  () => {

            var ufpAction={
                ufpDefinition:{url:'/hello/:id', method:'post', requestType:'test'},
                ufpData: {
                    urlParams:{id:7},
                    queryParams:{sort:'asc'},
                    body:{'test':'test'}
                }
            }
            var configOut=UfpMiddlewareUtils.ufpMiddlewarePrepareConfig(ufpAction)
            expect(configOut).to.be.deep.equal({
                method:'post',
                timeout:15000,
                url:'/hello/7',
                params:{sort:'asc'},
                data:{'test':'test'}
            })
        })
        it('Should return a config without urlparams',  () => {
            var ufpAction={
                ufpDefinition:{url:'/hello', method:'post', requestType:'test'},
                ufpData: {
                    queryParams:{sort:'asc'},
                    body:{'test':'test'}
                }
            }
            var configOut=UfpMiddlewareUtils.ufpMiddlewarePrepareConfig(ufpAction)
            expect(configOut).to.be.deep.equal({
                method:'post',
                timeout:15000,
                url:'/hello',
                params:{sort:'asc'},
                data:{'test':'test'}
            })
        })
        it('Should return a config without ufpData',  () => {
            var ufpAction={
                ufpDefinition:{url:'/hello', method:'post', requestType:'test'}
            }
            var configOut=UfpMiddlewareUtils.ufpMiddlewarePrepareConfig(ufpAction)
            expect(configOut).to.be.deep.equal({
                method:'post',
                timeout:15000,
                url:'/hello'
            })
        })
    })

    describe('validateResultHandlerResult',() => {
        it('Should reduce the array to one result object',  () => {
            var res=UfpMiddlewareUtils.validateResultHandlerResult([{ handled:true, success: true, retry:false},{ handled:false, success: false, retry:false}])
            expect(res).to.deep.equal({handled: true, retry: false, success: true,  additionalPayload:{}})
        })
        it('Should reduce the array to one result object',  () => {
            var res=UfpMiddlewareUtils.validateResultHandlerResult([{ handled:true, success: false, retry:true},{ handled:false, success: false, retry:false}])
            expect(res).to.deep.equal({handled: true, retry: true, success: false,  additionalPayload:{}})
        })
        it('Should trow if more then one success:true', () => {
            expect(() => UfpMiddlewareUtils.validateResultHandlerResult([{ handled:true, success:true, retry:false},{ handled:true, success:true, retry:false}])).to.throw()
        })
    })

    describe('uniteActionResultTypes',() => {
        it('Should merge to valid ActionConstantsObj with empty Object', () => {
            var input0={}
            var input={
                END:'GET_CONFIG_FILE_END',
                FAILURE:'GET_CONFIG_FILE_FAILURE',
                REQUEST:'GET_CONFIG_FILE_REQUEST',
                SUCCESS:'GET_CONFIG_FILE_SUCCESS'
            }
            var result={
                END:['GET_CONFIG_FILE_END'],
                FAILURE:['GET_CONFIG_FILE_FAILURE'],
                REQUEST:['GET_CONFIG_FILE_REQUEST'],
                SUCCESS:['GET_CONFIG_FILE_SUCCESS']
            }
            var res=UfpMiddlewareUtils.uniteActionResultTypes(input0, input)
            expect(res).to.deep.equal(result)
        })
        it('Should merge to valid ActionConstantsObj with empty Object', () => {
            var input0={}
            var input={
                END:'GET_CONFIG_FILE_END',
                FAILURE:'GET_CONFIG_FILE_FAILURE',
                REQUEST:'GET_CONFIG_FILE_REQUEST',
                SUCCESS:'GET_CONFIG_FILE_SUCCESS'
            }
            var result={
                END:['GET_CONFIG_FILE_END'],
                FAILURE:['GET_CONFIG_FILE_FAILURE'],
                REQUEST:['GET_CONFIG_FILE_REQUEST'],
                SUCCESS:['GET_CONFIG_FILE_SUCCESS']
            }
            var res=UfpMiddlewareUtils.uniteActionResultTypes(input,input0)
            expect(res).to.deep.equal(result)


        })
        it('Should merge', () => {
            var input={
                END:'GET_CONFIG_FILE_END',
                FAILURE:'GET_CONFIG_FILE_FAILURE',
                REQUEST:'GET_CONFIG_FILE_REQUEST',
                SUCCESS:['GET_CONFIG_FILE_SUCCESS','GET_CONFIG_FILE_SUCCESS1','GET_CONFIG_FILE_SUCCESS']
            }
            var input2={
                END:'GET_CONFIG_FILE_END2',
                FAILURE:['GET_CONFIG_FILE_FAILURE1','GET_CONFIG_FILE_FAILURE2'],
                REQUEST:'GET_CONFIG_FILE_REQUEST2',
                SUCCESS:'GET_CONFIG_FILE_SUCCESS2'
            }
            var result={
                END:['GET_CONFIG_FILE_END','GET_CONFIG_FILE_END2'],
                FAILURE:['GET_CONFIG_FILE_FAILURE','GET_CONFIG_FILE_FAILURE1','GET_CONFIG_FILE_FAILURE2'],
                REQUEST:['GET_CONFIG_FILE_REQUEST','GET_CONFIG_FILE_REQUEST2'],
                SUCCESS:['GET_CONFIG_FILE_SUCCESS','GET_CONFIG_FILE_SUCCESS1','GET_CONFIG_FILE_SUCCESS2']
            }
            var res=UfpMiddlewareUtils.uniteActionResultTypes(input, input2)
            expect(res).to.deep.equal(result)
        })
        it('Should merge', () => {
            var result={
                END:[],
                FAILURE:[],
                REQUEST:[],
                SUCCESS:[]
            }
            var res=UfpMiddlewareUtils.uniteActionResultTypes()
            expect(res).to.deep.equal(result)
        })
    })

    describe('wrapDispatcher', () => {
        var dispatch
        beforeEach(() => {
            dispatch=sinon.spy()
        });

        afterEach(() => {
            dispatch.reset()
        });
        it('Should call dispatch for every type in the type array', () => {
            const dispatchWrapper=UfpMiddlewareUtils.wrapDispatcher(dispatch)
            dispatchWrapper({
                type:['GET_CONFIG_FILE_REQUEST','GET_CONFIG_FILE_REQUEST2'],
                payload:{data:'someData'}
            })
            expect(dispatch.callCount).to.equal(2)
        })
        it('Should call dispatch for single type', () => {
            const dispatchWrapper=UfpMiddlewareUtils.wrapDispatcher(dispatch)
            dispatchWrapper({
                type:'GET_CONFIG_FILE_REQUEST',
                payload:{data:'someData'}
            })
            expect(dispatch.callCount).to.equal(1)
        })
    })

    describe('handleResultHandlers', () => {
        it('Should call all matcher and only handler if matcher returned true', async() => {
            var matcher1=sinon.stub()
            matcher1.returns(true)
            var handler1=sinon.stub()
            handler1.resolves('handlerresult1')

            var matcher2=sinon.stub()
            matcher2.returns(false)
            var handler2=sinon.stub()
            handler2.resolves('handlerresult2')
            var result = await UfpMiddlewareUtils.handleResultHandlers([
                {
                    matcher:matcher1,
                    handler:handler1
                }, {
                    matcher:matcher2,
                    handler:handler2
                }
            ], {})
                expect(result).to.be.deep.equal(['handlerresult1'])
            expect(matcher1.callCount).to.equal(1)
            expect(matcher2.callCount).to.equal(1)
            expect(handler1.callCount).to.equal(1)
            expect(handler2.callCount).to.equal(0)


        })
    })

    describe('handlePreHandlers', () => {
        it('Should call return with the result when the first handler returned a object with handled: true ' +
            ', later handler and matcher not called',  async() => {
            var matcher1=sinon.stub()
            matcher1.returns(false)
            var handler1=sinon.stub()
                handler1.resolves({
                    handled:true,
                    break:false
                })
            var matcher2=sinon.stub()
            matcher2.returns(true)
            var handler2=sinon.stub()
            handler2.resolves({
                handled:true,
                break:false
            })
            var matcher3=sinon.stub()
            matcher3.returns(true)
            var handler3=sinon.stub()
            handler3.resolves({
                handled:true,
                break:false
            })
            var result=await UfpMiddlewareUtils.handlePreHandlers([
                {
                    matcher:matcher1,
                    handler:handler1
                }, {
                    matcher:matcher2,
                    handler:handler2
                }, {
                    matcher:matcher3,
                    handler:handler3
                }
            ], {})
            expect(result).to.be.deep.equal({
                handled:true,
                break:false
            })
            expect(matcher1.callCount).to.equal(1)
            expect(matcher2.callCount).to.equal(1)
            expect(matcher3.callCount).to.equal(0)
            expect(handler1.callCount).to.equal(0)
            expect(handler2.callCount).to.equal(1)
            expect(handler3.callCount).to.equal(0)
        })
        it('Should return  {handled:false,break:false} for empty array',  async() => {

            var result=await UfpMiddlewareUtils.handlePreHandlers([], {})
            expect(result).to.be.deep.equal({
                handled:false,
                break:false
            })

        })
    })

    describe('createFetchUrl', () => {
        it('Should add fetchUrl to config and use queryParms', () => {
            var config={url:"bla", params:{"foo":"bar"}}
            UfpMiddlewareUtils.createFetchUrl(config, queryParams)
            expect(config.fetchUrl).to.be.equal("bla?foo=bar")
        })
        it('Should support existing params on url', () => {
            var config={url:"bla?test=1", params:{"foo":"bar"}}
            UfpMiddlewareUtils.createFetchUrl(config, queryParams)
            expect(config.fetchUrl).to.be.equal("bla?test=1&foo=bar")
        })
        it('Should call queryParams when config.paramsSerializer not defined', () => {
            var queryParamsStub = sinon.stub()
            queryParamsStub.returns('foo=bar')
            var config={url:"bla", params:{"foo":"bar"}}
            UfpMiddlewareUtils.createFetchUrl(config, queryParamsStub)
            expect(queryParamsStub.callCount).to.be.equal(1)
        })
        it('Should call config.paramsSerializer when config.paramsSerializer defined', () => {
            var paramsSerializer = sinon.stub()
            paramsSerializer.returns('foo=bar')
            var config={url:"bla", params:{"foo":"bar"}, paramsSerializer}
            UfpMiddlewareUtils.createFetchUrl(config, queryParams)
            expect(paramsSerializer.callCount).to.be.equal(1)
        })
    })

    describe('ufpMiddlewareRequest',() => {
        let stubedFetch
        let mockAxios
        beforeEach(() => {
            stubedFetch=sinon.stub(window, 'fetch');
            mockAxios = new MockAdapter(axiosInstance);
            mockAxios.onGet('/bla').reply(200, {});
            mockAxios.onGet('/bla2').reply(500, {});
        });

        afterEach(() => {
            stubedFetch.restore();
            mockAxios.reset();
        });

        it('Should call fetch ', async () => {
            var config={url:"/bla", params:{"foo":"bar"}, method:'get'}
            stubedFetch.resolves(jsonOk())
            var requestResult= await UfpMiddlewareUtils.ufpMiddlewareRequest({}, config)
            expect(stubedFetch.callCount).to.be.equal(1)
            expect(requestResult).to.have.property('status', 200)
        })
        it('Should call fetch with errorResponse', async () => {
            var config={url:"/bla", params:{"foo":"bar"}, method:'get'}
            stubedFetch.resolves(jsonError(500))
            var requestResult= await UfpMiddlewareUtils.ufpMiddlewareRequest({}, config)
            expect(stubedFetch.callCount).to.be.equal(1)
            expect(requestResult).to.be.an('error')
            expect(requestResult).to.have.property('response').to.be.instanceOf(window.Response)
            expect(requestResult.response).to.have.property('status', 500)
            expect(requestResult).to.have.property('code', 500)
        })
        it('Should call fetch  and validateStatus from config if present', async () => {
            var config={
                url:"/bla",
                params:{"foo":"bar"},
                method:'get',
                validateStatus: (status) => (status >= 200 && status < 300)
            }
            stubedFetch.resolves(jsonOk())
            var validateStatusSpy =sinon.spy(config, 'validateStatus')
            var options={
            }
            var requestResult= await UfpMiddlewareUtils.ufpMiddlewareRequest(options, config)
            expect(stubedFetch.callCount).to.equal(1)
            expect(requestResult).to.have.property('status', 200)
            expect(validateStatusSpy.callCount).to.be.equal(1)

        })
        it('Should call axios ', async () => {
            var config={url:"/bla", params:{"foo":"bar"}, method:'get'}
            var options={
                useAxios:true,
                axiosInstance
            }
            var requestResult= await UfpMiddlewareUtils.ufpMiddlewareRequest(options, config)
            expect(stubedFetch.callCount).to.equal(0)
            expect(requestResult).to.have.property('status', 200)
        })

        it('Should call axios with errorResponse', async () => {
            var config={url:"/bla2", params:{"foo":"bar"}, method:'get'}
            var options={
                useAxios:true,
                axiosInstance
            }
            var requestResult= await UfpMiddlewareUtils.ufpMiddlewareRequest(options, config)
            expect(stubedFetch.callCount).to.equal(0)
            expect(requestResult).to.be.an('error')
            expect(requestResult).to.have.property('response').to.be.an('object')
            expect(requestResult.response).to.have.property('status', 500)
        })
        it('Should throw if useAxioss and no axiosInstance ',  async() => {
            var config={url:"/bla", params:{"foo":"bar"}, method:'get'}
            var options={
                useAxios:true
            }
            var result
            try {
                result= await UfpMiddlewareUtils.ufpMiddlewareRequest(options, config)
            } catch (err) {
                result=err
            }
            expect(result).to.be.an('error')
        })
    })
})
