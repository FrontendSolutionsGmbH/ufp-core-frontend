import _createUFPMiddleware from './UfpMiddleware'
import {ResultHandlerResult as _ResultHandlerResult, PreHandlerResult as _PreHandlerResult} from './UfpHandlerUtils'
import UFPMiddlewareActionCreator from './UfpMiddlewareActionCreator'
import UFPMiddlewareConfiguration from './UfpMiddlewareConfiguration'
import TemplateUtils from './TemplateUtils'

export default {
  TemplateUtils: TemplateUtils,
  createUFPMiddleware: _createUFPMiddleware,
  PreHandlerResult: _PreHandlerResult,
  ResultHandlerResult: _ResultHandlerResult,
  createActionCreatorForDefinition: UFPMiddlewareActionCreator.createActionCreatorForDefinition,
  registerResultHandler: UFPMiddlewareConfiguration.registerResultHandler,
  registerUnhandledHandler: UFPMiddlewareConfiguration.registerUnhandledHandler,
  setCreateConfig: UFPMiddlewareConfiguration.setCreateConfig
}
