import UfpMiddlewareUtils from 'ufpmiddleware/UfpMiddlewareUtils.js'
import queryParams from 'ufpmiddleware/queryParams.js'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios';
const axiosInstance = axios.create()

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
            expect(json).to.have.been.called
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
            expect(queryParams).to.be.called
        })
        it('Should call config.paramsSerializer when config.paramsSerializer defined', () => {
            var paramsSerializer = sinon.stub()
            paramsSerializer.returns('foo=bar')
            var config={url:"bla", params:{"foo":"bar"}, paramsSerializer}
            UfpMiddlewareUtils.createFetchUrl(config, queryParams)
            expect(paramsSerializer).to.be.called
        })
    })
    describe('ufpMiddlewareRequest',() => {
        let stubedFetch
        let mockAxios
        beforeEach(() => {
            stubedFetch=sinon.stub(window, 'fetch');
            mockAxios = new MockAdapter(axiosInstance);
            mockAxios.onGet('/bla').reply(200, {});
        });

        afterEach(() => {
            window.fetch.restore();
            mockAxios.reset();
        });

        it('Should call fetch ', async () => {
            var config={url:"/bla", params:{"foo":"bar"}, method:'get'}
            stubedFetch.resolves(jsonOk())()

             var requestResult= await UfpMiddlewareUtils.ufpMiddlewareRequest({}, config)
            expect(stubedFetch).to.be.called
            expect(requestResult).to.have.property('status', 200)
        })
        it('Should call axios ', async () => {
            var config={url:"/bla", params:{"foo":"bar"}, method:'get'}
            var options={
                useAxios:true,
                axiosInstance
            }
            var requestResult= await UfpMiddlewareUtils.ufpMiddlewareRequest(options, config)
            expect(stubedFetch).to.be.called
            expect(requestResult).to.have.property('status', 200)
        })

    })
})
