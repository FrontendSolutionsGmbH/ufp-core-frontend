import _createUFPMiddleware from './UfpMiddleware'
import {ResultHandlerResult as _ResultHandlerResult, PreHandlerResult as _PreHandlerResult} from 'modules/ufpmiddleware/UfpHandlerUtils'
import UFPMiddlewareActionCreator from './UfpMiddlewareActionCreator'
import UFPMiddlewareConfiguration from './UfpMiddlewareConfiguration'

const RequestMethodConstants = {
    POST: 'post',
    DELETE: 'delete',
    GET: 'get',
    PATCH: 'patch'
}


export default {
    createUFPMiddleware: _createUFPMiddleware,
    RequestMethodConstants,
    PreHandlerResult:_PreHandlerResult,
    ResultHandlerResult:_ResultHandlerResult,
    createActionCreatorForDefinition:UFPMiddlewareActionCreator.createActionCreatorForDefinition,
    registerResultHandler:UFPMiddlewareConfiguration.registerResultHandler,
    registerUnhandledHandler:UFPMiddlewareConfiguration.registerUnhandledHandler,
    setCreateConfig:UFPMiddlewareConfiguration.setCreateConfig
}
