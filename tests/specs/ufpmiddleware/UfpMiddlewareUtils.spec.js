import UfpMiddlewareUtils from 'ufpmiddleware/UfpMiddlewareUtils.js'
import queryParams from 'ufpmiddleware/queryParams.js'
import PropTypes from 'prop-types'
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
    describe('getJSON', () => {
        it('Should extract jsondata from Fetch Response when header has content-type json', () => {
            var json= sinon.spy()
            expect(UfpMiddlewareUtils).to.be.an('object')
            expect(UfpMiddlewareUtils).to.have.property('getJSON')
                .that.is.a('function')
            var headers={'Content-Type':'application/json'}
            const get =(head) => headers[head]
            expect(UfpMiddlewareUtils.getJSON({headers:{get: get}, json})).to.be.fulfilled
            expect(json.callCount).to.be.equal(1)
            expect(UfpMiddlewareUtils.getJSON({headers:{get:() => {}}, json})).to.be.fulfilled
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
            stubedFetch.resolves(jsonOk())()
            var requestResult= await UfpMiddlewareUtils.ufpMiddlewareRequest({}, config)
            expect(stubedFetch.callCount).to.be.equal(2)
            expect(requestResult).to.have.property('status', 200)
        })
        it('Should call fetch with errorResponse', async () => {
            var config={url:"/bla", params:{"foo":"bar"}, method:'get'}
            stubedFetch.resolves(jsonError(500))()
            var requestResult= await UfpMiddlewareUtils.ufpMiddlewareRequest({}, config)
            expect(stubedFetch.callCount).to.be.equal(2)
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
            stubedFetch.resolves(jsonOk())()
            var validateStatusSpy =sinon.spy(config, 'validateStatus')
            var options={
            }
            var requestResult= await UfpMiddlewareUtils.ufpMiddlewareRequest(options, config)
            expect(stubedFetch.callCount).to.equal(2)
            console.log('requestResult',requestResult)
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
    describe('ReactPropTypesCheck',() => {

        var consoleErrorStub
        beforeEach(() => {
            consoleErrorStub=sinon.stub(console, 'error')
        });

        afterEach(() => {
            console.error.restore();
        });

        it('Should output console.error if last parameter false', () => {
            UfpMiddlewareUtils.ReactPropTypesCheck({
                bla:7
            }, {
                bla:PropTypes.string.isRequired
            }, false)
            expect(consoleErrorStub.callCount).to.equal(1)
            expect(consoleErrorStub.getCall(0).args[0]).to.be.equal('Failed prop type: Invalid prop `bla` of type `number` supplied to `<<anonymous>>`, expected `string`.')


        })
        it('Should throw error if last parameter true', () => {
            expect(()=>UfpMiddlewareUtils.ReactPropTypesCheck({
                bla:7
            }, {
                bla:PropTypes.string.isRequired
            }, true)).to.throw()
        })
    })
    describe('isEmptyObject',() => {
        it('Should return true for {}',  () => {
            expect(UfpMiddlewareUtils.isEmptyObject({})).to.be.equal(true)
        })
        it('Should return true for empty objects with no own properties', async () => {
            function TestObj(){}
            TestObj.prototype.test = 'test';
            var obj = new TestObj();
            expect(UfpMiddlewareUtils.isEmptyObject(obj)).to.be.equal(true)
            expect('test' in obj).to.be.equal(true)
        })
        it('Should return false for not empty objects',  () => {
            var obj ={'test':'test'}
            expect(UfpMiddlewareUtils.isEmptyObject(obj)).to.be.equal(false)
            expect('test' in obj).to.be.equal(true)
        })
    })
    describe('errorToObject',() => {
        it('Should throw when parameter no Error',  () => {
            expect(UfpMiddlewareUtils.errorToObject).to.throw()
        })
        it('Should return a object with property errorToObject=true', () => {
            expect(UfpMiddlewareUtils.errorToObject(new Error('test'))).to.have.property('errorToObject', true)
        })
        it('Should return a object with property message the message of the Error',  () => {
            expect(UfpMiddlewareUtils.errorToObject(new Error('test'))).to.have.property('message', 'test')
        })
        it('Should return a Error code of node System errors',  () => {
            class MyError extends Error {
                constructor(message) {
                    super(message);
                    this.name = this.constructor.name;1
                    Object.defineProperty(this, 'code', {
                        __proto__: null, // no inherited properties
                        value: 'test'  // not enumerable
                                         // not configurable
                                         // not writable
                                         // as defaults
                    });
                }
            }
            var err=new MyError('test')
            expect(UfpMiddlewareUtils.errorToObject(err)).to.have.property('code', 'test')

        })
        it('Should return a Error stack',  () => {
            class MyError extends Error {
                constructor(message) {
                    super(message);
                    this.name = this.constructor.name;1
                    Object.defineProperty(this, 'code', {
                        __proto__: null, // no inherited properties
                        value: 'test'  // not enumerable
                        // not configurable
                        // not writable
                        // as defaults
                    });
                }
            }
            try {
                throw new MyError('test')
            } catch (x) {
                expect(UfpMiddlewareUtils.errorToObject(x)).to.have.property('stack')
            }
        })


        it('Should return a response property without copying',  () => {
            class MyError extends Error {
                constructor(message) {
                    super(message);
                    this.response=  new window.Response(JSON.stringify({}), {
                        status: 200,
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                }
            }
            var err=new MyError('test')
            expect(UfpMiddlewareUtils.errorToObject(err)).to.have.property('response')
        })



    })
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
    describe('createAxiosLikeErrorResponse',async () => {
        it('Should return a error created from config and response',  async() => {
            var err= await UfpMiddlewareUtils.createAxiosLikeErrorResponse({
                method:'post',
                timeout:15000,
                url:'/hello'
            }, 200, new window.Response(JSON.stringify({'test': 'test'}), {
                status: 200,
                headers: {
                    'Content-type': 'application/json'
                }
            }))
            expect(err).to.have.property('code', 200)
            expect(err).to.have.property('config').to.deep.equal({
                method:'post',
                timeout:15000,
                url:'/hello'
            })
            expect(err).to.have.property('response').to.be.instanceOf(window.Response)
            expect(err.response.data).to.be.deep.equal({'test': 'test'})
        })
    })
    describe('mergeArrayOfObjects', () => {
        it('Should merge with identity selector',  () => {
            var res=UfpMiddlewareUtils.mergeArrayOfObjects([{a:'test', b:true, test:{s:'test'}},{ c:'bla',test:{b:'z'} }])
            expect(res).to.deep.equal({a:'test', b:true, test:{s:'test', b:'z'}, c:'bla'})
        })
        it('Should merge with selector', () => {
            var res=UfpMiddlewareUtils.mergeArrayOfObjects([{obj:{a:'test', b:true, test:{s:'test'}}},{obj:{ c:'bla',test:{b:'z'} }}], (item)=> item.obj)
            expect(res).to.deep.equal({a:'test', b:true, test:{s:'test', b:'z'}, c:'bla'})
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
    describe('addToArrayIfNotExist',() => {
        it('Should add to array if not exist',  () => {
            var item={
                test:'test',
                foo:'bar'
            }
            var arr=[{
                test:'test',
                foo:'bar'
            }]
            UfpMiddlewareUtils.addToArrayIfNotExist(arr, item)
            expect(arr.length).to.be.equal(2)
            UfpMiddlewareUtils.addToArrayIfNotExist(arr, item)
            expect(arr.length).to.be.equal(2)
            var arr2=['test']
            UfpMiddlewareUtils.addToArrayIfNotExist(arr2, 'test')
            expect(arr2.length).to.be.equal(1)
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

})
