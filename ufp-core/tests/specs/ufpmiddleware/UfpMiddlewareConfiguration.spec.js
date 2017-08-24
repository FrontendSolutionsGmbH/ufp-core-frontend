import UfpMiddlewareConfiguration from 'ufpmiddleware/UfpMiddlewareConfiguration'
import {ResultHandlerResult, PreHandlerResult} from 'ufpmiddleware/UfpHandlerUtils'
function noop() {}

describe('ufpmiddleware UfpMiddlewareConfiguration', () => {

    describe('registerResultHandler', () => {
        it('Should register a ResultHandler', () => {
            noop()
            UfpMiddlewareConfiguration.registerResultHandler({
                matcher: noop,
                handler: noop
            })
            UfpMiddlewareConfiguration.registerResultHandler([{
                matcher: noop,
                handler: noop
            }])
           expect(UfpMiddlewareConfiguration.get().resultHandlings.genericResultHandler.length).to.be.equal(2)
        })
    })

    describe('registerUnhandledHandler', () => {
        it('Should register a ResultHandler', () => {
            UfpMiddlewareConfiguration.registerUnhandledHandler({
                matcher: noop,
                handler: noop
            })
            UfpMiddlewareConfiguration.registerUnhandledHandler([{
                matcher: noop,
                handler: noop
            }])
            expect(UfpMiddlewareConfiguration.get().resultHandlings.unhandledResultHandler.length).to.be.equal(2)
        })
    })
    describe('registerPreHandler', () => {
        it('Should register a PreHandler', () => {
            UfpMiddlewareConfiguration.registerPreHandler({
                matcher: noop,
                handler: noop
            })
            UfpMiddlewareConfiguration.registerPreHandler([{
                matcher: noop,
                handler: noop
            }])
            expect(UfpMiddlewareConfiguration.get().preRequestHandling.length).to.be.equal(2)

            expect(() => UfpMiddlewareConfiguration.registerPreHandler({
                matcher: noop
            })).to.throw()
            expect(() => UfpMiddlewareConfiguration.registerPreHandler([{
                matcher: noop
            }])).to.throw()

        })
    })
    describe('setCreateConfig', () => {
        it('Should register a createConfig function', () => {
            var createConfig = noop
            UfpMiddlewareConfiguration.setCreateConfig(createConfig)
            expect(UfpMiddlewareConfiguration.get().createConfig ===createConfig).to.be.equal(true)
        })
    })
})