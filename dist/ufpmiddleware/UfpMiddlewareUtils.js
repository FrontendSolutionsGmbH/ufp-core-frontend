'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

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
    }

};

exports['default'] = UfpMiddlewareUtils;
module.exports = exports['default'];