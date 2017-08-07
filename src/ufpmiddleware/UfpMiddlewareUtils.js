import PropTypes from 'prop-types'
import TemplateUtils from './TemplateUtils'
import queryParams from './queryParams'

function ReactPropTypesCheck(object, propTypes, _throw) {

    // const stringJSON = JSON.stringify(object)
    var error = PropTypes.checkPropTypes(propTypes, object, 'prop')
    if (error) {
        if (_throw) {
            throw error
        } else {
            console.error(error.message)
        }
    }
}
function PropTypesCheck(data, propTypes) {
    console.log()
    try {
        ReactPropTypesCheck(data, propTypes, true)
        return true
    } catch (e) {
        // console.error('Validation error', e)
        return false
    }
}
function isEmptyObject(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false
    }
    return JSON.stringify(obj) === JSON.stringify({})
}
function errorToObject (err) {
    if ( !( err instanceof Error ) ) {
        throw new TypeError( 'invalid input argument. Must provide an error object. Value: `' + err + '`.' );
    }
    var keys
    var out = {}
    out.errorToObject=true
    out.message = err.message
    if ( err.stack ) {
        out.stack = err.stack
    }
    // Possible Node.js (system error) properties...
    if ( err.code ) {
        out.code = err.code
    }
    // Any enumerable properties...
    keys = Object.keys( err )
    for ( var i = 0; i < keys.length; i++ ) {
        if(err[ keys[i]] instanceof Response) {
            out[ keys[i] ]=err[ keys[i] ]
        } else {
            out[ keys[i] ] = JSON.parse(JSON.stringify( err[ keys[i] ] ))
        }

    }
    return out
}
function validateStatus(status) {
    return status >= 200 && status < 300; // default
}

/**
 * Extract JSON body from a server response made with fetch
 *
 * @function getJSON
 * @access public
 * @param {object} res - A raw response object
 * @returns {promise|undefined}
 */
export const getJSON =async(res) => {
    const contentType = res.headers.get('Content-Type')
    const emptyCodes = [204, 205]

    if (!~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json')) {
        return res.json()
    } else {
        return Promise.resolve()
    }
}

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
            config.url = TemplateUtils.urlParamsToUrl(url, urlParams)

        } else {
            config.url =url
        }
    } else {
        config.url =url
    }
    return config
}
const createAxiosLikeErrorResponse=async(config, code, response) =>{
    var err=new Error('Request failed with status code ' + response.status)
    err.config = config
    if (code) {
        err.code = code
    }
    err.response = response
    err.response.data= await getJSON(response)
    return err
}
const validateResultHandlerResult= (handlerResultArray) => {
    var successCount = handlerResultArray.reduce((curr, obj) => (obj.success ? curr + 1 : curr), 0)
    var retryCount = handlerResultArray.reduce((curr, obj) => (obj.retry ? curr + 1 : curr), 0)
    var handledCount = handlerResultArray.reduce((curr, obj) => (obj.handled ? curr + 1 : curr), 0)
    var breakCount = handlerResultArray.reduce((curr, obj) => (obj.break ? curr + 1 : curr), 0)

    //  // //   // console.log('UFPMiddleware validateHandlerResult intermediate', successCount, handledCount, retryCount)
    if (successCount > 1) {
        // // //   // console.log('UFPMiddleware  more than 1 success')
        throw new Error('UFPMiddleware  more than 1 success')
    } else if (successCount === 1) {
        //    // //   // console.log('UFPMiddleware 1 success: dispatch _SUCCESS ')
    }
    // // console.log('handledCount', handledCount, handlerResultArray)
    return {
        handled: handledCount > 0,
        retry: retryCount > 0,
        success: successCount > 0,
        break: breakCount > 0
    }
}
const addToArrayIfNotExist= (arr, item) => {
    if (arr.indexOf(item) === -1) {
        arr.push(item)
    }
}
const uniteActionResultTypes= (ufpTypes, incoming) => {
    for (var i in incoming) {
        var item = incoming[i]
        // verify in result object is key present
        if (ufpTypes[i] === undefined) {
            ufpTypes[i] = []
        }

        // check if item is of type array
        if (Array.isArray(item)) {
            // add all from incoming array
            item.map((element) => addToArrayIfNotExist(ufpTypes[i], element)
            )
        } else {
            // add single string value
            addToArrayIfNotExist(ufpTypes[i], item)
        }
    }
}
const checkToCallActionCreators = (dispatch, getState, ufpAction, action, actionType) => {
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
}
const wrapDispatcher= (dispatch, getState, ufpAction) => (action) => {


    if (Array.isArray(action.type)) {
        for (var i in action.type) {
            checkToCallActionCreators(dispatch, getState, ufpAction,action, action.type[i])
            // //   // console.log('Dispatching array action', i, action.type[i], action.payload)
            dispatch({
                type: action.type[i],
                payload: action.payload
            })
        }
    } else {
        checkToCallActionCreators(dispatch, getState, ufpAction,action, action.type)
        // //   // console.log('Dispatching normal action ', action)
        return dispatch(action)
    }
}
const handleResultHandlers= (handlerArray, resultData) => {
    var result = new Promise(async(resolve) => {
        var ufpErrorHandlerResultPromiseArray = []
        handlerArray.map((handlerObject) => {
            if (handlerObject.matcher(resultData)) {
                ufpErrorHandlerResultPromiseArray.push(handlerObject.handler(resultData))
            }
        })
        var promiseAll = await Promise.all(ufpErrorHandlerResultPromiseArray)
        resolve(promiseAll)
    })
    return result
}

const handlePreHandlers= (handlerArray, resultData) => {
    // // console.log('handleSuccessive 2')
    var result = new Promise(async(resolve) => {
        // // console.log('handleSuccessive 2')
        if (handlerArray.length === 0) {
            // // console.log('handleSuccessive 3')
            resolve({
                break: false,
                handled: false
            })
        }
        else {
            var handled = false
            // // console.log('handleSuccessive 4')
            for (var i = 0; i < handlerArray.length; i++) {
                var handlerObject = handlerArray[i]
                if (!handled) {
                    // // console.log('handleSuccessive 5', handlerObject)
                    if (handlerObject.matcher(resultData)) {
                        var handlerRes = await handlerObject.handler(resultData)
                        // // console.log('handleSuccessive 6', handlerRes)
                        if (handlerRes.handled) {
                            // // console.log('handleSuccessive 7', handlerRes)
                            handled = true
                            resolve(handlerRes)
                        }
                    }
                }
            }
            if (!handled) {
                resolve({
                    break: false,
                    handled: false
                })
            }
        }
    })
    return result
}
function createFetchUrl(config, queryParams) {
    config.fetchUrl = config.url + (config.url.indexOf('?') === -1 ? '?' : '&')
    config.fetchUrl += typeof config.paramsSerializer === 'function' ? config.paramsSerializer(config.params) : queryParams(config.params)
}

const ufpMiddlewareRequest= async(options, config) => {
    var requestResponse
    if (options.useAxios) {
        if(typeof options.axiosInstance === 'function' && typeof options.axiosInstance.request=== 'function') {
            requestResponse = await options.axiosInstance.request(config).then((response) => response, (response) => response)
        }else {
            throw new Error('UFP Middleware Error: if you use the middleware with useAxios=true please provide a property axiosInstance in the options')
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
        var isResolve =(typeof config.validateStatus === 'function')? config.validateStatus(requestResponse.status) : validateStatus(requestResponse.status)
        if(!isResolve) {
            var responseClone=requestResponse.clone()
            return await createAxiosLikeErrorResponse(config, responseClone.status, responseClone)
        }
        if (requestResponse.ok) {
            requestResponse.data = await getJSON(requestResponse)
        }
    }
    return requestResponse
}

export default {
    createFetchUrl,
    validateStatus,
    queryParams,
    validateResultHandlerResult,
    addToArrayIfNotExist,
    uniteActionResultTypes,
    wrapDispatcher,
    handleResultHandlers,
    handlePreHandlers,
    ufpMiddlewareRequest,
    getJSON,
    errorToObject,
    ReactPropTypesCheck,
    PropTypesCheck,
    ufpMiddlewarePrepareConfig
}
