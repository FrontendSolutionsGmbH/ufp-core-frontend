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

function ReactPropTypesCheck(object, propTypes, _throw) {

    // const stringJSON = JSON.stringify(object)
    var error = _propTypes2['default'].checkPropTypes(propTypes, object, 'prop');
    if (error) {
        if (_throw) {
            throw error;
        } else {
            console.error(error.message);
        }
    }
}
function PropTypesCheck(data, propTypes) {
    console.log();
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
    var breakCount = handlerResultArray.reduce(function (curr, obj) {
        return obj['break'] ? curr + 1 : curr;
    }, 0);

    //  // //   // console.log('UFPMiddleware validateHandlerResult intermediate', successCount, handledCount, retryCount)
    if (successCount > 1) {
        // // //   // console.log('UFPMiddleware  more than 1 success')
        throw new Error('UFPMiddleware  more than 1 success');
    } else if (successCount === 1) {}
    //    // //   // console.log('UFPMiddleware 1 success: dispatch _SUCCESS ')

    // // console.log('handledCount', handledCount, handlerResultArray)
    return {
        handled: handledCount > 0,
        retry: retryCount > 0,
        success: successCount > 0,
        'break': breakCount > 0
    };
};
var addToArrayIfNotExist = function addToArrayIfNotExist(arr, item) {
    if (arr.indexOf(item) === -1) {
        arr.push(item);
    }
};
var uniteActionResultTypes = function uniteActionResultTypes(ufpTypes, incoming) {
    for (var i in incoming) {
        var item = incoming[i];
        // verify in result object is key present
        if (ufpTypes[i] === undefined) {
            ufpTypes[i] = [];
        }

        // check if item is of type array
        if (Array.isArray(item)) {
            // add all from incoming array
            item.map(function (element) {
                return addToArrayIfNotExist(ufpTypes[i], element);
            });
        } else {
            // add single string value
            addToArrayIfNotExist(ufpTypes[i], item);
        }
    }
};
var checkToCallActionCreators = function checkToCallActionCreators(dispatch, getState, ufpAction, action, actionType) {
    if (ufpAction.ufpActionCreators) {
        // //   // console.log('UFPMiddleware calling action creators', ufpAction, actionType)
        var actionCreator = ufpAction.ufpActionCreators[actionType];
        if (Array.isArray(actionCreator)) {
            // call all actioncreators
            for (var i in actionCreator) {
                // call each actioncreator in array individually
                if (typeof actionCreator[i] === 'function') {
                    dispatch(actionCreator[i]({
                        payload: Object.assign({}, { globalState: getState() }, action.payload),
                        dispatch: dispatch
                    }));
                }
            }
        } else if (typeof actionCreator === 'function') {
            // //   // console.log('UFPMiddleware calling action creators', ufpAction, actionType)
            // just call single listed creator
            dispatch(actionCreator({
                payload: Object.assign({}, { globalState: getState() }, action.payload),
                dispatch: dispatch
            }));
        }
    }
};
var wrapDispatcher = function wrapDispatcher(dispatch, getState, ufpAction) {
    return function (action) {

        if (Array.isArray(action.type)) {
            for (var i in action.type) {
                checkToCallActionCreators(dispatch, getState, ufpAction, action, action.type[i]);
                // //   // console.log('Dispatching array action', i, action.type[i], action.payload)
                dispatch({
                    type: action.type[i],
                    payload: action.payload
                });
            }
        } else {
            checkToCallActionCreators(dispatch, getState, ufpAction, action, action.type);
            // //   // console.log('Dispatching normal action ', action)
            return dispatch(action);
        }
    };
};
var handleResultHandlers = function handleResultHandlers(handlerArray, resultData) {
    var result = new Promise(function callee$1$0(resolve) {
        var ufpErrorHandlerResultPromiseArray, promiseAll;
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    ufpErrorHandlerResultPromiseArray = [];

                    handlerArray.map(function (handlerObject) {
                        if (handlerObject.matcher(resultData)) {
                            ufpErrorHandlerResultPromiseArray.push(handlerObject.handler(resultData));
                        }
                    });
                    context$2$0.next = 4;
                    return regeneratorRuntime.awrap(Promise.all(ufpErrorHandlerResultPromiseArray));

                case 4:
                    promiseAll = context$2$0.sent;

                    resolve(promiseAll);

                case 6:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, _this);
    });
    return result;
};

var handlePreHandlers = function handlePreHandlers(handlerArray, resultData) {
    // // console.log('handleSuccessive 2')
    var result = new Promise(function callee$1$0(resolve) {
        var handled, i, handlerObject, handlerRes;
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    if (!(handlerArray.length === 0)) {
                        context$2$0.next = 4;
                        break;
                    }

                    // // console.log('handleSuccessive 3')
                    resolve({
                        'break': false,
                        handled: false
                    });
                    context$2$0.next = 18;
                    break;

                case 4:
                    handled = false;
                    i = 0;

                case 6:
                    if (!(i < handlerArray.length)) {
                        context$2$0.next = 17;
                        break;
                    }

                    handlerObject = handlerArray[i];

                    if (handled) {
                        context$2$0.next = 14;
                        break;
                    }

                    if (!handlerObject.matcher(resultData)) {
                        context$2$0.next = 14;
                        break;
                    }

                    context$2$0.next = 12;
                    return regeneratorRuntime.awrap(handlerObject.handler(resultData));

                case 12:
                    handlerRes = context$2$0.sent;

                    // // console.log('handleSuccessive 6', handlerRes)
                    if (handlerRes.handled) {
                        // // console.log('handleSuccessive 7', handlerRes)
                        handled = true;
                        resolve(handlerRes);
                    }

                case 14:
                    i++;
                    context$2$0.next = 6;
                    break;

                case 17:
                    if (!handled) {
                        resolve({
                            'break': false,
                            handled: false
                        });
                    }

                case 18:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, _this);
    });
    return result;
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
                    context$1$0.next = 11;
                    break;
                }

                console.log('instanceof', options.axiosInstance instanceof Axios, options.axiosInstance.constructor.name);

                if (!(typeof options.axiosInstance === 'function' && typeof options.axiosInstance.request === 'function')) {
                    context$1$0.next = 8;
                    break;
                }

                context$1$0.next = 5;
                return regeneratorRuntime.awrap(options.axiosInstance.request(config).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                }));

            case 5:
                requestResponse = context$1$0.sent;
                context$1$0.next = 9;
                break;

            case 8:
                throw new Error('UFP Middleware Error: if you use the middleware with useAxios=true please provide a property axiosInstance in the options');

            case 9:
                context$1$0.next = 23;
                break;

            case 11:

                if (config.params && !config.fetchUrl) {
                    createFetchUrl(config, _queryParams3['default']);
                }
                context$1$0.next = 14;
                return regeneratorRuntime.awrap(fetch(config.fetchUrl, {
                    method: config.method,
                    body: config.data,
                    credentials: config.credentials,
                    headers: config.headers || {}
                }));

            case 14:
                requestResponse = context$1$0.sent;
                isResolve = typeof config.validateStatus === 'function' ? config.validateStatus(requestResponse.status) : validateStatus(requestResponse.status);

                if (isResolve) {
                    context$1$0.next = 19;
                    break;
                }

                responseClone = requestResponse.clone();
                return context$1$0.abrupt('return', createAxiosLikeErrorResponse(config, responseClone.status, responseClone));

            case 19:
                if (!requestResponse.ok) {
                    context$1$0.next = 23;
                    break;
                }

                context$1$0.next = 22;
                return regeneratorRuntime.awrap(getJSON(requestResponse));

            case 22:
                requestResponse.data = context$1$0.sent;

            case 23:
                return context$1$0.abrupt('return', requestResponse);

            case 24:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
};

exports['default'] = {
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

// // console.log('handleSuccessive 2')

// // console.log('handleSuccessive 4')

// // console.log('handleSuccessive 5', handlerObject)