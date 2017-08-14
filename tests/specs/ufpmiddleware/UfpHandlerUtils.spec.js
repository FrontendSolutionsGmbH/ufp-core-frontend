import {ResultHandlerResult, PreHandlerResult} from 'ufpmiddleware/UfpHandlerUtils'

describe('ufpmiddleware UfpHandlerUtils', () => {
    describe('ResultHandlerResult', () => {
        it('Should have success, handled and retry properties', () => {
            var result=new ResultHandlerResult(true, true, false).addPayload({test:'test'})
            expect(result).to.have.property('success', true)
            expect(result).to.have.property('handled', true)
            expect(result).to.have.property('retry', false)
            expect(result).to.have.property('additionalPayload').to.deep.equal({test:'test'})
        })
        it('Should have success, handled and retry properties', () => {
            var result=new ResultHandlerResult()
            expect(result).to.have.an.property('success', false)
            expect(result).to.have.property('handled', false)
            expect(result).to.have.property('retry', false)
            expect(result).to.not.have.property('additionalPayload')
        })

    })
    describe('PreHandlerResult', () => {
        it('Should have success, handled and retry properties',() => {
            var result=new PreHandlerResult(false, true)
            expect(result).to.have.property('break',false)
            expect(result).to.have.property('handled', true)
        })
        it('Should have success, handled and retry properties',() => {
            var result=new PreHandlerResult()
            expect(result).to.have.property('break', false)
            expect(result).to.have.property('handled', false)
        })

    })

})