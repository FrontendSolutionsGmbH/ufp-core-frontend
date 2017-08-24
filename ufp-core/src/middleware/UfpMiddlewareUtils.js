import queryParams from './QueryParams'
import {UfpMiddlewareResulthandlerMoreThenOneSuccessError} from './Errors'
import UfpMiddlewareHelperUtils from './UfpMiddlewareHelperUtils'
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
}=UfpMiddlewareHelperUtils

const ufpMiddlewarePrepareConfig = (ufpAction) => {
    const {ufpDefinition, ufpData} = ufpAction
    const {url, method} =ufpDefinition
    const config = {}
    config.method = method
    config.timeout = 15000
    if (ufpData && ufpData.body) {
        config.data = ufpData.body
    }
    if (ufpData) {
        const {urlParams, queryParams} = ufpData
        if (queryParams && !isEmptyObject(queryParams)) {
            config.params = queryParams
        }
        if (urlParams && !isEmptyObject(urlParams)) {
            config.url = url + '?' + Object.keys(urlParams).map((item) => {
                    return item + '=' + urlParams[item]
                }).join('&')
        } else {
            config.url = url
        }
    } else {
        config.url = url
    }
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
        END: []
    }
    for (var i in target) {
        if (ufpTypes[i] !== undefined) {
            if (Array.isArray(ufpTypes[i])) {
                ufpTypes[i].map((element) => addToArrayIfNotExist(target[i], element))
            } else {
                addToArrayIfNotExist(target[i], ufpTypes[i])
            }
        }
        if (actionConstants[i] !== undefined) {
            if (Array.isArray(actionConstants[i])) {
                actionConstants[i].map((element) => addToArrayIfNotExist(target[i], element))
            } else {
                addToArrayIfNotExist(target[i], actionConstants[i])
            }
        }
    }
    return target
}
/*const checkToCallActionCreators = (dispatch, getState, ufpAction, action, actionType) => {
 if (ufpAction.ufpActionCreators) {
 // //   // console.log('UFPMiddleware calling action creators', ufpAction, actionType)
 var actionCreator = ufpAction.ufpActionCreators[actionType]
 if (Array.isArray(actionCreator)) {
 // call all actioncreators
 for (var i in actionCreator) {
 // call each actioncreator in array individually
 if (typeof actionCreator[i] === 'function') {
 dispatch(actionCreator[i]({
 payload: Object.assign({}, {globalState: getState()}, action.payload),
 dispatch: dispatch
 }))
 }
 }
 } else if (typeof actionCreator === 'function') {
 // //   // console.log('UFPMiddleware calling action creators', ufpAction, actionType)
 // just call single listed creator
 dispatch(actionCreator({
 payload: Object.assign({}, {globalState: getState()}, action.payload),
 dispatch: dispatch
 }))
 }
 }
 }*/

const wrapDispatcher = (dispatch/*, getState , ufpAction*/) => (action) => {
    if (Array.isArray(action.type)) {
        for (var i in action.type) {
            //checkToCallActionCreators(dispatch, getState, ufpAction, action, action.type[i])
            // //   // console.log('Dispatching array action', i, action.type[i], action.payload)
            dispatch({
                type: action.type[i],
                payload: action.payload
            })
        }
    } else {
        //checkToCallActionCreators(dispatch, getState, ufpAction,action, action.type)
        // //   // console.log('Dispatching normal action ', action)
        return dispatch(action)
    }
}

const handleResultHandlers = async(handlerArray, resultData) => {
    const ufpErrorHandlerResultPromiseArray = []
    handlerArray.map((handlerObject) => {
        if (handlerObject.matcher(resultData)) {
            ufpErrorHandlerResultPromiseArray.push(handlerObject.handler(resultData))
        }
    })
    const result = await Promise.all(ufpErrorHandlerResultPromiseArray)
    return result
}

const handlePreHandlers = async(handlerArray, resultData) => {
    if (handlerArray.length === 0) {
        return {
            break: false,
            handled: false
        }
    }
    var result = await handlerArray.reduce((previousPromise, currentItem) => {
        return previousPromise.then((previousResult) => {
            if (!previousResult.handled) {
                if (currentItem.matcher(resultData)) {
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

function createFetchUrl(config, queryParams) {
    config.fetchUrl = config.url + (config.url.indexOf('?') === -1 ? '?' : '&')
    config.fetchUrl += typeof config.paramsSerializer === 'function' ?
        config.paramsSerializer(config.params) : queryParams(config.params)
}

const ufpMiddlewareRequest = async(options, config) => {
    var requestResponse
    if (options.useAxios) {
        if (typeof options.axiosInstance === 'function' && typeof options.axiosInstance.request === 'function') {
            requestResponse = await options.axiosInstance.request(config).then((response) => response, (response) => response)
        } else {
            throw new Error('UFP Middleware Error: if you use the middleware with useAxios=true ' +
                'please provide a property axiosInstance in the options')
        }
    } else {
        if (config.params && !config.fetchUrl) {
            createFetchUrl(config, queryParams)
        }
        requestResponse = await fetch(config.fetchUrl, {
            method: config.method,
            body: config.data,
            credentials: config.credentials,
            headers: config.headers || {}
        })
        var isResolve = (typeof config.validateStatus === 'function') ?
            config.validateStatus(requestResponse.status) : validateStatus(requestResponse.status)
        if (!isResolve) {
            const responseClone = requestResponse.clone()
            const result = await createAxiosLikeErrorResponse(config, responseClone.status, responseClone)
            return result
        }
        requestResponse.data = await getJSON(requestResponse)
    }
    return requestResponse
}

export default {
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
    infoLogger,
    queryParams,
    ufpMiddlewarePrepareConfig,
    validateResultHandlerResult,
    uniteActionResultTypes,
    wrapDispatcher,
    handleResultHandlers,
    handlePreHandlers,
    createFetchUrl,
    ufpMiddlewareRequest
}
