'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TemplateUtils = require('./TemplateUtils');

var _TemplateUtils2 = _interopRequireDefault(_TemplateUtils);

var _queryParams2 = require('./queryParams');

var _queryParams3 = _interopRequireDefault(_queryParams2);

var _checkPropTypes = require('check-prop-types');

var _checkPropTypes2 = _interopRequireDefault(_checkPropTypes);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function ReactPropTypesCheck(object, propTypes, _throw) {
    // const stringJSON = JSON.stringify(object)
    var error = (0, _checkPropTypes2['default'])(propTypes, object, 'prop');
    if (error) {
        if (_throw) {
            throw new Error(error);
        } else {
            console.error(error);
        }
    }
}
function PropTypesCheck(data, propTypes) {
    try {
        ReactPropTypesCheck(data, propTypes, true);
        return true;
    } catch (e) {
        // console.error('Validation error', e)
        return false;
    }
}

function isEmptyObject(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

function errorToObject(err) {
    if (!(err instanceof Error)) {
        throw new TypeError('invalid input argument. Must provide an error object. Value: `' + err + '`.');
    }
    var keys;
    var out = {};
    out.errorToObject = true;
    out.message = err.message;
    if (err.stack) {
        out.stack = err.stack;
    }
    // Possible Node.js (system error) properties...
    if (err.code) {
        out.code = err.code;
    }
    // Any enumerable properties...
    keys = Object.keys(err);
    for (var i = 0; i < keys.length; i++) {
        if (err[keys[i]] instanceof Response) {
            out[keys[i]] = err[keys[i]];
        } else {
            out[keys[i]] = JSON.parse(JSON.stringify(err[keys[i]]));
        }
    }
    return out;
}
function validateStatus(status) {
    return status >= 200 && status < 300;
}

/**
 * Extract JSON body from a server response made with fetch
 *
 * @function getJSON
 * @access public
 * @param {object} res - A raw response object
 * @returns {promise|undefined}
 */
var getJSON = function getJSON(res) {
    var contentType, emptyCodes;
    return regeneratorRuntime.async(function getJSON$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                contentType = res.headers.get('Content-Type');
                emptyCodes = [204, 205];

                if (!(! ~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json'))) {
                    context$1$0.next = 6;
                    break;
                }

                return context$1$0.abrupt('return', res.json());

            case 6:
                return context$1$0.abrupt('return', Promise.resolve());

            case 7:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
};

exports.getJSON = getJSON;
var ufpMiddlewarePrepareConfig = function ufpMiddlewarePrepareConfig(ufpAction) {
    var ufpDefinition = ufpAction.ufpDefinition;
    var ufpData = ufpAction.ufpData;
    var url = ufpDefinition.url;
    var method = ufpDefinition.method;

    var config = {};
    config.method = method;
    config.timeout = 15000;
    if (ufpData && ufpData.body) {
        config.data = ufpData.body;
    }
    if (ufpData) {
        var urlParams = ufpData.urlParams;
        var _queryParams = ufpData.queryParams;

        if (_queryParams && !isEmptyObject(_queryParams)) {
            config.params = _queryParams;
        }
        if (urlParams && !isEmptyObject(urlParams)) {
            config.url = _TemplateUtils2['default'].urlParamsToUrl(url, urlParams);
        } else {
            config.url = url;
        }
    } else {
        config.url = url;
    }
    return config;
};
var createAxiosLikeErrorResponse = function createAxiosLikeErrorResponse(config, code, response) {
    var err;
    return regeneratorRuntime.async(function createAxiosLikeErrorResponse$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                err = new Error('Request failed with status code ' + response.status);

                err.config = config;
                if (code) {
                    err.code = code;
                }
                err.response = response;
                context$1$0.next = 6;
                return regeneratorRuntime.awrap(getJSON(response));

            case 6:
                err.response.data = context$1$0.sent;
                return context$1$0.abrupt('return', err);

            case 8:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
};
var mergeArrayOfObjects = function mergeArrayOfObjects(arr) {
    var selector = arguments.length <= 1 || arguments[1] === undefined ? function (t) {
        return t;
    } : arguments[1];

    return arr.reduce(function (acc, curr) {
        return (0, _deepmerge2['default'])(acc, selector(curr) || {});
    }, {});
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
        throw new Error('UFPMiddleware  more than 1 success');
    } else if (successCount === 1) {}
    //    // //   // console.log('UFPMiddleware 1 success: dispatch _SUCCESS ')

    // // console.log('handledCount', handledCount, handlerResultArray)
    return {
        handled: handledCount > 0,
        retry: retryCount > 0,
        success: successCount > 0,
        additionalPayload: additionalPayload
    };
};
var addToArrayIfNotExist = function addToArrayIfNotExist(arr, item) {
    if (arr.indexOf(item) === -1) {
        arr.push(item);
    }
};
var uniteActionResultTypes = function uniteActionResultTypes(ufpTypes, actionConstants) {
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

var handleResultHandlers = function handleResultHandlers(handlerArray, resultData) {
    var ufpErrorHandlerResultPromiseArray;
    return regeneratorRuntime.async(function handleResultHandlers$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                ufpErrorHandlerResultPromiseArray = [];

                handlerArray.map(function (handlerObject) {
                    if (handlerObject.matcher(resultData)) {
                        ufpErrorHandlerResultPromiseArray.push(handlerObject.handler(resultData));
                    }
                });
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(Promise.all(ufpErrorHandlerResultPromiseArray));

            case 4:
                return context$1$0.abrupt('return', context$1$0.sent);

            case 5:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
};

var handlePreHandlers = function handlePreHandlers(handlerArray, resultData) {
    var result;
    return regeneratorRuntime.async(function handlePreHandlers$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                if (!(handlerArray.length === 0)) {
                    context$1$0.next = 2;
                    break;
                }

                return context$1$0.abrupt('return', {
                    'break': false,
                    handled: false
                });

            case 2:
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(handlerArray.reduce(function (previousPromise, currentItem) {
                    return previousPromise.then(function (previousResult) {
                        if (!previousResult.handled) {
                            if (currentItem.matcher(resultData)) {
                                return Promise.resolve(currentItem.handler(resultData));
                            } else {
                                return Promise.resolve(previousResult);
                            }
                        } else {
                            return Promise.resolve(previousResult);
                        }
                    });
                }, Promise.resolve({
                    'break': false,
                    handled: false
                })));

            case 4:
                result = context$1$0.sent;
                return context$1$0.abrupt('return', result);

            case 6:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
};

function createFetchUrl(config, queryParams) {
    config.fetchUrl = config.url + (config.url.indexOf('?') === -1 ? '?' : '&');
    config.fetchUrl += typeof config.paramsSerializer === 'function' ? config.paramsSerializer(config.params) : queryParams(config.params);
}

var ufpMiddlewareRequest = function ufpMiddlewareRequest(options, config) {
    var requestResponse, isResolve, responseClone;
    return regeneratorRuntime.async(function ufpMiddlewareRequest$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                if (!options.useAxios) {
                    context$1$0.next = 10;
                    break;
                }

                if (!(typeof options.axiosInstance === 'function' && typeof options.axiosInstance.request === 'function')) {
                    context$1$0.next = 7;
                    break;
                }

                context$1$0.next = 4;
                return regeneratorRuntime.awrap(options.axiosInstance.request(config).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                }));

            case 4:
                requestResponse = context$1$0.sent;
                context$1$0.next = 8;
                break;

            case 7:
                throw new Error('UFP Middleware Error: if you use the middleware with useAxios=true please provide a property axiosInstance in the options');

            case 8:
                context$1$0.next = 24;
                break;

            case 10:
                if (config.params && !config.fetchUrl) {
                    createFetchUrl(config, _queryParams3['default']);
                }

                context$1$0.next = 13;
                return regeneratorRuntime.awrap(fetch(config.fetchUrl, {
                    method: config.method,
                    body: config.data,
                    credentials: config.credentials,
                    headers: config.headers || {}
                }));

            case 13:
                requestResponse = context$1$0.sent;
                isResolve = typeof config.validateStatus === 'function' ? config.validateStatus(requestResponse.status) : validateStatus(requestResponse.status);

                if (isResolve) {
                    context$1$0.next = 20;
                    break;
                }

                responseClone = requestResponse.clone();
                context$1$0.next = 19;
                return regeneratorRuntime.awrap(createAxiosLikeErrorResponse(config, responseClone.status, responseClone));

            case 19:
                return context$1$0.abrupt('return', context$1$0.sent);

            case 20:
                if (!requestResponse.ok) {
                    context$1$0.next = 24;
                    break;
                }

                context$1$0.next = 23;
                return regeneratorRuntime.awrap(getJSON(requestResponse));

            case 23:
                requestResponse.data = context$1$0.sent;

            case 24:
                return context$1$0.abrupt('return', requestResponse);

            case 25:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
};

exports['default'] = {
    mergeArrayOfObjects: mergeArrayOfObjects,
    isEmptyObject: isEmptyObject,
    createAxiosLikeErrorResponse: createAxiosLikeErrorResponse,
    createFetchUrl: createFetchUrl,
    validateStatus: validateStatus,
    queryParams: _queryParams3['default'],
    validateResultHandlerResult: validateResultHandlerResult,
    addToArrayIfNotExist: addToArrayIfNotExist,
    uniteActionResultTypes: uniteActionResultTypes,
    wrapDispatcher: wrapDispatcher,
    handleResultHandlers: handleResultHandlers,
    handlePreHandlers: handlePreHandlers,
    ufpMiddlewareRequest: ufpMiddlewareRequest,
    getJSON: getJSON,
    errorToObject: errorToObject,
    ReactPropTypesCheck: ReactPropTypesCheck,
    PropTypesCheck: PropTypesCheck,
    ufpMiddlewarePrepareConfig: ufpMiddlewarePrepareConfig
};