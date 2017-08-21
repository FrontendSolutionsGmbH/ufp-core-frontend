'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UfpRequestActions = require('./UfpRequestActions');

var _UfpRequestActions2 = _interopRequireDefault(_UfpRequestActions);

var _Validation = require('./Validation');

var _Errors = require('./Errors');

var _UfpMiddlewareUtils = require('./UfpMiddlewareUtils');

var _UfpMiddlewareUtils2 = _interopRequireDefault(_UfpMiddlewareUtils);

var _UfpMiddlewareConstants = require('./UfpMiddlewareConstants');

var _UfpMiddlewareConstants2 = _interopRequireDefault(_UfpMiddlewareConstants);

var _UfpMiddlewareConfiguration = require('./UfpMiddlewareConfiguration');

var _UfpMiddlewareConfiguration2 = _interopRequireDefault(_UfpMiddlewareConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUfpMiddleware() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    return function (_ref) {
        var getState = _ref.getState,
            dispatch = _ref.dispatch;

        return function (next) {
            return async function (action) {
                if (!(0, _Validation.isUFPAction)(action)) {
                    return next(action);
                }
                //  console.log('UFP Middleware ', UFPMiddlewareConfiguration, action)

                var dispatchPromise = new Promise(async function (resolve /*, reject */) {
                    // Do not process actions without a [UFP_ACTION] property
                    // Try to dispatch an error request FSA for invalid UFPAction's
                    var validationErrors = (0, _Validation.validateUFPAction)(action);
                    if (validationErrors.length > 0) {
                        // console.log('UFP MIDDLEWARE validationErrors', validationErrors)
                        var validationErr = new _Errors.InvalidUFPAction(validationErrors[0]);
                        dispatch({
                            type: _UfpMiddlewareConstants2.default.ActionConstants.UFP_ACTION_ERROR,
                            payload: validationErr
                        });
                        resolve(validationErr);
                    } else {
                        // Parse the validated UFP_REQUEST_ACTION action
                        var ufpAction = action[_UfpRequestActions2.default.UFP_REQUEST_ACTION];
                        var dispatchWrapper = _UfpMiddlewareUtils2.default.wrapDispatcher(dispatch /*, getState, ufpAction*/);
                        var ufpDefinition = ufpAction.ufpDefinition,
                            ufpPayload = ufpAction.ufpPayload,
                            ufpResultHandler = ufpAction.ufpResultHandler,
                            ufpPreHandler = ufpAction.ufpPreHandler,
                            ufpTypes = ufpAction.ufpTypes;

                        var additionalPayload = {
                            getState: getState,
                            globalState: getState()
                        };
                        var thePayload = Object.assign({}, ufpPayload, additionalPayload);
                        // Object.assign({}, ufpDefinition.actionConstants || {}, ufpAction.ufpTypes || {})
                        // join together 2 action type definitions, one from action and one from definition, both definitions are handled as array

                        var ufpTypesUnited = _UfpMiddlewareUtils2.default.uniteActionResultTypes(ufpTypes, ufpDefinition.actionConstants);
                        var MAX_RETRY_COUNT = options.maxRetryCount || 5;
                        var retry = true;
                        var retryCount = 0;
                        var makeRequest = true;
                        var totalSuccess = true;
                        var requestResponse = null;
                        var resultContainerForPreHandler = {
                            ufpAction: {
                                ufpDefinition: ufpDefinition,
                                ufpPayload: thePayload,
                                ufpResultHandler: ufpResultHandler,
                                ufpPreHandler: ufpPreHandler,
                                ufpTypes: ufpTypesUnited
                            },
                            ufpDefinition: ufpDefinition,
                            dispatch: dispatchWrapper,
                            dispatchOriginal: dispatch,
                            getState: getState,
                            globalState: getState()
                        };
                        var configPrepared = _UfpMiddlewareUtils2.default.ufpMiddlewarePrepareConfig(ufpAction);
                        //  // console.log('UfP types', ufpTypesUnited)
                        var allPreHandler = [].concat(ufpPreHandler).concat(_UfpMiddlewareConfiguration2.default.get().preRequestHandling);
                        // // console.log('ufpPreHandler', ufpPreHandler, resultContainerForPreHandler, preHandler)
                        var preHandlerResult = await _UfpMiddlewareUtils2.default.handlePreHandlers(allPreHandler, resultContainerForPreHandler);
                        // // console.log('preHandlerResult ', preHandlerResult)
                        // // console.log('UFPMiddleware PreHandlerResult makeRequest:', makeRequestResult)
                        var validateResult;
                        makeRequest = !preHandlerResult.break;
                        if (makeRequest) {
                            var config;
                            //console.log('UFPMiddleware executing: ', retryCount, ufpAction)
                            if (_UfpMiddlewareConfiguration2.default.get().createConfig === undefined || typeof _UfpMiddlewareConfiguration2.default.get().createConfig !== 'function') {
                                config = _UfpMiddlewareUtils2.default.createConfigDefault(configPrepared);
                            } else {
                                config = _UfpMiddlewareConfiguration2.default.get().createConfig(configPrepared, ufpAction, getState());
                            }

                            // // console.log('UFP MIDDLEWARE config', config)
                            dispatchWrapper({
                                type: ufpTypesUnited.REQUEST,
                                payload: thePayload
                            });
                            while (retry && retryCount < MAX_RETRY_COUNT) {
                                validateResult = undefined;
                                retryCount += 1;

                                // Make the API call
                                if (options.debug) {
                                    _UfpMiddlewareUtils2.default.infoLogger('[UFP MIDDLEWARE:] making request', config);
                                }

                                requestResponse = await _UfpMiddlewareUtils2.default.ufpMiddlewareRequest(options, config);

                                if (options.debug) {
                                    _UfpMiddlewareUtils2.default.infoLogger('[UFP MIDDLEWARE:] making request finished', requestResponse instanceof Error ? _UfpMiddlewareUtils2.default.errorToObject(requestResponse) : requestResponse);
                                }

                                var resultContainerForHandler = {
                                    ufpAction: {
                                        ufpDefinition: ufpDefinition,
                                        ufpPayload: thePayload,
                                        ufpResultHandler: ufpResultHandler,
                                        ufpPreHandler: ufpPreHandler,
                                        ufpTypes: ufpTypesUnited
                                    },
                                    dispatch: dispatchWrapper,
                                    dispatchOriginal: dispatch,
                                    getState: getState,
                                    globalState: getState(),
                                    ufpDefinition: ufpDefinition,
                                    requestResponse: requestResponse
                                };
                                var promiseAll0;
                                var promiseAll1;

                                var resultHandler;
                                //  console.log('ufpResultHandler', ufpResultHandler, ufpDefinition)
                                if (ufpResultHandler !== undefined && ufpResultHandler.length > 0) {
                                    resultHandler = ufpResultHandler;
                                    // // // console.log('resultHandler', resultHandler)
                                    promiseAll0 = await _UfpMiddlewareUtils2.default.handleResultHandlers(resultHandler, resultContainerForHandler);
                                    // console.log('UFPMiddleware HandlerResult: ', promiseAll0, resultHandler)
                                    try {
                                        validateResult = _UfpMiddlewareUtils2.default.validateResultHandlerResult(promiseAll0);
                                        // console.log('ResultHandler', validateResult)
                                        // console.log('UFPMiddleware Aggregated Result : ', validateResult)
                                        if (validateResult.handled && validateResult.success) {
                                            dispatchWrapper({
                                                type: ufpTypesUnited.SUCCESS,
                                                payload: Object.assign(Object.assign({}, { data: requestResponse.data }, ufpAction.ufpPayload), { additionalPayload: validateResult.additionalPayload })
                                            });
                                        }
                                    } catch (err) {
                                        //UfpMiddlewareResulthandlerMoreThenOneSuccessError
                                        dispatchWrapper({
                                            type: ufpTypesUnited.FAILURE,
                                            payload: err,
                                            error: true
                                        });
                                        dispatchWrapper({
                                            type: ufpTypesUnited.END,
                                            payload: thePayload
                                        });
                                        return resolve(err);
                                    }
                                }
                                // console.log('UFPMiddleware validateResult: ', validateResult)
                                if (!resultHandler || validateResult && !validateResult.handled) {

                                    promiseAll1 = await _UfpMiddlewareUtils2.default.handleResultHandlers(_UfpMiddlewareConfiguration2.default.get().resultHandlings.genericResultHandler, resultContainerForHandler);
                                    try {
                                        // console.log('genericResultHandler', promiseAll1)
                                        validateResult = _UfpMiddlewareUtils2.default.validateResultHandlerResult(promiseAll1);
                                        if (validateResult.handled && validateResult.success) {
                                            dispatchWrapper({
                                                type: ufpTypesUnited.SUCCESS,
                                                payload: Object.assign(Object.assign({}, { data: requestResponse.data }, ufpAction.ufpPayload), { additionalPayload: validateResult.additionalPayload })
                                            });
                                        }
                                    } catch (err) {
                                        //UfpMiddlewareResulthandlerMoreThenOneSuccessError
                                        dispatchWrapper({
                                            type: ufpTypesUnited.FAILURE,
                                            payload: err,
                                            error: true
                                        });
                                        dispatchWrapper({
                                            type: ufpTypesUnited.END,
                                            payload: thePayload
                                        });
                                        return resolve(err);
                                    }
                                }

                                // console.log('xxxxx middleware promiseall1', promiseAll1, validateResult)
                                // check if if request is unhandled
                                if (!validateResult.handled && !validateResult.success && !validateResult.retry) {
                                    //    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ')
                                    var promiseAll2;
                                    promiseAll2 = await _UfpMiddlewareUtils2.default.handleResultHandlers(_UfpMiddlewareConfiguration2.default.get().resultHandlings.unhandledResultHandler, resultContainerForHandler);

                                    // // console.log('xxxxx middleware promiseall2',promiseAll2)
                                    //    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ', promiseAll2)
                                    // set validate result to the one returned from unhandledResultHandler
                                    try {
                                        validateResult = _UfpMiddlewareUtils2.default.validateResultHandlerResult(promiseAll2);
                                        if (validateResult.handled && validateResult.success) {
                                            dispatchWrapper({
                                                type: ufpTypesUnited.SUCCESS,
                                                payload: Object.assign(Object.assign({}, { data: requestResponse.data }, ufpAction.ufpPayload), { additionalPayload: validateResult.additionalPayload })
                                            });
                                        }
                                    } catch (err) {
                                        //UfpMiddlewareResulthandlerMoreThenOneSuccessError
                                        dispatchWrapper({
                                            type: ufpTypesUnited.FAILURE,
                                            payload: err,
                                            error: true
                                        });
                                        dispatchWrapper({
                                            type: ufpTypesUnited.END,
                                            payload: thePayload
                                        });
                                        return resolve(err);
                                    }

                                    //    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ', validateResult)
                                }

                                retry = validateResult.retry;
                                if (!retry && !validateResult.success) {
                                    //  console.log('xxxxx middleware rejectin0')
                                    dispatchWrapper({
                                        type: ufpTypesUnited.FAILURE,
                                        payload: Object.assign(Object.assign({}, { data: requestResponse.data }, ufpAction.ufpPayload), { additionalPayload: validateResult.additionalPayload })

                                    });
                                    totalSuccess = false;
                                    // // console.log('xxxxx middleware rejecting1')
                                    //   reject()
                                    // reject()
                                    //   // // console.log('xxxxx middleware rejecting2')
                                }
                                //   // // console.log('xxxxx middleware looping3')
                            } // end while
                            if (retryCount === MAX_RETRY_COUNT) {
                                var err = new _Errors.UfpMiddlewareMaxRetryReachedError();
                                dispatchWrapper({
                                    type: ufpTypesUnited.FAILURE,
                                    payload: err,
                                    error: true
                                }); //Flux Standard Action , if error is true, the payload SHOULD be an error object.
                                dispatchWrapper({
                                    type: ufpTypesUnited.END,
                                    payload: thePayload
                                });
                                return resolve(err);
                            } else if (totalSuccess) {
                                resolve(requestResponse); //resolve for success
                            } else {
                                resolve(requestResponse); //resolve when handler say its failure
                            }
                        } else {
                            // end if(makeRequest)
                            var err = new _Errors.UfpMiddlewareRequestCancelledError();
                            dispatchWrapper({
                                type: ufpTypesUnited.FAILURE,
                                payload: err,
                                error: true
                            }); //Flux Standard Action, if error is true, the payload SHOULD be an error object.
                            resolve(err);
                            //console.log('after resolve')
                        }
                        //console.log('xxxxx middleware looping4', ufpTypesUnited.END)
                        dispatchWrapper({
                            type: ufpTypesUnited.END,
                            payload: thePayload
                        });
                        // // // console.log('xxxxx middleware end5')
                        // console.warn('UFPMiddleware END finish: ')
                    }
                });
                // // // console.log('MIDDLEWARE PROIMISE IS ', action, dispatchPromise)
                //return next(() => dispatchPromise)
                return dispatchPromise;
            };
        };
    };
}
exports.default = createUfpMiddleware;