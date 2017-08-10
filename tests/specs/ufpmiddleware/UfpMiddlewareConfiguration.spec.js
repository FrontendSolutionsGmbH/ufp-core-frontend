import UfpMiddlewareConfiguration from 'ufpmiddleware/UfpMiddlewareConfiguration'
import {ResultHandlerResult, PreHandlerResult} from 'ufpmiddleware/UfpHandlerUtils'

describe('ufpmiddleware UfpMiddlewareConfiguration', () => {

    describe('registerResultHandler', () => {
        it('Should register a ResultHandler', () => {
            UfpMiddlewareConfiguration.registerResultHandler({
                matcher:() => true,
                handler: () => new ResultHandlerResult(true, true, false)
            })
            UfpMiddlewareConfiguration.registerResultHandler([{
                matcher:() => true,
                handler: () => new ResultHandlerResult(true, true, false)
            }])
           expect(UfpMiddlewareConfiguration.get().resultHandlings.genericResultHandler.length).to.be.equal(2)
           expect(UfpMiddlewareConfiguration.registerResultHandler, {
               matcher:() => true
           }).to.throw()
            expect(UfpMiddlewareConfiguration.registerResultHandler, [{
                matcher:() => true
            }]).to.throw()
        })
    })

    describe('registerUnhandledHandler', () => {
        it('Should register a ResultHandler', () => {
            UfpMiddlewareConfiguration.registerUnhandledHandler({
                matcher:() => true,
                handler: () => new ResultHandlerResult(true, true, false)
            })
            UfpMiddlewareConfiguration.registerUnhandledHandler([{
                matcher:() => true,
                handler: () => new ResultHandlerResult(true, true, false)
            }])
            expect(UfpMiddlewareConfiguration.get().resultHandlings.unhandledResultHandler.length).to.be.equal(2)
            expect(UfpMiddlewareConfiguration.registerUnhandledHandler, {
                matcher:() => true
            }).to.throw()
        })
    })
    describe('registerPreHandler', () => {
        it('Should register a PreHandler', () => {
            UfpMiddlewareConfiguration.registerPreHandler({
                matcher:() => true,
                handler: () => new PreHandlerResult(true, true)
            })
            UfpMiddlewareConfiguration.registerPreHandler([{
                matcher:() => true,
                handler: () => new PreHandlerResult(true, true)
            }])
            expect(UfpMiddlewareConfiguration.get().preRequestHandling.length).to.be.equal(2)

            expect(() => UfpMiddlewareConfiguration.registerPreHandler({
                matcher:() => true
            })).to.throw()
            expect(() => UfpMiddlewareConfiguration.registerPreHandler([{
                matcher:() => true
            }])).to.throw()

        })
    })
    describe('setCreateConfig', () => {
        it('Should register a createConfig function', () => {
            var createConfig =() => {}
            UfpMiddlewareConfiguration.setCreateConfig(createConfig)
            expect(UfpMiddlewareConfiguration.get().createConfig ===createConfig).to.be.equal(true)
        })
    })
})