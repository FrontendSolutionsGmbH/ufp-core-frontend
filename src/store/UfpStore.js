import {applyMiddleware, compose, createStore as createReduxStore} from 'redux'
import thunk from 'redux-thunk'
import RootReducer from './RootReducer'
import {routerMiddleware} from 'react-router-redux'
import {UFPMiddleware} from 'ufp-core'
import {getConfig}  from './StoreConfig'
import logger from 'redux-logger'
import axios from 'axios'
export const axiosInstance = axios.create()
import {ConfigureEpics} from 'ufp-core'

/*const createStore = (middlewares= [],initialState = {}, history) => {
 }*/

const createStore = (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const routeMiddleware = routerMiddleware(history)
  //{debug:true, useAxios:true, axiosInstance}
  const middleware = [

    UFPMiddleware.createUFPMiddleware({
      debug: true,
      useAxios: true,
      axiosInstance
    }),
    routeMiddleware,
    ConfigureEpics.createEpicMiddleware(),
    thunk,
    logger

  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

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
