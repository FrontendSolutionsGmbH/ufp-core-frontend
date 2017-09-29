import * as index from 'modules/config'

describe('Module Ufp-Config ', () => {

    console.log('index is', index)

    it('Should Exist', () => {
        expect(index).to.exist
    })

    it('registerConfigDefault Should Exist', () => {
        expect(index.registerConfigDefault).to.exist
    })

    it('Runfest Should Exist', () => {
        expect(index.Runfest).to.exist
    })

    it('ConfigRunfest Exist', () => {
        expect(index.ConfigRunfest).to.exist
    })

    it('Runfest alias is same as nonalias', () => {
        expect(index.ConfigRunfest)
            .to
            .equal(index.Runfest)
    })

    it('Should Exist', () => {
        expect(index).to.exist
    })

    it('getConfigValue Exist', () => {
        expect(index.getConfigValue).to.exist
    })
    it('setConfigValue Exist', () => {
        expect(index.setConfigValue).to.exist
    })

    //
    // export const UfpCore = _UfpCore
    // export const registerInitialStateCallback = _UfpCore.registerInitialStateCallback
    // export const registerReducer = _UfpCore.registerReducer
    // export const registerMiddleware = _UfpCore.registerMiddleware
    // export const registerEnhancer = _UfpCore.registerEnhancer
    // export const registerReducerCreator = _UfpCore.registerReducerCreator
    // export const registerMiddlewareCreator = _UfpCore.registerMiddlewareCreator
    // export const registerEnhancerCreator = _UfpCore.registerEnhancerCreator
    // export const registerRunfest = _UfpCore.registerRunfest
    // export const startupUfpCore = _UfpCore.startup
    //

})
