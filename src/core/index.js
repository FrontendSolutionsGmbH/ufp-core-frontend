import _UfpCore from './UfpCore'

export const UfpCore = _UfpCore
export const registerInitialStateCallback = _UfpCore.registerInitialStateCallback
export const registerReducer = _UfpCore.registerReducer
export const registerMiddleware = _UfpCore.registerMiddleware
export const registerEnhancer = _UfpCore.registerEnhancer
export const registerReducerCreator = _UfpCore.registerReducerCreator
export const registerMiddlewareCreator = _UfpCore.registerMiddlewareCreator
export const registerEnhancerCreator = _UfpCore.registerEnhancerCreator
export const registerRunfest = _UfpCore.registerRunfest
export const startupUfpCore = _UfpCore.startup

// No default export! BECAUSE it creates hardwired dependency, cherrypick your methods