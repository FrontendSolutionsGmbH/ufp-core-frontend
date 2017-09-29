'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * identity helper method to for various occasions, where just the input needs to be returned
 * @param t
 * @returns {*}
 */
var identity = function identity(t) {
    return t;
};

/**
 * retrieves the first particular node from an object with the keyname===nodeName
 * @param nodeName  key name to search for
 * @param object object to search for a key with value nodeName
 * @returns {*}
 */
var getNodeFromObject = function getNodeFromObject(nodeName, object) {
    // // console.log('Getnode from objewct called ', nodeName, object)
    for (var i in object) {
        //   // console.log('Getnode checking ', i, object[i])
        if (i === nodeName) {
            //     // console.log('Getnode returning 1', object[i])
            return object[i];
        } else if ((0, _typeof3.default)(object[i]) === 'object' && object[i] !== null) {
            var tempResult = getNodeFromObject(nodeName, object[i]);
            if (tempResult !== undefined) {
                //      // console.log('Getnode returning 2', tempResult)
                return tempResult;
            }
        }
    }
};

/**
 * the localselector
 * @param nodeName the node to be returned as the local state for the reducer from the main state tree
 */
var createLocalSelector = function createLocalSelector(nodeName, func) {
    // // console.log('Creating local selector for node ', nodeName)
    return function (state) {
        //   // console.log('called local selector for node called', nodeName)
        //    // console.log('called local selector for node called local state is', getNodeFromObject(nodeName, state))
        var node = getNodeFromObject(nodeName, state);
        if (node !== undefined) {
            return func(node);
        } else {
            //  throw 'StateTree does not contain required node: [' + nodeName + '] check reducer naming'
            // state tree entry not found assume its allready local
            return func(state);
        }
    };
};

/**
 *
 * für standard actioncreator 2.ter paramter object oder native type,
 * wird payload zugewiesen - identity wird dann angewendet
 *
 * @param type
 * @param actionCreator
 * @param metaCreator
 * @returns {Function}
 */
var createActionCreator = function createActionCreator(type, actionCreator, metaCreator) {
    var finalActionCreator = typeof actionCreator === 'function' ? actionCreator : identity;

    return function () {
        var action = {
            type: type,
            payload: finalActionCreator.apply(undefined, arguments)
        };

        if (arguments.length === 1 && (arguments.length <= 0 ? undefined : arguments[0]) instanceof Error) {
            // Handle FSA errors where the payload is an Error object. Set error.
            action.error = true;
        }

        if (typeof metaCreator === 'function') {
            action.meta = metaCreator.apply(undefined, arguments);
        }

        return action;
    };
};

/**
 * creates a reducer from initialstate and action handlers, actions are then mapped through
 * the action handles associative array to obtain the current action handler
 *./
 * @param initialState the initial state of the reducer
 * @param handlers object notated action handlers
 * @returns {reducer} returns the reducer method
 */
var createReducer = function createReducer(initialState, handlers) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        // // console.log('DEBUG 1 REDUCER CALLED')
        var handler = handlers[action.type];
        return handler ? handler(state, action) : state;
    };
};
/**
 * this helper method is designed to execute actionhandlers from reducers to be combined
 * with the current actionhandlings
 * @param initialState
 * @param handlers
 * @param reducers
 * @returns {reducer}
 */
var createReducerWithChildReducers = function createReducerWithChildReducers(initialState, handlers, reducers) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        //  // console.log('createReducerWithChildReducers executing  ', action.type, reducers)
        var currentState = state;
        // pass through child reducers
        for (var i in reducers) {
            //   // console.log('createReducerWithChildReducers calling child reducer  ', reducers[i])
            currentState = reducers[i](currentState, action);
        }

        var handler = handlers[action.type];
        return handler ? handler(currentState, action) : currentState;
    };
};
/**
 * helper method to create the 3 action names request,success,fail to be used by async middleware
 * @param resourceName the prefix for the action names
 * @returns {{REQUEST: string, SUCCESS: string, FAIL: string}}
 */
var createAsyncResponseActionNames = function createAsyncResponseActionNames(resourceName) {
    return {
        REQUEST: resourceName.toUpperCase() + '_REQUEST',
        SUCCESS: resourceName.toUpperCase() + '_SUCCESS',
        END: resourceName.toUpperCase() + '_END',
        FAIL: resourceName.toUpperCase() + '_FAIL',
        ARRAY: [resourceName.toUpperCase() + '_REQUEST', resourceName.toUpperCase() + '_SUCCESS', resourceName.toUpperCase() + '_FAIL']
    };
};
/**
 * his helper method creates a action with parameter already bound
 * @param actionCreator
 * @param dispatch
 * @param params
 * @returns {Function}
 */
var bindActionCreatorAndParams = function bindActionCreatorAndParams(actionCreator, dispatch) {
    for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        params[_key - 2] = arguments[_key];
    }

    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return dispatch(actionCreator.apply(undefined, params.concat(args)));
    };
};

exports.default = {
    createAsyncResponseActionNames: createAsyncResponseActionNames,
    createLocalSelector: createLocalSelector,
    bindActionCreatorAndParams: bindActionCreatorAndParams,
    createReducer: createReducer,
    createActionCreator: createActionCreator,
    createReducerWithChildReducers: createReducerWithChildReducers
};