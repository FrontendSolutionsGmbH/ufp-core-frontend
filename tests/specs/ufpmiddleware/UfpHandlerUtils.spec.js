import {ResultHandlerResult, PreHandlerResult} from 'ufpmiddleware/UfpHandlerUtils'

describe('ufpmiddleware UfpHandlerUtils', () => {
    describe('ResultHandlerResult', () => {
        it('Should have success, handled and retry properties', () => {
            var result=new ResultHandlerResult(true, true, false)
            expect(result).to.have.property('success', true)
            expect(result).to.have.property('handled', true)
            expect(result).to.have.property('retry', false)
        })

    })
    describe('PreHandlerResult', () => {
        it('Should have success, handled and retry properties',() => {
            var result=new PreHandlerResult(false, true)
            expect(result).to.have.property('break',false)
            expect(result).to.have.property('handled', true)
        })

    })

})