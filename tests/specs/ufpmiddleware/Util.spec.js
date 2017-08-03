import Util from 'ufpmiddleware/Util.js'

describe('(Modules) UfpMiddleware Util', () => {

    it('Should export Util getJSON', () => {
        var json= sinon.spy()
        expect(Util).to.be.an('object')
        expect(Util).to.have.property('getJSON')
            .that.is.a('function')
        var headers={'Content-Type':'application/json'}
        const get =(head) => headers[head]
        expect(Util.getJSON({headers:{get: get}, json})).to.be.fulfilled
        expect(json).to.have.been.called
        expect(Util.getJSON({headers:{get:() => {}}, json})).to.be.fulfilled
    })


})
