import {ThrowParam} from 'modules/utils/JsUtils'
const UFPMiddlewareConfigurationX = {
    resultHandlings: {
        genericResultHandler: [],
        unhandledResultHandler: []
    },
    preRequestHandling: [],
    createConfig: undefined
}

const register = (array) => (handlers) => {
    if (Array.isArray(handlers)) {
        handlers.map((handler) => {
            array.push(handler)
        })
    } else {
        array.push(handlers)
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
