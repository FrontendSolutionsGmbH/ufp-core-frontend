import UfpMiddlewareHelperUtils from 'ufpmiddleware/UfpMiddlewareHelperUtils.js'
import PropTypes from 'prop-types'
var UfpMiddlewareUtils=UfpMiddlewareHelperUtils

describe('ufpmiddleware UfpMiddlewareHelperUtils', () => {
    describe('ReactPropTypesCheck',() => {
        var consoleErrorStub

        beforeEach(() => {
            consoleErrorStub=sinon.stub(console, 'error')
        })
        afterEach(() => {
            console.error.restore();
        })

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
        it('Should resolve promise', () => {
            var json= sinon.spy()
            var headers={'Content-Type':'ddd'}
            const get =(head) => headers[head]
            expect(UfpMiddlewareUtils.getJSON({headers:{get: get}, json})).to.be.fulfilled
            expect(json.callCount).to.be.equal(0)
        })
        it('Should resolve promise', () => {
            var json= sinon.spy()
            var headers={}
            const get =(head) => headers[head]
            expect(UfpMiddlewareUtils.getJSON({headers:{get: get}, json})).to.be.fulfilled
            expect(json.callCount).to.be.equal(0)
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
        it('Should return a error created from config and response',  async() => {
            var err= await UfpMiddlewareUtils.createAxiosLikeErrorResponse({
                method:'post',
                timeout:15000,
                url:'/hello'
            }, undefined, new window.Response(JSON.stringify({'test': 'test'}), {
                status: 200,
                headers: {
                    'Content-type': 'application/json'
                }
            }))
            expect(err).to.not.have.property('code')
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
    describe('infoLogger',() => {
        it('Should add to array if not exist',  () => {
            UfpMiddlewareUtils.infoLogger('testLog')
        })
    })

})