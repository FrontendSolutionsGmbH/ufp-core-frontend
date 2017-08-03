import Util from './Util'
import PropTypes from 'prop-types'

const UFPMiddlewareConfigurationX = {
    resultHandlings: {
        genericResultHandler: [],
        unhandledResultHandler: []
    },
    preRequestHandling: [],
    createConfig: undefined
}

const UFPHandlerPropTypeDefinition =
    PropTypes.shape({
        matcher: PropTypes.func.isRequired,
        handler: PropTypes.func.isRequired
    })

const UFPHandlerPropTypeDefinitionArray = {
    input: PropTypes.arrayOf(UFPHandlerPropTypeDefinition).isRequired
}
const UFPHandlerPropTypeDefinitionObject = {
    input: UFPHandlerPropTypeDefinition.isRequired
}

const register = (array) => (handlers) => {
    if (Array.isArray(handlers)) {
        if(Util.PropTypesCheck({input: handlers}, UFPHandlerPropTypeDefinitionArray)) {
            handlers.map((handler) => {
                array.push(handler)
            })
        } else {
            throw new Error('UFP ResultHandler or Prehandler Objects need to have a matcher and handler function')
        }
    } else {
        if(Util.PropTypesCheck({input: handlers}, UFPHandlerPropTypeDefinitionObject)) {
            array.push(handlers)
        } else {
            throw new Error('UFP ResultHandler or Prehandler Objects need to have a matcher and handler function')
        }
    }
}

const setCreateConfig = (createConfig) => {
    UFPMiddlewareConfigurationX.createConfig=createConfig
}

const traverseDefinition = (obj, callback, path) => {
    // // console.log('traversinng ', obj, path)
    path = path || []
    if (typeof obj === 'object' && obj.url === undefined) {
        Object.keys(obj).forEach((key) => {
            var value = obj[key]
            traverseDefinition(value, callback, path.concat(key))
        })
    } else {
        callback.call(obj, path, obj)
    }
}

const registerResultHandler = register(UFPMiddlewareConfigurationX.resultHandlings.genericResultHandler)
const registerPreHandler = register(UFPMiddlewareConfigurationX.preRequestHandling)
const registerUnhandledHandler=register(UFPMiddlewareConfigurationX.resultHandlings.unhandledResultHandler)
//UFPMiddlewareConfigurationX.resultHandlings.unhandledResultHandler.push(UFPResponseHandler)

export default {
    get: () => UFPMiddlewareConfigurationX,
    registerResultHandler,
    registerPreHandler,
    registerUnhandledHandler,
    traverseDefinition,
    setCreateConfig
}
