import UfpMiddlewareUtils from './UfpMiddlewareUtils'
import UfpTypes from 'ufp-types'
import JSUtils from './../utils/JSUtils'
import {isArray} from 'lodash-es'

const UFPMiddlewareConfigurationX = {
    resultHandlings: {
        genericResultHandler: [],
        unhandledResultHandler: []
    },
    preRequestHandling: [],
    createConfig: undefined
}

const UFPHandlerPropTypeDefinition =
    UfpTypes.shape({
        matcher: UfpTypes.func.isRequired,
        handler: UfpTypes.func.isRequired
    })

const UFPHandlerPropTypeDefinitionArray = {
    input: UfpTypes.arrayOf(UFPHandlerPropTypeDefinition).isRequired
}
const UFPHandlerPropTypeDefinitionObject = {
    input: UFPHandlerPropTypeDefinition.isRequired
}

const register = (array) => (handlers) => {
    // console.log('UfpMiddlewareUtils', UfpMiddlewareUtils)

    if (isArray(handlers)) {
        if (UfpMiddlewareUtils.PropTypesCheck({input: handlers}, UFPHandlerPropTypeDefinitionArray)) {
            handlers.map((handler) => {
                array.push(handler)
            })
        } else {
            throw new Error('UFP ResultHandler or Prehandler Objects need to have a matcher and handler function')
        }
    } else {
        if (UfpMiddlewareUtils.PropTypesCheck({input: handlers}, UFPHandlerPropTypeDefinitionObject)) {
            array.push(handlers)
        } else {
            throw new Error('UFP ResultHandler or Prehandler Objects need to have a matcher and handler function')
        }
    }
}

const setCreateConfig = (createConfig) => {
    UFPMiddlewareConfigurationX.createConfig = createConfig
}

const registerResultHandler = register(UFPMiddlewareConfigurationX.resultHandlings.genericResultHandler)
const registerPreHandler = register(UFPMiddlewareConfigurationX.preRequestHandling)
const registerUnhandledHandler = register(UFPMiddlewareConfigurationX.resultHandlings.unhandledResultHandler)
//UFPMiddlewareConfigurationX.resultHandlings.unhandledResultHandler.push(UFPResponseHandler)
//UFPMiddlewareConfigurationX.resultHandlings.unhandledResultHandler.push(UFPResponseHandler)
export default {
    get: () => UFPMiddlewareConfigurationX,
    registerResultHandler,
    registerPreHandler,
    registerUnhandledHandler,
    setCreateConfig,
    setRequestBuilder: ({creatorFunction = JSUtils.ThrowParam('creatorFunction for request builder has to be set')}) => {
        setCreateConfig(creatorFunction)
    }
}
