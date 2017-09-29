'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

console.log('UfpMiddleware imported ');
function UfpMiddleware() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return function (_ref) {
        var getState = _ref.getState,
            dispatch = _ref.dispatch;

        return function (next) {
            return function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action) {
                    var dispatchPromise;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    if ((0, _Validation.isUFPAction)(action)) {
                                        _context2.next = 2;
                                        break;
                                    }

                                    return _context2.abrupt('return', next(action));

                                case 2:

                                    console.log('UfpMiddleware Ufp Action Detected ', _UfpMiddlewareConfiguration2.default, action);
                                    dispatchPromise = new Promise(function () {
                                        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve /*, reject */) {
                                            var validationErrors, validationErr, ufpAction, dispatchWrapper, ufpDefinition, ufpPayload, ufpData, ufpResultHandler, ufpPreHandler, ufpTypes, additionalPayload, thePayload, ufpTypesUnited, MAX_RETRY_COUNT, retry, retryCount, makeRequest, totalSuccess, requestResponse, resultContainerForPreHandler, configPrepared, allPreHandler, preHandlerResult, validateResult, config, resultContainerForHandler, promiseAll0, promiseAll1, resultHandler, promiseAll2, err, err2;
                                            return _regenerator2.default.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            /**
                                                             *  Do not process actions without a [UFP_ACTION] property
                                                             * Try to dispatch an error request FSA for invalid UFPAction's
                                                             */
                                                            validationErrors = (0, _Validation.validateUFPAction)(action);

                                                            if (!(validationErrors.length > 0)) {
                                                                _context.next = 8;
                                                                break;
                                                            }

                                                            console.log('UFP MIDDLEWARE validationErrors', validationErrors);
                                                            validationErr = new _Errors.InvalidUFPAction(validationErrors[0]);

                                                            dispatch({
                                                                type: _UfpMiddlewareConstants2.default.ActionConstants.UFP_ACTION_ERROR,
                                                                payload: validationErr
                                                            });
                                                            resolve(validationErr);
                                                            _context.next = 123;
                                                            break;

                                                        case 8:
                                                            /**
                                                             * MEGA BLOCK TODO FIXME REFACTOR
                                                             *
                                                             * this block is the core middleware functionality rougly:
                                                             *
                                                             * - prehandling
                                                             * - executing
                                                             * - posthandling/parsing
                                                             * - finalisation
                                                             *
                                                             */

                                                            // Parse the validated UFP_REQUEST_ACTION action
                                                            ufpAction = action[_UfpRequestActions2.default.UFP_REQUEST_ACTION];
                                                            dispatchWrapper = _UfpMiddlewareUtils2.default.wrapDispatcher(dispatch /*, getState, ufpAction*/);
                                                            ufpDefinition = ufpAction.ufpDefinition, ufpPayload = ufpAction.ufpPayload, ufpData = ufpAction.ufpData, ufpResultHandler = ufpAction.ufpResultHandler, ufpPreHandler = ufpAction.ufpPreHandler, ufpTypes = ufpAction.ufpTypes;
                                                            additionalPayload = {

                                                                // getState: getState,
                                                                // globalState: getState()
                                                            };
                                                            thePayload = Object.assign({}, ufpPayload, additionalPayload);
                                                            // Object.assign({}, ufpDefinition.actionConstants || {}, ufpAction.ufpTypes || {})
                                                            // join together 2 action type definitions, one from action and one from definition,
                                                            // both definitions are handled as array

                                                            ufpTypesUnited = _UfpMiddlewareUtils2.default.uniteActionResultTypes(ufpTypes, ufpDefinition.actionConstants);
                                                            MAX_RETRY_COUNT = options.maxRetryCount || 5;
                                                            retry = true;
                                                            retryCount = 0;
                                                            makeRequest = true;
                                                            totalSuccess = true;
                                                            requestResponse = null;
                                                            resultContainerForPreHandler = {
                                                                ufpAction: {
                                                                    wixi: 'buxi',
                                                                    ufpData: ufpData,
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
                                                            configPrepared = _UfpMiddlewareUtils2.default.ufpMiddlewarePrepareConfig(ufpAction);

                                                            console.log('UfP types', ufpTypesUnited);
                                                            allPreHandler = [].concat(ufpPreHandler).concat(_UfpMiddlewareConfiguration2.default.get().preRequestHandling);

                                                            console.log('ufpPreHandler', allPreHandler, resultContainerForPreHandler);
                                                            _context.next = 27;
                                                            return _UfpMiddlewareUtils2.default.handlePreHandlers(allPreHandler, resultContainerForPreHandler);

                                                        case 27:
                                                            preHandlerResult = _context.sent;

                                                            console.log('preHandlerResult ', preHandlerResult);

                                                            makeRequest = !preHandlerResult.break;

                                                            if (!makeRequest) {
                                                                _context.next = 118;
                                                                break;
                                                            }

                                                            console.log('UFPMiddleware executing: ', retryCount, ufpAction);
                                                            if (_UfpMiddlewareConfiguration2.default.get().createConfig === undefined || typeof _UfpMiddlewareConfiguration2.default.get().createConfig !== 'function') {
                                                                config = _UfpMiddlewareUtils2.default.createConfigDefault(configPrepared);
                                                            } else {
                                                                config = _UfpMiddlewareConfiguration2.default.get().createConfig(configPrepared, ufpAction, getState());
                                                            }

                                                            console.log('UFP MIDDLEWARE config', config);
                                                            dispatchWrapper({
                                                                type: ufpTypesUnited.REQUEST,
                                                                payload: {
                                                                    action: action,
                                                                    config: configPrepared
                                                                }
                                                            });
                                                            dispatchWrapper({
                                                                type: 'MIDDLEWARE_REQUEST',
                                                                payload: {
                                                                    action: action,
                                                                    config: configPrepared
                                                                }
                                                            });

                                                        case 36:
                                                            if (!(retry && retryCount < MAX_RETRY_COUNT)) {
                                                                _context.next = 107;
                                                                break;
                                                            }

                                                            validateResult = undefined;
                                                            retryCount += 1;

                                                            // Make the API call
                                                            if (options.debug) {
                                                                _UfpMiddlewareUtils2.default.infoLogger('[UFP MIDDLEWARE:] making request', config);
                                                            }

                                                            _context.next = 42;
                                                            return _UfpMiddlewareUtils2.default.ufpMiddlewareRequest(config);

                                                        case 42:
                                                            requestResponse = _context.sent;


                                                            if (options.debug) {
                                                                _UfpMiddlewareUtils2.default.infoLogger('[UFP MIDDLEWARE:] making request finished', requestResponse instanceof Error ? _UfpMiddlewareUtils2.default.errorToObject(requestResponse) : requestResponse);
                                                            }

                                                            resultContainerForHandler = {
                                                                ufpAction: {
                                                                    ufpData: ufpData,
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

                                                            console.log('ufpResultHandler', ufpResultHandler, ufpDefinition);

                                                            if (!(ufpResultHandler !== undefined && ufpResultHandler.length > 0)) {
                                                                _context.next = 66;
                                                                break;
                                                            }

                                                            resultHandler = ufpResultHandler;
                                                            console.log('resultHandler', resultHandler);
                                                            _context.next = 51;
                                                            return _UfpMiddlewareUtils2.default.handleResultHandlers(resultHandler, resultContainerForHandler);

                                                        case 51:
                                                            promiseAll0 = _context.sent;

                                                            console.log('UFPMiddleware HandlerResult: ', promiseAll0, resultHandler);
                                                            _context.prev = 53;

                                                            validateResult = _UfpMiddlewareUtils2.default.validateResultHandlerResult(promiseAll0);
                                                            console.log('ResultHandler', validateResult);
                                                            console.log('UFPMiddleware Aggregated Result : ', validateResult);
                                                            if (validateResult.handled && validateResult.success) {
                                                                dispatchWrapper({
                                                                    type: ufpTypesUnited.SUCCESS,
                                                                    payload: Object.assign(Object.assign({}, { data: requestResponse.data }, ufpAction.ufpPayload), { additionalPayload: validateResult.additionalPayload })
                                                                });
                                                            }
                                                            _context.next = 66;
                                                            break;

                                                        case 60:
                                                            _context.prev = 60;
                                                            _context.t0 = _context['catch'](53);
                                                            //UfpMiddlewareResulthandlerMoreThenOneSuccessError
                                                            console.log('Catched error', _context.t0);
                                                            dispatchWrapper({
                                                                type: ufpTypesUnited.FAILURE,
                                                                payload: _context.t0,
                                                                error: true
                                                            });
                                                            dispatchWrapper({
                                                                type: ufpTypesUnited.END,
                                                                payload: thePayload
                                                            });
                                                            return _context.abrupt('return', resolve(_context.t0));

                                                        case 66:
                                                            console.log('UFPMiddleware validateResult: ', validateResult);

                                                            if (!(!resultHandler || validateResult && !validateResult.handled)) {
                                                                _context.next = 83;
                                                                break;
                                                            }

                                                            _context.next = 70;
                                                            return _UfpMiddlewareUtils2.default.handleResultHandlers(_UfpMiddlewareConfiguration2.default.get().resultHandlings.genericResultHandler, resultContainerForHandler);

                                                        case 70:
                                                            promiseAll1 = _context.sent;
                                                            _context.prev = 71;

                                                            console.log('genericResultHandler', promiseAll1);
                                                            validateResult = _UfpMiddlewareUtils2.default.validateResultHandlerResult(promiseAll1);

                                                            if (validateResult.handled && validateResult.success) {
                                                                dispatchWrapper({
                                                                    type: 'MIDDLEWARE_SUCCESS',
                                                                    payload: {
                                                                        data: requestResponse.data,

                                                                        ufpAction: ufpAction,
                                                                        config: configPrepared
                                                                    }
                                                                });
                                                            }
                                                            _context.next = 83;
                                                            break;

                                                        case 77:
                                                            _context.prev = 77;
                                                            _context.t1 = _context['catch'](71);
                                                            //UfpMiddlewareResulthandlerMoreThenOneSuccessError
                                                            console.log('Catched error', _context.t1);
                                                            dispatchWrapper({
                                                                type: ufpTypesUnited.FAILURE,
                                                                payload: _context.t1,
                                                                error: true
                                                            });
                                                            dispatchWrapper({
                                                                type: ufpTypesUnited.END,
                                                                payload: thePayload
                                                            });
                                                            return _context.abrupt('return', resolve(_context.t1));

                                                        case 83:

                                                            console.log('xxxxx middleware promiseall1', promiseAll1, validateResult);
                                                            // check if if request is unhandled

                                                            if (!(!validateResult.handled && !validateResult.success && !validateResult.retry)) {
                                                                _context.next = 103;
                                                                break;
                                                            }

                                                            console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ');
                                                            _context.next = 88;
                                                            return _UfpMiddlewareUtils2.default.handleResultHandlers(_UfpMiddlewareConfiguration2.default.get().resultHandlings.unhandledResultHandler, resultContainerForHandler);

                                                        case 88:
                                                            promiseAll2 = _context.sent;


                                                            console.log('xxxxx middleware promiseall2', promiseAll2);
                                                            console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ', promiseAll2);
                                                            // set validate result to the one returned from unhandledResultHandler
                                                            _context.prev = 91;

                                                            validateResult = _UfpMiddlewareUtils2.default.validateResultHandlerResult(promiseAll2);
                                                            if (validateResult.handled && validateResult.success) {
                                                                dispatchWrapper({
                                                                    type: ufpTypesUnited.SUCCESS,
                                                                    payload: Object.assign(Object.assign({}, { data: requestResponse.data }, ufpAction.ufpPayload), { additionalPayload: validateResult.additionalPayload })
                                                                });
                                                            }
                                                            _context.next = 102;
                                                            break;

                                                        case 96:
                                                            _context.prev = 96;
                                                            _context.t2 = _context['catch'](91);
                                                            //UfpMiddlewareResulthandlerMoreThenOneSuccessError
                                                            console.warn('UFPMiddleware UNHANDLED RESULT USUCCESFYK RETRY: ', _context.t2);
                                                            dispatchWrapper({
                                                                type: ufpTypesUnited.FAILURE,
                                                                payload: _context.t2,
                                                                error: true
                                                            });
                                                            dispatchWrapper({
                                                                type: ufpTypesUnited.END,
                                                                payload: thePayload
                                                            });
                                                            return _context.abrupt('return', resolve(_context.t2));

                                                        case 102:

                                                            console.warn('UFPMiddleware UNHANDLED RESULT USUCCESFYK RETRY: ', validateResult);

                                                        case 103:

                                                            retry = validateResult.retry;
                                                            if (!retry && !validateResult.success) {
                                                                //  console.log('xxxxx middleware rejectin0')
                                                                dispatchWrapper({
                                                                    type: ufpTypesUnited.FAILURE,
                                                                    payload: Object.assign(Object.assign({}, { data: requestResponse.data }, ufpAction.ufpPayload), { additionalPayload: validateResult.additionalPayload })

                                                                });
                                                                totalSuccess = false;
                                                                console.log('xxxxx middleware rejecting1');
                                                                //   reject()
                                                                // reject()
                                                                //   // // console.log('xxxxx middleware rejecting2')
                                                            }
                                                            //   // // console.log('xxxxx middleware looping3')
                                                            _context.next = 36;
                                                            break;

                                                        case 107:
                                                            if (!(retryCount === MAX_RETRY_COUNT)) {
                                                                _context.next = 115;
                                                                break;
                                                            }

                                                            console.log('UfpMiddleware Max retry count reached');
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
                                                            return _context.abrupt('return', resolve(err));

                                                        case 115:
                                                            if (totalSuccess) {
                                                                resolve(requestResponse); //resolve for success
                                                            } else {
                                                                resolve(requestResponse); //resolve when handler say its failure
                                                            }

                                                        case 116:
                                                            _context.next = 122;
                                                            break;

                                                        case 118:
                                                            // end if(makeRequest)
                                                            err2 = new _Errors.UfpMiddlewareRequestCancelledError();

                                                            console.log('UfpMiddleware Request Cancelled');
                                                            dispatchWrapper({
                                                                type: ufpTypesUnited.FAILURE,
                                                                payload: err2,
                                                                error: true
                                                            }); //Flux Standard Action, if error is true, the payload SHOULD be an error object.
                                                            resolve(err2);
                                                            //console.log('after resolve')

                                                        case 122:
                                                            //console.log('xxxxx middleware looping4', ufpTypesUnited.END)
                                                            dispatchWrapper({
                                                                type: ufpTypesUnited.END,
                                                                payload: {
                                                                    ufpAction: ufpAction,
                                                                    config: configPrepared
                                                                }
                                                            });
                                                            // // // console.log('xxxxx middleware end5')
                                                            // console.warn('UFPMiddleware END finish: ')

                                                        case 123:
                                                        case 'end':
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, _this, [[53, 60], [71, 77], [91, 96]]);
                                        }));

                                        return function (_x3) {
                                            return _ref3.apply(this, arguments);
                                        };
                                    }());
                                    // // // console.log('MIDDLEWARE PROIMISE IS ', action, dispatchPromise)
                                    //return next(() => dispatchPromise)

                                    return _context2.abrupt('return', dispatchPromise);

                                case 5:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this);
                }));

                return function (_x2) {
                    return _ref2.apply(this, arguments);
                };
            }();
        };
    };
}
exports.default = UfpMiddleware;