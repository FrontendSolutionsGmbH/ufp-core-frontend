'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeRootReducer = undefined;

var _JSUtils = require('../utils/JSUtils');

var _UfpSetup = require('./UfpSetup');

var _UfpSetup2 = _interopRequireDefault(_UfpSetup);

var _Runfest = require('./addition/Runfest');

var _Runfest2 = _interopRequireDefault(_Runfest);

var _Runfest3 = require('./base/Runfest');

var _Runfest4 = _interopRequireDefault(_Runfest3);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = null;

/**
 *
 * entry points for ufp core v0.1.0 it defines the crucial redux configuration,
 * providing wrapper for reducers middlewares and enhancers
 *
 * they all are called BEFORE the call to startup happens, afterwards an error is thrown
 *
 */

// import UfpCoreConstants from './UfpCoreConstants'
var startedUp = false;
var applicationName;

var bindSelectors = function bindSelectors(selectors) {
    var result = {};

    if (selectors) {
        Object.keys(selectors).map(function (key) {
            result[key] = function () {
                for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                    params[_key] = arguments[_key];
                }

                return selectors[key].apply(selectors, [store.getState()].concat(params));
            };
        });
    }

    return result;
};

var bindActionCreators = function bindActionCreators(actionCreators) {
    var result = {};
    if (actionCreators) {
        Object.keys(actionCreators).map(function (key) {
            result[key] = function () {
                return store.dispatch(actionCreators[key].apply(actionCreators, arguments));
            };
        });
    }
    return result;
};

/**
 * here we iterate over all registered initalStateCallback() method,
 * the return values get Object.assign'ed and form the ufp-core
 * initial state
 *
 * warning: it is not meant for initialising reducers those
 * are initialised like normal, it is mean for adjusting
 * state via get params or persisting state in localstorage or
 * whatever :)
 */
var getInitialState = function getInitialState() {
    var result = {};
    _UfpSetup2.default.initialStateCallbacks.map(function (cb) {
        if (typeof cb === 'function') {
            result = Object.assign(result, cb());
        }
    });
    return result;
};

var makeRootReducer = exports.makeRootReducer = function makeRootReducer(reducers) {
    /**
     old method, creating ufp node in state tree, but it is just making problems so keep it in main state
     return combineReducers({[UfpCoreConstants.STATE_NAME]: combineReducers(reducers)})
     *
     */
    return (0, _redux.combineReducers)(reducers);
};
var registerReducer = function registerReducer(_ref) {
    var _ref$id = _ref.id,
        id = _ref$id === undefined ? (0, _JSUtils.ThrowParam)('Id Required for registerReducer') : _ref$id,
        _ref$reducer = _ref.reducer,
        reducer = _ref$reducer === undefined ? (0, _JSUtils.ThrowParam)('RreducerRequired for registerReducer') : _ref$reducer;

    checkStarted();

    // allow multi registration, last one wins though
    // if (UfpSetup.reducers[id]) {
    //     ThrowParam('Reducer already registered ... ', id, UfpSetup.reducers)
    // }s

    console.log('Registering Reducer ', id, reducer);
    _UfpSetup2.default.reducers[id] = {
        id: id,
        reducer: reducer
    };
};

var registerMiddleware = function registerMiddleware(_ref2) {
    var _ref2$id = _ref2.id,
        id = _ref2$id === undefined ? (0, _JSUtils.ThrowParam)('Id Required for registerMiddleware') : _ref2$id,
        _ref2$middleware = _ref2.middleware,
        middleware = _ref2$middleware === undefined ? (0, _JSUtils.ThrowParam)('middleware Required for registerEnhancer') : _ref2$middleware;

    checkStarted();
    // console.log('Registering Middleware ', id, middleware)
    _UfpSetup2.default.middlewares.push({
        id: id,
        middleware: middleware
    });
};

var registerEnhancer = function registerEnhancer(_ref3) {
    var _ref3$id = _ref3.id,
        id = _ref3$id === undefined ? (0, _JSUtils.ThrowParam)('Id Required for registerEnhancer') : _ref3$id,
        _ref3$enhancer = _ref3.enhancer,
        enhancer = _ref3$enhancer === undefined ? (0, _JSUtils.ThrowParam)('enhancer Required for registerEnhancer') : _ref3$enhancer;

    checkStarted();
    _UfpSetup2.default.enhancers.push({
        id: id,
        enhancer: enhancer
    });
};

var registerReducerCreator = function registerReducerCreator(_ref4) {
    var _ref4$id = _ref4.id,
        id = _ref4$id === undefined ? (0, _JSUtils.ThrowParam)('Id Required for registerReducerCreator') : _ref4$id,
        _ref4$reducerCreatorF = _ref4.reducerCreatorFunction,
        reducerCreatorFunction = _ref4$reducerCreatorF === undefined ? (0, _JSUtils.ThrowParam)('reducerCreatorFunction Required for registerReducerCreator') : _ref4$reducerCreatorF;

    checkStarted();
    if (_UfpSetup2.default.reducers[id]) {
        (0, _JSUtils.ThrowParam)('Reducer already registered ... ', id);
    }
    _UfpSetup2.default.reducerCreators[id] = {
        id: id,
        reducerCreatorFunction: reducerCreatorFunction
    };
};
var registerMiddlewareCreator = function registerMiddlewareCreator(_ref5) {
    var _ref5$id = _ref5.id,
        id = _ref5$id === undefined ? (0, _JSUtils.ThrowParam)('Id Required for registerMiddlewareCreator') : _ref5$id,
        _ref5$middlewareCreat = _ref5.middlewareCreatorFunction,
        middlewareCreatorFunction = _ref5$middlewareCreat === undefined ? (0, _JSUtils.ThrowParam)('middlewareCreatorFunction Required for registerMiddlewareCreator') : _ref5$middlewareCreat;

    checkStarted();
    _UfpSetup2.default.middlewareCreators.push({
        id: id,
        middlewareCreatorFunction: middlewareCreatorFunction
    });
};
var registerEnhancerCreator = function registerEnhancerCreator(_ref6) {
    var _ref6$id = _ref6.id,
        id = _ref6$id === undefined ? (0, _JSUtils.ThrowParam)('Id Required for registerEnhancerCreator') : _ref6$id,
        _ref6$enhancerCreator = _ref6.enhancerCreatorFunction,
        enhancerCreatorFunction = _ref6$enhancerCreator === undefined ? (0, _JSUtils.ThrowParam)('enhancerCreatorFunction Required for registerEnhancerCreator') : _ref6$enhancerCreator;

    checkStarted();
    _UfpSetup2.default.reducers.push({
        id: id,
        enhancerCreatorFunction: enhancerCreatorFunction
    });
};
var checkStarted = function checkStarted() {
    if (startedUp) {
        (0, _JSUtils.ThrowParam)('Ufp Application already started registering no longer possible');
    }
};
var registerRunfest = function registerRunfest(manifest) {
    checkStarted();

    // call onRegistered only if explicit
    if (manifest.onRegistered) {
        // console.log('Calling onRegistered on manifest', UfpCore)
        manifest.onRegistered({ UfpCore: UfpCore });
    }

    /*
     fill in dummy bound functions for outputting error notifications
     when used before startup() is called
     */
    // after we created the store, provide bound actioncreators and selectors for ease of use later on
    // we achieve this by iterating over all registered manifest

    if (manifest.actionCreators) {
        Object.keys(manifest.actionCreators).map(function (key) {
            // extend js object with notification throw error when startup has not been called
            // yes its brutal, but convenient
            manifest[key] = function () {
                return (0, _JSUtils.ThrowParam)(manifest.name + '.' + key + ' called before ufpCore.startup() ');
            };
        });
    }

    if (manifest.selectors) {
        Object.keys(manifest.selectors).map(function (key) {
            // extend js object with notification throw error when startup has not been called
            // yes its brutal, but convenient
            manifest[key] = function () {
                return (0, _JSUtils.ThrowParam)(manifest.name + '.' + key + ' called before ufpCore.startup() ');
            };
        });
    }
    _UfpSetup2.default.manifests.push(manifest);
};

/**
 * the startup method ultimately calls up the application and puts everything in place
 * and creates the required redux store ...
 * @param applicationNameIn
 */
var startup = function startup() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { applicationNameIn: 'Ufp Application' },
        _ref7$applicationName = _ref7.applicationNameIn,
        applicationNameIn = _ref7$applicationName === undefined ? 'Ufp Application' : _ref7$applicationName;

    checkStarted();

    registerRunfest(_Runfest2.default);
    registerRunfest(_Runfest4.default);

    // @if NODE_ENV=='develop'
    var DebugRunfest = require('./debug/Runfest');
    registerRunfest(DebugRunfest);

    // @endif

    startedUp = true;
    applicationName = applicationNameIn;
    // console.log('UFP Application startup - ', applicationName)
    var reducers = [];
    Object.keys(_UfpSetup2.default.reducers).map(function (key) {
        // console.log('Creating Reducer From', key, index, UfpSetup.reducers[key])
        reducers[key] = _UfpSetup2.default.reducers[key].reducer;
    });

    Object.keys(_UfpSetup2.default.reducerCreators).map(function (key) {
        // console.log('Creating Reducer From CreatorFunction', key, index)
        reducers[key] = _UfpSetup2.default.reducerCreators[key].reducerCreatorFunction();
    });

    var middleware = [];
    _UfpSetup2.default.middlewares.map(function (item) {
        middleware.push(item.middleware);
    });
    _UfpSetup2.default.middlewareCreators.map(function (item) {
        middleware.push(item.middlewareCreatorFunction());
    });

    // ======================================================
    // Store Enhancers
    // ======================================================
    var enhancers = [];
    _UfpSetup2.default.enhancers.map(function (item) {
        enhancers.push(item.enhancer);
    });

    _UfpSetup2.default.enhancerCreators.map(function (item) {
        enhancers.push(item.enhancerCreatorFunction());
    });

    var composeEnhancers = _redux.compose;

    // check dev environment
    if (__DEV__) {
        if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                name: 'UFP ' + applicationName,
                shouldCatchErrors: true,
                actionCreators: _UfpSetup2.default.getAllActionCreators()

            });
        }
    }

    // debug

    var rootReducer = makeRootReducer(reducers);
    // console.log('Reducers are:', rootReducer)
    // console.log('middleware are: ', middleware)
    // console.log('enhancers are:', enhancers)

    store = (0, _redux.createStore)(rootReducer,
    // initialstate shall be managed by reducers themselves no direct state initialisation foreseen
    getInitialState(), composeEnhancers.apply(undefined, [_redux.applyMiddleware.apply(undefined, middleware)].concat(enhancers)));

    // after we created the store, provide bound actioncreators and selectors for ease of use later on
    // we achieve this by iterating over all registered manifest
    _UfpSetup2.default.manifests.map(function (manifest) {
        // console.log('Updating manifest')
        var boundSelectors = bindSelectors(manifest.selectors);
        var boundActionCreators = bindActionCreators(manifest.actionCreators);
        Object.keys(boundSelectors).map(function (key) {
            // extend js object of incoming manifest
            // yes its brutal, but convenient
            // console.log('boundSelectors : ', key, boundSelectors[key])
            manifest[key] = boundSelectors[key];
        });

        Object.keys(boundActionCreators).map(function (key) {
            // extend js object of incoming manifest
            // yes its brutal, but convenient
            // console.log('boundActionCreators : ', key, boundActionCreators[key])
            manifest[key] = boundActionCreators[key];
        });
    });

    // iterate over all manifests an call 'onPreStartup'
    Object.keys(_UfpSetup2.default.manifests).map(function (key) {
        if (_UfpSetup2.default.manifests[key] && _UfpSetup2.default.manifests[key].onPreStartup) {
            _UfpSetup2.default.manifests[key].onPreStartup({ UfpCore: UfpCore });
        }
    });

    /**
     * dispatch init action
     */
    _Runfest4.default.startupAction();
};

var registerInitialStateCallback = function registerInitialStateCallback(_ref8) {
    var _ref8$callback = _ref8.callback,
        callback = _ref8$callback === undefined ? (0, _JSUtils.ThrowParam)('Callback has to be set for registerInitialStateCallback') : _ref8$callback;

    _UfpSetup2.default.initialStateCallbacks.push(callback);
};

var UfpCore = {
    registerInitialStateCallback: registerInitialStateCallback,
    registerReducer: registerReducer,
    registerMiddleware: registerMiddleware,
    registerEnhancer: registerEnhancer,

    registerReducerCreator: registerReducerCreator,
    registerMiddlewareCreator: registerMiddlewareCreator,
    registerEnhancerCreator: registerEnhancerCreator,

    registerRunfest: registerRunfest,

    startup: startup,

    // wrapping of redux store
    getState: function getState() {
        return store.getState();
    },

    dispatch: function dispatch(action) {
        return store.dispatch(action);
    },

    subscribe: function subscribe(listener) {
        return store.subscribe(listener);
    },

    replaceReducer: function replaceReducer(nextReducer) {
        return store.replaceReducer(nextReducer);
    },
    getStore: function getStore() {
        return store;
    }

};
exports.default = UfpCore;