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

const register = (array) => (handlers = JSUtils.ThrowParam('register() requires non undefined handlers param')) => {
    // console.log('UfpMiddlewareUtils', UfpMiddlewareUtils)

    const itemMethod = (item) => {
        console.log('UFP ResultHandler registering', item)
        if (UfpMiddlewareUtils.PropTypesCheck({input: item}, UFPHandlerPropTypeDefinitionObject)) {
            array.push(item)
        } else {
            throw new Error('UFP ResultHandler or Prehandler Objects need to have a matcher and handler function')
        }
    }

    if (isArray(handlers)) {
        if (UfpMiddlewareUtils.PropTypesCheck({input: handlers}, UFPHandlerPropTypeDefinitionArray)) {
            handlers.map(itemMethod)
        } else {
            throw new Error('UFP ResultHandler or Prehandler Objects need to have a matcher and handler function')
        }
    } else {
        itemMethod(handlers)
    }

    console.log('UFP ResultHandler FunkyMunky config is then ', array)
}

const setCreateConfig = (createConfig = JSUtils.ThrowParam('setCreateConfig() requires non undefined createConfig param')) => {
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
