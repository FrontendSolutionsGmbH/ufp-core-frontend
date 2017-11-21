import * as index from 'core'

describe('Ufp-Core index.js exists ', () => {
    it('Should Exist', () => {
        expect(index).to.exist
    })
    it('UfpCore Exist', () => {
        expect(index.UfpCore).to.exist
    })
    it('registerInitialStateCallback Exist', () => {
        expect(index.registerInitialStateCallback).to.exist
    })
    it('registerReducer Exist', () => {
        expect(index.registerReducer).to.exist
    })
    it('registerMiddleware Exist', () => {
        expect(index.registerMiddleware).to.exist
    })
    it('registerEnhancer Exist', () => {
        expect(index.registerEnhancer).to.exist
    })
    it('registerReducerCreator Exist', () => {
        expect(index.registerReducerCreator).to.exist
    })
    it('registerMiddlewareCreator Exist', () => {
        expect(index.registerMiddlewareCreator).to.exist
    })
    it('registerEnhancerCreator Exist', () => {
        expect(index.registerEnhancerCreator).to.exist
    })
    it('registerRunfest Exist', () => {
        expect(index.registerRunfest).to.exist
    })
    it('startupUfpCore Exist', () => {
        expect(index.startupUfpCore).to.exist
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
