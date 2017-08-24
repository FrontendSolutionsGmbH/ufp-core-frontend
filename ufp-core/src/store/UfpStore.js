import {applyMiddleware, compose, createStore as createReduxStore} from 'redux'
import thunk from 'redux-thunk'
import RootReducer from './RootReducer'
import {getConfig} from './StoreConfig'
import logger from 'redux-logger'
import axios from 'axios'
import {ConfigureEpics, UFPMiddleware} from 'ufp-core'

export const axiosInstance = axios.create()

/*const createStore = (middlewares= [],initialState = {}, history) => {
 }*/

const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  //{debug:true, useAxios:true, axiosInstance}
  const middleware = [

    UFPMiddleware.createUFPMiddleware({
      debug: true,
      useAxios: true,
      axiosInstance
    }),
    ConfigureEpics.createEpicMiddleware(),
    thunk,
    logger

  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  var composeEnhancers = compose

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    RootReducer.makeRootReducer(getConfig()),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  // store.asyncReducers = {}
  //
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const reducers = require('./reducers').default
  //     store.replaceReducer(reducers(store.asyncReducers))
  //   })
  // }

  return store
}

export default {
  createStore
}
