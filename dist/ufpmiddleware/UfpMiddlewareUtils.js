'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _this = this;

var UfpMiddlewareUtils = {

    validateResultHandlerResult: function validateResultHandlerResult(handlerResultArray) {
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
    },
    addToArrayIfNotExistant: function addToArrayIfNotExistant(arr, item) {
        if (arr.indexOf(item) === -1) {
            arr.push(item);
        }
    },
    uniteActionResultTypes: function uniteActionResultTypes(ufpTypes, incoming) {
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
                    return UfpMiddlewareUtils.addToArrayIfNotExistant(ufpTypes[i], element);
                });
            } else {
                // add single string value
                UfpMiddlewareUtils.addToArrayIfNotExistant(ufpTypes[i], item);
            }
        }
    },

    wrapDispatcher: function wrapDispatcher(dispatch, getState, ufpAction) {
        return function (action) {
            var checkToCallActionCreators = function checkToCallActionCreators(actionType) {
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

            if (Array.isArray(action.type)) {
                for (var i in action.type) {
                    checkToCallActionCreators(action.type[i]);
                    // //   // console.log('Dispatching array action', i, action.type[i], action.payload)
                    dispatch({
                        type: action.type[i],
                        payload: action.payload
                    });
                }
            } else {
                checkToCallActionCreators(action.type);
                // //   // console.log('Dispatching normal action ', action)
                return dispatch(action);
            }
        };
    },
    handleResultHandlers: function handleResultHandlers(handlerArray, resultData) {
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
    },

    handlePreHandlers: function handlePreHandlers(handlerArray, resultData) {
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
    }

};

exports['default'] = UfpMiddlewareUtils;
module.exports = exports['default'];

// // console.log('handleSuccessive 2')

// // console.log('handleSuccessive 4')

// // console.log('handleSuccessive 5', handlerObject)