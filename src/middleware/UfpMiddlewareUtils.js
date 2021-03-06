import {UfpMiddlewareResulthandlerMoreThenOneSuccessError} from './Errors'
import UfpMiddlewareHelperUtils from './UfpMiddlewareHelperUtils'
import StringUtils from '../utils/StringUtils'
import {isArray} from 'lodash-es'

const {
    ReactPropTypesCheck,
    PropTypesCheck,
    getJSON,
    isEmptyObject,
    errorToObject,
    validateStatus,
    mergeArrayOfObjects,

    createAxiosLikeErrorResponse,
    addToArrayIfNotExist,
    createConfigDefault,
    infoLogger
} = UfpMiddlewareHelperUtils

const ufpMiddlewarePrepareConfig = (ufpAction) => {
    console.log(' ufpMiddlewarePrepareConfig ', JSON.parse(JSON.stringify(ufpAction)))

    const {ufpDefinition, ufpData} = ufpAction
    const {url, method} = ufpDefinition
    const config = {}

    config.method = method
    config.timeout = 15000

    if (ufpData && ufpData.body) {
        config.data = ufpData.body
    }
    if (ufpData) {
        const {urlParams, queryParams} = ufpData

        if (queryParams && !isEmptyObject(queryParams)) {
            config.url = url + '?' + Object.keys(queryParams)
                .map((item) => {
                    return item + '=' + queryParams[item]
                })
                .join('&')
        } else {
            config.url = url
        }

        config.url = StringUtils.replaceTemplateVar(config.url, urlParams)
    } else {
        config.url = url
    }
    // console.log('ufpMiddlewarePrepareConfig ', JSON.parse(JSON.stringify(config)))
    return config
}

const validateResultHandlerResult = (handlerResultArray) => {
    var successCount = handlerResultArray.reduce((curr, obj) => (obj.success ? curr + 1 : curr), 0)
    var retryCount = handlerResultArray.reduce((curr, obj) => (obj.retry ? curr + 1 : curr), 0)
    var handledCount = handlerResultArray.reduce((curr, obj) => (obj.handled ? curr + 1 : curr), 0)
    var additionalPayload = mergeArrayOfObjects(handlerResultArray, (item) => item.additionalPayload)
    //
    //  console.log('UFPMiddleware validateHandlerResult intermediate', successCount, handledCount, retryCount)
    if (successCount > 1) {
        //console.log('UFPMiddleware  more than 1 success', successCount)
        throw new UfpMiddlewareResulthandlerMoreThenOneSuccessError()
    }
    // // console.log('handledCount', handledCount, handlerResultArray)
    return {
        handled: handledCount > 0,
        retry: retryCount > 0,
        success: successCount > 0,
        additionalPayload
    }
}

const uniteActionResultTypes = (ufpTypes = {}, actionConstants = {}) => {
    var target = {
        REQUEST: [],
        SUCCESS: [],
        FAILURE: [],
        // legacy ... use FAILURE /..
        FAIL: [],
        END: []
    }
    for (var i in target) {
        if (ufpTypes[i] !== undefined) {
            if (isArray(ufpTypes[i])) {
                ufpTypes[i].map((element) => addToArrayIfNotExist(target[i], element))
            } else {
                addToArrayIfNotExist(target[i], ufpTypes[i])
            }
        }
        if (actionConstants[i] !== undefined) {
            if (isArray(actionConstants[i])) {
                actionConstants[i].map((element) => addToArrayIfNotExist(target[i], element))
            } else {
                addToArrayIfNotExist(target[i], actionConstants[i])
            }
        }
    }

    // legacy
    if (target.FAILURE.length === 0) {
        console.warn('use FAILURE as action action constants instead of FAIL')

        target.FAILURE = target.FAIL
    }
    return target
}

const wrapDispatcher = (dispatch/*, getState , ufpAction*/) => (action) => {
    // console.log("WRAP DISPATCHER DISPATCHING action", action)

    if (isArray(action.type)) {
        for (var i in action.type) {
            //checkToCallActionCreators(dispatch, getState, ufpAction, action, action.type[i])
            // console.log('Dispatching array action', i, action.type[i], action.payload)
            dispatch({
                type: action.type[i],
                payload: action.payload
            })
        }
    } else {
        //checkToCallActionCreators(dispatch, getState, ufpAction,action, action.type)
        // console.log('Dispatching normal action ', action)
        return dispatch(action)
    }
}

const handleResultHandlers = async (handlerArray, resultData) => {
    const ufpErrorHandlerResultPromiseArray = []
    handlerArray.map((handlerObject) => {
        if (handlerObject && handlerObject.matcher && handlerObject.matcher(resultData)) {
            ufpErrorHandlerResultPromiseArray.push(handlerObject.handler(resultData))
        }
    })
    const result = await Promise.all(ufpErrorHandlerResultPromiseArray)
    return result
}

const handlePreHandlers = async (handlerArray, resultData) => {
    if (handlerArray.length === 0) {
        return {
            break: false,
            handled: false
        }
    }
    var result = await handlerArray.reduce((previousPromise, currentItem) => {
        return previousPromise.then((previousResult) => {
            if (!previousResult.handled) {
                if (currentItem && currentItem.matcher && currentItem.matcher(resultData)) {
                    return Promise.resolve(currentItem.handler(resultData))
                } else {
                    return Promise.resolve(previousResult)
                }
            } else {
                return Promise.resolve(previousResult)
            }
        })
    }, Promise.resolve({
        break: false,
        handled: false
    }))
    return result
}

const ufpMiddlewareRequest = async (config) => {
    // console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)))

    var requestResponse
    const {params} = config
    var url = config.url
    if (params && !isEmptyObject(params)) {
        url = url + '?' + Object.keys(params)
            .map((item) => {
                return item + '=' + params[item]
            })
            .join('&')
    }
    // console.log('STARTING FETCH() start', url)
    try {
        requestResponse = await fetch(url, {
            method: config.method,
            body: config.data,
            credentials: config.credentials,
            headers: config.headers || {}

        })
    } catch (e) {
        // console.log('FETCH ERROR !', e)
        const result = await createAxiosLikeErrorResponse(config, -1, undefined)
        return result
    }
    // console.log('STARTING FETCH() END', url, requestResponse)
    var isResolve = validateStatus(requestResponse.status)
    if (!isResolve) {
        // in case of error retrieve content this way
        const responseClone = requestResponse.clone()
        const result = await createAxiosLikeErrorResponse(config, responseClone.status, responseClone)
        return result
    }
    requestResponse.data = await getJSON(requestResponse)

    return requestResponse
}

export default {
    ReactPropTypesCheck,
    PropTypesCheck,
    isEmptyObject,
    errorToObject,
    validateStatus,
    createConfigDefault,
    infoLogger,
    ufpMiddlewarePrepareConfig,
    validateResultHandlerResult,
    uniteActionResultTypes,
    wrapDispatcher,
    handleResultHandlers,
    handlePreHandlers,
    ufpMiddlewareRequest
}
