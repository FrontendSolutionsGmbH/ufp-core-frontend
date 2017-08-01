
import _UFPMiddleware from './UfpMiddleware'
import {ResultHandlerResult as _ResultHandlerResult, PreHandlerResult as _PreHandlerResult} from 'modules/ufpmiddleware/UfpHandlerUtils'
import UFPMiddlewareActionCreator from './UfpMiddlewareActionCreator'

export const createActionCreatorForDefinition=UFPMiddlewareActionCreator.createActionCreatorForDefinition
export const createUFPMiddleware = _UFPMiddleware
export const ResultHandlerResult =_ResultHandlerResult
export const PreHandlerResult =_PreHandlerResult
export const RequestMethodConstants = {
  POST: 'post',
  DELETE: 'delete',
  GET: 'get',
  PATCH: 'patch'
}


export default createUFPMiddleware
