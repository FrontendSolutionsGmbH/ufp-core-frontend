'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _TemplateUtils = require('./TemplateUtils');

var _TemplateUtils2 = _interopRequireDefault(_TemplateUtils);

var _queryParams2 = require('./queryParams');

var _queryParams3 = _interopRequireDefault(_queryParams2);

var _Errors = require('./Errors');

var _UfpMiddlewareHelperUtils = require('./UfpMiddlewareHelperUtils');

var _UfpMiddlewareHelperUtils2 = _interopRequireDefault(_UfpMiddlewareHelperUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactPropTypesCheck = _UfpMiddlewareHelperUtils2.default.ReactPropTypesCheck,
    PropTypesCheck = _UfpMiddlewareHelperUtils2.default.PropTypesCheck,
    getJSON = _UfpMiddlewareHelperUtils2.default.getJSON,
    isEmptyObject = _UfpMiddlewareHelperUtils2.default.isEmptyObject,
    errorToObject = _UfpMiddlewareHelperUtils2.default.errorToObject,
    validateStatus = _UfpMiddlewareHelperUtils2.default.validateStatus,
    mergeArrayOfObjects = _UfpMiddlewareHelperUtils2.default.mergeArrayOfObjects,
    createAxiosLikeErrorResponse = _UfpMiddlewareHelperUtils2.default.createAxiosLikeErrorResponse,
    addToArrayIfNotExist = _UfpMiddlewareHelperUtils2.default.addToArrayIfNotExist,
    createConfigDefault = _UfpMiddlewareHelperUtils2.default.createConfigDefault,
    infoLogger = _UfpMiddlewareHelperUtils2.default.infoLogger;


var ufpMiddlewarePrepareConfig = function ufpMiddlewarePrepareConfig(ufpAction) {
    var ufpDefinition = ufpAction.ufpDefinition,
        ufpData = ufpAction.ufpData;
    var url = ufpDefinition.url,
        method = ufpDefinition.method;

    var config = {};
    config.method = method;
    config.timeout = 15000;
    if (ufpData && ufpData.body) {
        config.data = ufpData.body;
    }
    if (ufpData) {
        var urlParams = ufpData.urlParams,
            _queryParams = ufpData.queryParams;

        if (_queryParams && !isEmptyObject(_queryParams)) {
            config.params = _queryParams;
        }
        if (urlParams && !isEmptyObject(urlParams)) {
            config.url = _TemplateUtils2.default.urlParamsToUrl(url, urlParams);
        } else {
            config.url = url;
        }
    } else {
        config.url = url;
    }
    return config;
};

var validateResultHandlerResult = function validateResultHandlerResult(handlerResultArray) {
    var successCount = handlerResultArray.reduce(function (curr, obj) {
        return obj.success ? curr + 1 : curr;
    }, 0);
    var retryCount = handlerResultArray.reduce(function (curr, obj) {
        return obj.retry ? curr + 1 : curr;
    }, 0);
    var handledCount = handlerResultArray.reduce(function (curr, obj) {
        return obj.handled ? curr + 1 : curr;
    }, 0);
    var additionalPayload = mergeArrayOfObjects(handlerResultArray, function (item) {
        return item.additionalPayload;
    });
    //
    //  console.log('UFPMiddleware validateHandlerResult intermediate', successCount, handledCount, retryCount)
    if (successCount > 1) {
        //console.log('UFPMiddleware  more than 1 success', successCount)
        throw new _Errors.UfpMiddlewareResulthandlerMoreThenOneSuccessError();
    }
    // // console.log('handledCount', handledCount, handlerResultArray)
    return {
        handled: handledCount > 0,
        retry: retryCount > 0,
        success: successCount > 0,
        additionalPayload: additionalPayload
    };
};

var uniteActionResultTypes = function uniteActionResultTypes() {
    var ufpTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var actionConstants = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var target = {
        REQUEST: [],
        SUCCESS: [],
        FAILURE: [],
        END: []
    };
    for (var i in target) {
        if (ufpTypes[i] !== undefined) {
            if (Array.isArray(ufpTypes[i])) {
                ufpTypes[i].map(function (element) {
                    return addToArrayIfNotExist(target[i], element);
                });
            } else {
                addToArrayIfNotExist(target[i], ufpTypes[i]);
            }
        }
        if (actionConstants[i] !== undefined) {
            if (Array.isArray(actionConstants[i])) {
                actionConstants[i].map(function (element) {
                    return addToArrayIfNotExist(target[i], element);
                });
            } else {
                addToArrayIfNotExist(target[i], actionConstants[i]);
            }
        }
    }
    return target;
};
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

var wrapDispatcher = function wrapDispatcher(dispatch /*, getState , ufpAction*/) {
    return function (action) {
        if (Array.isArray(action.type)) {
            for (var i in action.type) {
                //checkToCallActionCreators(dispatch, getState, ufpAction, action, action.type[i])
                // //   // console.log('Dispatching array action', i, action.type[i], action.payload)
                dispatch({
                    type: action.type[i],
                    payload: action.payload
                });
            }
        } else {
            //checkToCallActionCreators(dispatch, getState, ufpAction,action, action.type)
            // //   // console.log('Dispatching normal action ', action)
            return dispatch(action);
        }
    };
};

var handleResultHandlers = async function handleResultHandlers(handlerArray, resultData) {
    var ufpErrorHandlerResultPromiseArray = [];
    handlerArray.map(function (handlerObject) {
        if (handlerObject.matcher(resultData)) {
            ufpErrorHandlerResultPromiseArray.push(handlerObject.handler(resultData));
        }
    });
    return await _promise2.default.all(ufpErrorHandlerResultPromiseArray);
};

var handlePreHandlers = async function handlePreHandlers(handlerArray, resultData) {
    if (handlerArray.length === 0) {
        return {
            break: false,
            handled: false
        };
    }
    var result = await handlerArray.reduce(function (previousPromise, currentItem) {
        return previousPromise.then(function (previousResult) {
            if (!previousResult.handled) {
                if (currentItem.matcher(resultData)) {
                    return _promise2.default.resolve(currentItem.handler(resultData));
                } else {
                    return _promise2.default.resolve(previousResult);
                }
            } else {
                return _promise2.default.resolve(previousResult);
            }
        });
    }, _promise2.default.resolve({
        break: false,
        handled: false
    }));
    return result;
};

function createFetchUrl(config, queryParams) {
    config.fetchUrl = config.url + (config.url.indexOf('?') === -1 ? '?' : '&');
    config.fetchUrl += typeof config.paramsSerializer === 'function' ? config.paramsSerializer(config.params) : queryParams(config.params);
}

var ufpMiddlewareRequest = async function ufpMiddlewareRequest(options, config) {

    var requestResponse;
    if (options.useAxios) {
        if (typeof options.axiosInstance === 'function' && typeof options.axiosInstance.request === 'function') {
            requestResponse = await options.axiosInstance.request(config).then(function (response) {
                return response;
            }, function (response) {
                return response;
            });
        } else {
            throw new Error('UFP Middleware Error: if you use the middleware with useAxios=true please provide a property axiosInstance in the options');
        }
    } else {
        if (config.params && !config.fetchUrl) {
            createFetchUrl(config, _queryParams3.default);
        }

        requestResponse = await fetch(config.fetchUrl, {
            method: config.method,
            body: config.data,
            credentials: config.credentials,
            headers: config.headers || {}
        });
        var isResolve = typeof config.validateStatus === 'function' ? config.validateStatus(requestResponse.status) : validateStatus(requestResponse.status);
        if (!isResolve) {
            var responseClone = requestResponse.clone();
            return await createAxiosLikeErrorResponse(config, responseClone.status, responseClone);
        }
        requestResponse.data = await getJSON(requestResponse);
    }
    return requestResponse;
};

exports.default = {
    ReactPropTypesCheck: ReactPropTypesCheck,
    PropTypesCheck: PropTypesCheck,
    getJSON: getJSON,
    isEmptyObject: isEmptyObject,
    errorToObject: errorToObject,
    validateStatus: validateStatus,
    mergeArrayOfObjects: mergeArrayOfObjects,
    createAxiosLikeErrorResponse: createAxiosLikeErrorResponse,
    addToArrayIfNotExist: addToArrayIfNotExist,
    createConfigDefault: createConfigDefault,
    infoLogger: infoLogger,

    queryParams: _queryParams3.default,

    ufpMiddlewarePrepareConfig: ufpMiddlewarePrepareConfig,
    validateResultHandlerResult: validateResultHandlerResult,
    uniteActionResultTypes: uniteActionResultTypes,
    wrapDispatcher: wrapDispatcher,
    handleResultHandlers: handleResultHandlers,
    handlePreHandlers: handlePreHandlers,
    createFetchUrl: createFetchUrl,
    ufpMiddlewareRequest: ufpMiddlewareRequest
};