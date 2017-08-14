'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

function createUfpMiddleware() {
    var _this2 = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return function (_ref) {
        var getState = _ref.getState;
        var dispatch = _ref.dispatch;

        return function (next) {
            return function callee$3$0(action) {
                var dispatchPromise;
                return regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                    var _this = this;

                    while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                            if ((0, _Validation.isUFPAction)(action)) {
                                context$4$0.next = 2;
                                break;
                            }

                            return context$4$0.abrupt('return', next(action));

                        case 2:
                            dispatchPromise = new Promise(function callee$4$0(resolve /*, reject */) {
                                var validationErrors, validationErr, ufpAction, dispatchWrapper, /*, getState, ufpAction*/ufpDefinition, ufpPayload, ufpResultHandler, ufpPreHandler, ufpTypes, additionalPayload, thePayload, ufpTypesUnited, MAX_RETRY_COUNT, retry, retryCount, makeRequest, totalSuccess, requestResponse, resultContainerForPreHandler, configPrepared, allPreHandler, preHandlerResult, validateResult, config, resultContainerForHandler, promiseAll0, promiseAll1, resultHandler, promiseAll2, err;
                                return regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                                    while (1) switch (context$5$0.prev = context$5$0.next) {
                                        case 0:
                                            validationErrors = (0, _Validation.validateUFPAction)(action);

                                            if (!(validationErrors.length > 0)) {
                                                context$5$0.next = 7;
                                                break;
                                            }

                                            validationErr = new _Errors.InvalidUFPAction(validationErrors[0]);

                                            dispatch({
                                                type: _UfpMiddlewareConstants2['default'].ActionConstants.UFP_ACTION_ERROR,
                                                payload: validationErr
                                            });
                                            resolve(validationErr);
                                            context$5$0.next = 103;
                                            break;

                                        case 7:
                                            ufpAction = action[_UfpRequestActions2['default'].UFP_REQUEST_ACTION];
                                            dispatchWrapper = _UfpMiddlewareUtils2['default'].wrapDispatcher(dispatch);
                                            ufpDefinition = ufpAction.ufpDefinition;
                                            ufpPayload = ufpAction.ufpPayload;
                                            ufpResultHandler = ufpAction.ufpResultHandler;
                                            ufpPreHandler = ufpAction.ufpPreHandler;
                                            ufpTypes = ufpAction.ufpTypes;
                                            additionalPayload = {
                                                getState: getState,
                                                globalState: getState()
                                            };
                                            thePayload = Object.assign({}, ufpPayload, additionalPayload);
                                            ufpTypesUnited = _UfpMiddlewareUtils2['default'].uniteActionResultTypes(ufpTypes, ufpDefinition.actionConstants);
                                            MAX_RETRY_COUNT = options.maxRetryCount || 5;
                                            retry = true;
                                            retryCount = 0;
                                            makeRequest = true;
                                            totalSuccess = true;
                                            requestResponse = null;
                                            resultContainerForPreHandler = {
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
                                            configPrepared = _UfpMiddlewareUtils2['default'].ufpMiddlewarePrepareConfig(ufpAction);
                                            allPreHandler = [].concat(ufpPreHandler).concat(_UfpMiddlewareConfiguration2['default'].get().preRequestHandling);
                                            context$5$0.next = 28;
                                            return regeneratorRuntime.awrap(_UfpMiddlewareUtils2['default'].handlePreHandlers(allPreHandler, resultContainerForPreHandler));

                                        case 28:
                                            preHandlerResult = context$5$0.sent;

                                            makeRequest = !preHandlerResult['break'];

                                            if (!makeRequest) {
                                                context$5$0.next = 99;
                                                break;
                                            }

                                            //console.log('UFPMiddleware executing: ', retryCount, ufpAction)
                                            if (_UfpMiddlewareConfiguration2['default'].get().createConfig === undefined || typeof _UfpMiddlewareConfiguration2['default'].get().createConfig !== 'function') {
                                                config = _UfpMiddlewareUtils2['default'].createConfigDefault(configPrepared);
                                            } else {
                                                config = _UfpMiddlewareConfiguration2['default'].get().createConfig(configPrepared, ufpAction, getState());
                                            }

                                            // // console.log('UFP MIDDLEWARE config', config)
                                            dispatchWrapper({
                                                type: ufpTypesUnited.REQUEST,
                                                payload: thePayload
                                            });

                                        case 33:
                                            if (!(retry && retryCount < MAX_RETRY_COUNT)) {
                                                context$5$0.next = 89;
                                                break;
                                            }

                                            validateResult = undefined;
                                            retryCount += 1;

                                            // Make the API call
                                            if (options.debug) {
                                                _UfpMiddlewareUtils2['default'].infoLogger('[UFP MIDDLEWARE:] making request', config);
                                            }

                                            context$5$0.next = 39;
                                            return regeneratorRuntime.awrap(_UfpMiddlewareUtils2['default'].ufpMiddlewareRequest(options, config));

                                        case 39:
                                            requestResponse = context$5$0.sent;

                                            if (options.debug) {
                                                _UfpMiddlewareUtils2['default'].infoLogger('[UFP MIDDLEWARE:] making request finished', requestResponse instanceof Error ? _UfpMiddlewareUtils2['default'].errorToObject(requestResponse) : requestResponse);
                                            }

                                            resultContainerForHandler = {
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

                                            if (!(ufpResultHandler !== undefined && ufpResultHandler.length > 0)) {
                                                context$5$0.next = 57;
                                                break;
                                            }

                                            resultHandler = ufpResultHandler;
                                            // // // console.log('resultHandler', resultHandler)
                                            context$5$0.next = 46;
                                            return regeneratorRuntime.awrap(_UfpMiddlewareUtils2['default'].handleResultHandlers(resultHandler, resultContainerForHandler));

                                        case 46:
                                            promiseAll0 = context$5$0.sent;
                                            context$5$0.prev = 47;

                                            validateResult = _UfpMiddlewareUtils2['default'].validateResultHandlerResult(promiseAll0);
                                            // console.log('ResultHandler', validateResult)
                                            // console.log('UFPMiddleware Aggregated Result : ', validateResult)
                                            if (validateResult.handled && validateResult.success) {
                                                dispatchWrapper({
                                                    type: ufpTypesUnited.SUCCESS,
                                                    payload: Object.assign(Object.assign({}, { data: requestResponse.data }, ufpAction.ufpPayload), { additionalPayload: validateResult.additionalPayload })
                                                });
                                            }
                                            context$5$0.next = 57;
                                            break;

                                        case 52:
                                            context$5$0.prev = 52;
                                            context$5$0.t0 = context$5$0['catch'](47);
                                            //UfpMiddlewareResulthandlerMoreThenOneSuccessError
                                            dispatchWrapper({
                                                type: ufpTypesUnited.FAILURE,
                                                payload: context$5$0.t0,
                                                error: true
                                            });
                                            dispatchWrapper({
                                                type: ufpTypesUnited.END,
                                                payload: thePayload
                                            });
                                            return context$5$0.abrupt('return', resolve(context$5$0.t0));

                                        case 57:
                                            if (!(!resultHandler || validateResult && !validateResult.handled)) {
                                                context$5$0.next = 71;
                                                break;
                                            }

                                            context$5$0.next = 60;
                                            return regeneratorRuntime.awrap(_UfpMiddlewareUtils2['default'].handleResultHandlers(_UfpMiddlewareConfiguration2['default'].get().resultHandlings.genericResultHandler, resultContainerForHandler));

                                        case 60:
                                            promiseAll1 = context$5$0.sent;
                                            context$5$0.prev = 61;

                                            // console.log('genericResultHandler', promiseAll1)
                                            validateResult = _UfpMiddlewareUtils2['default'].validateResultHandlerResult(promiseAll1);
                                            if (validateResult.handled && validateResult.success) {
                                                dispatchWrapper({
                                                    type: ufpTypesUnited.SUCCESS,
                                                    payload: Object.assign(Object.assign({}, { data: requestResponse.data }, ufpAction.ufpPayload), { additionalPayload: validateResult.additionalPayload })
                                                });
                                            }
                                            context$5$0.next = 71;
                                            break;

                                        case 66:
                                            context$5$0.prev = 66;
                                            context$5$0.t1 = context$5$0['catch'](61);
                                            //UfpMiddlewareResulthandlerMoreThenOneSuccessError
                                            dispatchWrapper({
                                                type: ufpTypesUnited.FAILURE,
                                                payload: context$5$0.t1,
                                                error: true
                                            });
                                            dispatchWrapper({
                                                type: ufpTypesUnited.END,
                                                payload: thePayload
                                            });
                                            return context$5$0.abrupt('return', resolve(context$5$0.t1));

                                        case 71:
                                            if (!(!validateResult.handled && !validateResult.success && !validateResult.retry)) {
                                                context$5$0.next = 85;
                                                break;
                                            }

                                            context$5$0.next = 74;
                                            return regeneratorRuntime.awrap(_UfpMiddlewareUtils2['default'].handleResultHandlers(_UfpMiddlewareConfiguration2['default'].get().resultHandlings.unhandledResultHandler, resultContainerForHandler));

                                        case 74:
                                            promiseAll2 = context$5$0.sent;
                                            context$5$0.prev = 75;

                                            validateResult = _UfpMiddlewareUtils2['default'].validateResultHandlerResult(promiseAll2);
                                            if (validateResult.handled && validateResult.success) {
                                                dispatchWrapper({
                                                    type: ufpTypesUnited.SUCCESS,
                                                    payload: Object.assign(Object.assign({}, { data: requestResponse.data }, ufpAction.ufpPayload), { additionalPayload: validateResult.additionalPayload })
                                                });
                                            }
                                            context$5$0.next = 85;
                                            break;

                                        case 80:
                                            context$5$0.prev = 80;
                                            context$5$0.t2 = context$5$0['catch'](75);
                                            //UfpMiddlewareResulthandlerMoreThenOneSuccessError
                                            dispatchWrapper({
                                                type: ufpTypesUnited.FAILURE,
                                                payload: context$5$0.t2,
                                                error: true
                                            });
                                            dispatchWrapper({
                                                type: ufpTypesUnited.END,
                                                payload: thePayload
                                            });
                                            return context$5$0.abrupt('return', resolve(context$5$0.t2));

                                        case 85:

                                            //    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ', validateResult)

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
                                            context$5$0.next = 33;
                                            break;

                                        case 89:
                                            if (!(retryCount === MAX_RETRY_COUNT)) {
                                                context$5$0.next = 96;
                                                break;
                                            }

                                            err = new _Errors.UfpMiddlewareMaxRetryReachedError();

                                            dispatchWrapper({
                                                type: ufpTypesUnited.FAILURE,
                                                payload: err,
                                                error: true
                                            }); //Flux Standard Action , if error is true, the payload SHOULD be an error object.
                                            dispatchWrapper({
                                                type: ufpTypesUnited.END,
                                                payload: thePayload
                                            });
                                            return context$5$0.abrupt('return', resolve(err));

                                        case 96:
                                            if (totalSuccess) {
                                                resolve(requestResponse); //resolve for success
                                            } else {
                                                    resolve(requestResponse); //resolve when handler say its failure
                                                }

                                        case 97:
                                            context$5$0.next = 102;
                                            break;

                                        case 99:
                                            err = new _Errors.UfpMiddlewareRequestCancelledError();

                                            dispatchWrapper({
                                                type: ufpTypesUnited.FAILURE,
                                                payload: err,
                                                error: true
                                            }); //Flux Standard Action, if error is true, the payload SHOULD be an error object.
                                            resolve(err);
                                            //console.log('after resolve')

                                        case 102:
                                            //console.log('xxxxx middleware looping4', ufpTypesUnited.END)
                                            dispatchWrapper({
                                                type: ufpTypesUnited.END,
                                                payload: thePayload
                                            });
                                            // // // console.log('xxxxx middleware end5')
                                            // console.warn('UFPMiddleware END finish: ')

                                        case 103:
                                        case 'end':
                                            return context$5$0.stop();
                                    }
                                }, null, _this, [[47, 52], [61, 66], [75, 80]]);
                            });
                            return context$4$0.abrupt('return', dispatchPromise);

                        case 4:
                        case 'end':
                            return context$4$0.stop();
                    }
                }, null, _this2);
            };
        };
    };
}
exports['default'] = createUfpMiddleware;
module.exports = exports['default'];

//  console.log('UFP Middleware ', UFPMiddlewareConfiguration, action)

// Do not process actions without a [UFP_ACTION] property
// Try to dispatch an error request FSA for invalid UFPAction's

// console.log('UFP MIDDLEWARE validationErrors', validationErrors)

// Parse the validated UFP_REQUEST_ACTION action

// Object.assign({}, ufpDefinition.actionConstants || {}, ufpAction.ufpTypes || {})
// join together 2 action type definitions, one from action and one from definition, both definitions are handled as array

//  // console.log('UfP types', ufpTypesUnited)

// // console.log('ufpPreHandler', ufpPreHandler, resultContainerForPreHandler, preHandler)

// // console.log('preHandlerResult ', preHandlerResult)
// // console.log('UFPMiddleware PreHandlerResult makeRequest:', makeRequestResult)

//  console.log('ufpResultHandler', ufpResultHandler, ufpDefinition)

// console.log('UFPMiddleware HandlerResult: ', promiseAll0, resultHandler)

// console.log('UFPMiddleware validateResult: ', validateResult)

// console.log('xxxxx middleware promiseall1', promiseAll1, validateResult)
// check if if request is unhandled

//    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ')

// // console.log('xxxxx middleware promiseall2',promiseAll2)
//    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ', promiseAll2)
// set validate result to the one returned from unhandledResultHandler
// end while
// end if(makeRequest)

// // // console.log('MIDDLEWARE PROIMISE IS ', action, dispatchPromise)
//return next(() => dispatchPromise)