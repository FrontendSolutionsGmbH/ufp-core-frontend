'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _QueryParams = require('./QueryParams');

var _QueryParams2 = _interopRequireDefault(_QueryParams);

var _Errors = require('./Errors');

var _UfpMiddlewareHelperUtils = require('./UfpMiddlewareHelperUtils');

var _UfpMiddlewareHelperUtils2 = _interopRequireDefault(_UfpMiddlewareHelperUtils);

var _StringUtils = require('../utils/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

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
    console.log(' ufpMiddlewarePrepareConfig ', JSON.parse(JSON.stringify(ufpAction)));

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
            config.url = url + '?' + Object.keys(_queryParams).map(function (item) {
                return item + '=' + _queryParams[item];
            }).join('&');
        } else {
            config.url = url;
        }

        config.url = _StringUtils2.default.replaceTemplateVar(config.url, urlParams);
    } else {
        config.url = url;
    }
    console.log('ufpMiddlewarePrepareConfig ', JSON.parse(JSON.stringify(config)));
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

var handleResultHandlers = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(handlerArray, resultData) {
        var ufpErrorHandlerResultPromiseArray, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ufpErrorHandlerResultPromiseArray = [];

                        handlerArray.map(function (handlerObject) {
                            if (handlerObject.matcher(resultData)) {
                                ufpErrorHandlerResultPromiseArray.push(handlerObject.handler(resultData));
                            }
                        });
                        _context.next = 4;
                        return Promise.all(ufpErrorHandlerResultPromiseArray);

                    case 4:
                        result = _context.sent;
                        return _context.abrupt('return', result);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function handleResultHandlers(_x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

var handlePreHandlers = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(handlerArray, resultData) {
        var result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!(handlerArray.length === 0)) {
                            _context2.next = 2;
                            break;
                        }

                        return _context2.abrupt('return', {
                            break: false,
                            handled: false
                        });

                    case 2:
                        _context2.next = 4;
                        return handlerArray.reduce(function (previousPromise, currentItem) {
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
                            break: false,
                            handled: false
                        }));

                    case 4:
                        result = _context2.sent;
                        return _context2.abrupt('return', result);

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function handlePreHandlers(_x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}();

var ufpMiddlewareRequest = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(config) {
        var requestResponse, isResolve, responseClone, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        console.log('ufpMiddlewareRequest', JSON.parse(JSON.stringify(config)));

                        _context3.next = 3;
                        return fetch(config.url, {
                            method: config.method,
                            body: config.data,
                            credentials: config.credentials,
                            headers: config.headers || {}
                        });

                    case 3:
                        requestResponse = _context3.sent;
                        isResolve = validateStatus(requestResponse.status);

                        if (isResolve) {
                            _context3.next = 11;
                            break;
                        }

                        // in case of error retrieve content this way
                        responseClone = requestResponse.clone();
                        _context3.next = 9;
                        return createAxiosLikeErrorResponse(config, responseClone.status, responseClone);

                    case 9:
                        result = _context3.sent;
                        return _context3.abrupt('return', result);

                    case 11:
                        _context3.next = 13;
                        return getJSON(requestResponse);

                    case 13:
                        requestResponse.data = _context3.sent;
                        return _context3.abrupt('return', requestResponse);

                    case 15:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function ufpMiddlewareRequest(_x7) {
        return _ref3.apply(this, arguments);
    };
}();

exports.default = {
    ReactPropTypesCheck: ReactPropTypesCheck,
    PropTypesCheck: PropTypesCheck,
    isEmptyObject: isEmptyObject,
    errorToObject: errorToObject,
    validateStatus: validateStatus,
    createConfigDefault: createConfigDefault,
    infoLogger: infoLogger,
    queryParams: _QueryParams2.default,
    ufpMiddlewarePrepareConfig: ufpMiddlewarePrepareConfig,
    validateResultHandlerResult: validateResultHandlerResult,
    uniteActionResultTypes: uniteActionResultTypes,
    wrapDispatcher: wrapDispatcher,
    handleResultHandlers: handleResultHandlers,
    handlePreHandlers: handlePreHandlers,
    ufpMiddlewareRequest: ufpMiddlewareRequest
};