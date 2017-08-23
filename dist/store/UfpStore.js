'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axiosInstance = undefined;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _RootReducer = require('./RootReducer');

var _RootReducer2 = _interopRequireDefault(_RootReducer);

var _reactRouterRedux = require('react-router-redux');

var _ufpCore = require('ufp-core');

var _StoreConfig = require('./StoreConfig');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axiosInstance = exports.axiosInstance = _axios2.default.create();


/*const createStore = (middlewares= [],initialState = {}, history) => {
 }*/

var createStore = function createStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var history = arguments[1];

  // ======================================================
  // Middleware Configuration
  // ======================================================
  var routeMiddleware = (0, _reactRouterRedux.routerMiddleware)(history);
  //{debug:true, useAxios:true, axiosInstance}
  var middleware = [_ufpCore.UFPMiddleware.createUFPMiddleware({
    debug: true,
    useAxios: true,
    axiosInstance: axiosInstance
  }), routeMiddleware, _ufpCore.ConfigureEpics.createEpicMiddleware(), _reduxThunk2.default, _reduxLogger2.default];

  // ======================================================
  // Store Enhancers
  // ======================================================
  var enhancers = [];
  var composeEnhancers = _redux.compose;

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  var store = (0, _redux.createStore)(_RootReducer2.default.makeRootReducer((0, _StoreConfig.getConfig)()), initialState, composeEnhancers.apply(undefined, [_redux.applyMiddleware.apply(undefined, middleware)].concat(enhancers)));
  // store.asyncReducers = {}
  //
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const reducers = require('./reducers').default
  //     store.replaceReducer(reducers(store.asyncReducers))
  //   })
  // }

  return store;
};

exports.default = {
  createStore: createStore
};