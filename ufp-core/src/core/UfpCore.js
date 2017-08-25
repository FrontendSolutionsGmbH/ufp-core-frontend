// import _UFPMiddleware from './ufpmiddleware/index.js'
// import _Utils from './utils/index.js'
// import _ConfigureEpics from './epic/ConfigureEpics.js'
// import _Startup from './startup/index.js'
// import _UfpStoreConfig from './store/StoreConfig'
//
// import _Menu from './menu/index.js'
//
// export const ConfigureEpics = _ConfigureEpics
// export const UFPUtils = _Utils
// export const UfpStoreConfig = _UfpStoreConfig
// export const UFPStartup = _Startup
// export const UFPMiddleware = _UFPMiddleware
// // export const UFPMenu = _Menu
// export default{
//
//     UFPMiddleware: _UFPMiddleware,
//     UFPUtils: UFPUtils,
//     UFPStartup: _Startup,
//     UfpStoreConfig,
//     ConfigureEpics: ConfigureEpics,
//     UFPMenu: _Menu
// }
// index.js is evil
// the redux store
import JsUtils from 'utils/JSUtils'
import {compose, createStore} from 'redux'
var store = null

/**
 * entry points for ufp core v0.1.0 it defines the crucial redux configuration,
 * providing wrapper for reducers middlewares and enhancers
 *
 * they all are called BEFORE the call to startup happens, afterwards an error is thrown
 */

var startedUp = false
var applicationName

const registerReducer = () => {
    checkStarted()
}
const registerMiddleware = () => {
    checkStarted()
}
const registerEnhancer = () => {
    checkStarted()
}
const checkStarted = () => {
    if (startedUp) {
        JsUtils.ThrowParam('Ufp Application already started registering no longer possible')
    }
}
const registerManifest = () => {
    checkStarted()
}

/**
 * the startup method ultimately calls up the application and puts everything in place
 * and creates the required redux store ...
 * @param applicationNameIn
 */
const startup = (applicationNameIn = 'Ufp Application') => {
    checkStarted()
    startedUp = true
    applicationName = applicationNameIn

    const middleware = [
        thunk,
        logger]

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = []

    var composeEnhancers = compose

    // check dev environment
    if (__DEV__) {
        if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        }
    }

    store = createStore(
        makeRootReducer(),
        // initialstate shall be managed by reducers themselves no direct state initialisation foreseen
        {},
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )

}

export default {

    registerReducer,
    registerMiddleware,
    registerEnhancer,

    registerManifest,

    startup

}
