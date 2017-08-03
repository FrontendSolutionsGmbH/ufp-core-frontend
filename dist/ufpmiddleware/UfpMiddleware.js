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

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _UfpMiddlewareConfiguration = require('./UfpMiddlewareConfiguration');

var _UfpMiddlewareConfiguration2 = _interopRequireDefault(_UfpMiddlewareConfiguration);

//import UFPHandler from './UfpHandler'

function createUfpMiddleware(axiosInstance) {
    var _this2 = this;

    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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
                                var validationErrors, ufpAction, dispatchWrapper, ufpDefinition, ufpPayload, ufpResultHandler, ufpPreHandler, ufpTypes, ufpTypesUnited, additionalPayload, thePayload, retry, retryCount, makeRequest, totalSuccess, axiosResponse, resultContainerForPreHandler, allPreHandler, preHandlerResult, config, queryParams, resultContainerForHandler, promiseAll0, promiseAll1, validateResult, resultHandler, promiseAll2;
                                return regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                                    while (1) switch (context$5$0.prev = context$5$0.next) {
                                        case 0:
                                            validationErrors = (0, _Validation.validateUFPAction)(action);
                                            ufpAction = action[_UfpRequestActions2['default'].UFP_REQUEST_ACTION];
                                            dispatchWrapper = _UfpMiddlewareUtils2['default'].wrapDispatcher(dispatch, getState, ufpAction);
                                            ufpDefinition = ufpAction.ufpDefinition;
                                            ufpPayload = ufpAction.ufpPayload;
                                            ufpResultHandler = ufpAction.ufpResultHandler;
                                            ufpPreHandler = ufpAction.ufpPreHandler;
                                            ufpTypes = ufpAction.ufpTypes;
                                            ufpTypesUnited = {};
                                            additionalPayload = {
                                                getState: getState,
                                                globalState: getState()
                                            };
                                            thePayload = Object.assign({}, ufpPayload, additionalPayload);

                                            // Object.assign({}, ufpDefinition.actionConstants || {}, ufpAction.ufpTypes || {})
                                            // join together 2 action type definitions, one from action and one from definition, both definitions are handled as array
                                            _UfpMiddlewareUtils2['default'].uniteActionResultTypes(ufpTypesUnited, ufpDefinition.actionConstants);
                                            // why executing twice ???
                                            _UfpMiddlewareUtils2['default'].uniteActionResultTypes(ufpTypesUnited, ufpTypes);

                                            // // // console.log('UFP MIDDLEWARE ', ufpAction)
                                            // // // console.log('UFP MIDDLEWARE ', ufpTypes.REQUEST)
                                            // write back to action :( problematic, hence we change incoming action object ... may be resolved at a later point
                                            // action[UfpRequestActions.UFP_REQUEST_ACTION].ufpTypes = ufpTypes

                                            if (!validationErrors.length) {
                                                context$5$0.next = 17;
                                                break;
                                            }

                                            //  // // console.log('UFP MIDDLEWARE validationErrors', validationErrors)
                                            dispatchWrapper({
                                                type: _UfpMiddlewareConstants2['default'].ActionConstants.UFP_ACTION_ERROR + ufpTypesUnited.REQUEST,
                                                payload: new _Errors.InvalidUFPAction(validationErrors)
                                            });
                                            //  reject()
                                            context$5$0.next = 75;
                                            break;

                                        case 17:
                                            retry = true;
                                            retryCount = 0;
                                            makeRequest = true;
                                            totalSuccess = true;
                                            axiosResponse = null;
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

                                            if (!(_UfpMiddlewareConfiguration2['default'].get().createConfig === undefined || typeof _UfpMiddlewareConfiguration2['default'].get().createConfig !== 'function')) {
                                                context$5$0.next = 25;
                                                break;
                                            }

                                            throw new Error('Please register a createConfig function for axios with setCreateConfig in the MiddlewareConfiguration');

                                        case 25:
                                            allPreHandler = [].concat(ufpPreHandler || []).concat(_UfpMiddlewareConfiguration2['default'].get().preRequestHandling);
                                            context$5$0.next = 28;
                                            return regeneratorRuntime.awrap(_UfpMiddlewareUtils2['default'].handlePreHandlers(allPreHandler, resultContainerForPreHandler));

                                        case 28:
                                            preHandlerResult = context$5$0.sent;

                                            // // console.log('preHandlerResult ', preHandlerResult)
                                            // // console.log('UFPMiddleware PreHandlerResult makeRequest:', makeRequestResult)
                                            makeRequest = !preHandlerResult['break'];

                                            if (!makeRequest) {
                                                context$5$0.next = 73;
                                                break;
                                            }

                                        case 31:
                                            if (!(retry && retryCount < 5)) {
                                                context$5$0.next = 73;
                                                break;
                                            }

                                            retryCount += 1;

                                            //console.log('UFPMiddleware executing: ', retryCount, ufpAction)
                                            config = _UfpMiddlewareConfiguration2['default'].get().createConfig(ufpAction, getState());

                                            // // console.log('UFP MIDDLEWARE config', config)
                                            dispatchWrapper({
                                                type: ufpTypesUnited.REQUEST[0],
                                                payload: thePayload
                                            });
                                            // Make the API call
                                            if (options.debug) {
                                                console.log('UFP MIDDLEWARE making request', config);
                                            }

                                            if (!options.useFetch) {
                                                context$5$0.next = 48;
                                                break;
                                            }

                                            queryParams = function queryParams(params) {
                                                return Object.keys(params).map(function (k) {
                                                    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
                                                }).join('&');
                                            };

                                            if (config.params) {
                                                config.url += config.url.indexOf('?') === -1 ? '?' : '&';
                                                config.url += typeof config.paramsSerializer === 'function' ? config.paramsSerializer(config.params) : queryParams(config.params);
                                                delete config.params; //delete so that not preocessed again
                                            }
                                            context$5$0.next = 41;
                                            return regeneratorRuntime.awrap(fetch(config.url, { method: config.method, body: config.body, credentials: config.credentials, headers: config.headers || {} }));

                                        case 41:
                                            axiosResponse = context$5$0.sent;

                                            if (!axiosResponse.ok) {
                                                context$5$0.next = 46;
                                                break;
                                            }

                                            context$5$0.next = 45;
                                            return regeneratorRuntime.awrap(_Util2['default'].getJSON(axiosResponse));

                                        case 45:
                                            axiosResponse.data = context$5$0.sent;

                                        case 46:
                                            context$5$0.next = 51;
                                            break;

                                        case 48:
                                            context$5$0.next = 50;
                                            return regeneratorRuntime.awrap(axiosInstance.request(config).then(function (response) {
                                                return response;
                                            }, function (response) {
                                                return response;
                                            }));

                                        case 50:
                                            axiosResponse = context$5$0.sent;

                                        case 51:

                                            if (options.debug) {
                                                console.log('UFP MIDDLEWARE making request finished', axiosResponse);
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
                                                axiosResponse: axiosResponse
                                            };

                                            if (!(ufpResultHandler !== undefined && ufpResultHandler.length > 0)) {
                                                context$5$0.next = 59;
                                                break;
                                            }

                                            resultHandler = ufpResultHandler;
                                            // // // console.log('resultHandler', resultHandler)
                                            context$5$0.next = 57;
                                            return regeneratorRuntime.awrap(_UfpMiddlewareUtils2['default'].handleResultHandlers(resultHandler, resultContainerForHandler));

                                        case 57:
                                            promiseAll0 = context$5$0.sent;

                                            // console.log('UFPMiddleware HandlerResult: ', promiseAll0, resultHandler)
                                            try {
                                                validateResult = _UfpMiddlewareUtils2['default'].validateResultHandlerResult(promiseAll0);
                                                // console.log('ResultHandler', validateResult)
                                                // console.log('UFPMiddleware Aggregated Result : ', validateResult)
                                                if (validateResult.handled) {
                                                    //   // // console.log('UFPMiddleware Response Handled')
                                                    if (validateResult.success) {
                                                        // dispatching of result data is done by the result handler
                                                        // // console.log('UFPMiddleware Response Succesful')
                                                        //    // // console.log('xxxxx middleware RESOLVING ')
                                                        //    // // console.log('xxxxx middleware success1')

                                                        //     // // console.log('xxxxx middleware success2')
                                                    } else {
                                                            //   // // console.log('xxxxx middleware not success3')
                                                            //        console.warn('UFPMiddleware Response NOT Succesful')
                                                        }
                                                }
                                            } catch (err) {
                                                // // // console.log('xxxxx middleware error5')
                                                // console.warn('UFPMiddleware error: ' + err.message)
                                            }

                                        case 59:
                                            if (!(!resultHandler || validateResult && validateResult.handled !== true)) {
                                                context$5$0.next = 64;
                                                break;
                                            }

                                            context$5$0.next = 62;
                                            return regeneratorRuntime.awrap(_UfpMiddlewareUtils2['default'].handleResultHandlers(_UfpMiddlewareConfiguration2['default'].get().resultHandlings.genericResultHandler, resultContainerForHandler));

                                        case 62:
                                            promiseAll1 = context$5$0.sent;

                                            try {
                                                // console.log('genericResultHandler', promiseAll1)
                                                validateResult = _UfpMiddlewareUtils2['default'].validateResultHandlerResult(promiseAll1);
                                            } catch (err) {
                                                // console.error('xxxxx middleware error5', err)
                                                // console.warn('UFPMiddleware error: ' + err.message)
                                            }

                                        case 64:
                                            if (!(!validateResult.handled && !validateResult.success && !validateResult.retry)) {
                                                context$5$0.next = 69;
                                                break;
                                            }

                                            context$5$0.next = 67;
                                            return regeneratorRuntime.awrap(_UfpMiddlewareUtils2['default'].handleResultHandlers(_UfpMiddlewareConfiguration2['default'].get().resultHandlings.unhandledResultHandler, resultContainerForHandler));

                                        case 67:
                                            promiseAll2 = context$5$0.sent;

                                            // // console.log('xxxxx middleware promiseall2',promiseAll2)
                                            //    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ', promiseAll2)
                                            // set validate result to the one returned from unhandledResultHandler
                                            validateResult = _UfpMiddlewareUtils2['default'].validateResultHandlerResult(promiseAll2);
                                            //    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ', validateResult)

                                        case 69:

                                            retry = validateResult.retry;
                                            if (!retry && !validateResult.success) {
                                                // // // console.log('xxxxx middleware rejectin0')
                                                dispatchWrapper({
                                                    type: ufpTypesUnited.FAIL,
                                                    payload: thePayload
                                                });

                                                totalSuccess = false;

                                                // // console.log('xxxxx middleware rejecting1')
                                                //   reject()
                                                // reject()
                                                //   // // console.log('xxxxx middleware rejecting2')
                                            }
                                            //   // // console.log('xxxxx middleware looping3')
                                            context$5$0.next = 31;
                                            break;

                                        case 73:
                                            // end if(makeRequest)
                                            //  // // console.log('xxxxx middleware looping4')
                                            dispatchWrapper({
                                                type: ufpTypesUnited.END,
                                                payload: thePayload
                                            });
                                            if (totalSuccess) {
                                                resolve(axiosResponse);
                                            } else {
                                                /*
                                                 discussion: when using reject here, every method has to rely on catching the promise error
                                                 so we dispatch an en
                                                 reject(axiosResponse)
                                                 */
                                                resolve(axiosResponse);
                                            }
                                            // // // console.log('xxxxx middleware end5')
                                            // console.warn('UFPMiddleware END finish: ')

                                        case 75:
                                        case 'end':
                                            return context$5$0.stop();
                                    }
                                }, null, _this);
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

// Parse the validated UFP_REQUEST_ACTION action

/* dispatchWrapper({
 type: ufpTypes.REQUEST,
 payload: thePayload
 })*/

//  // console.log('UfP types', ufpTypesUnited)

// // console.log('ufpPreHandler', ufpPreHandler, resultContainerForPreHandler, preHandler)

//  console.log('ufpResultHandler', ufpResultHandler, ufpDefinition)

// console.log('UFPMiddleware validateResult: ', validateResult)

// console.log('xxxxx middleware promiseall1', promiseAll1, validateResult)
// check if if request is unhandled

//    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ')

// // // console.log('MIDDLEWARE PROIMISE IS ', action, dispatchPromise)
//return next(() => dispatchPromise)