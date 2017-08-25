import {applyMiddleware, compose, createStore as createReduxStore} from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import logger from 'redux-logger'
import UFPMiddleware from '../middleware/UfpMiddleware'

/* const createStore = (middlewares= [],initialState = {}, history) => {
 } */

const createStore = (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    // {debug:true, useAxios:true, axiosInstance}
    const middleware = [

        UFPMiddleware()({
            debug: true
        }),
        // ConfigureEpics.createEpicMiddleware(),
        thunk,
        logger]

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
        makeRootReducer(),
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )
    store.asyncReducers = {}

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default
            store.replaceReducer(reducers(store.asyncReducers))
        })
    }

    return store
}

export default createStore
