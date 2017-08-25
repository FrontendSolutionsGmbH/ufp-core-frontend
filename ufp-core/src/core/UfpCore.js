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
import {ThrowParam} from '../utils/JSUtils'
import UfpSetup from './UfpSetup'
import AdditionsManifest from './addition/Manifest'
import {compose, createStore, combineReducers} from 'redux'
var store = null

/**
 * entry points for ufp core v0.1.0 it defines the crucial redux configuration,
 * providing wrapper for reducers middlewares and enhancers
 *
 * they all are called BEFORE the call to startup happens, afterwards an error is thrown
 */

var startedUp = false
var applicationName

export const bindSelectors = (selectors) => {
    result = {}
    Object.keys(selectors).map((key) => {
        result[key] = (...params) => {
            return selectors[key](store.getState(), ...params)
        }
    })

}

export const bindActionCreators = (actionCreators) => {
    result = {}
    Object.keys(actionCreators).map((key) => {
        result[key] = (...params) => {
            return store.dispatch(actionCreators[key](...params))
        }
    })

}

export const makeRootReducer = (reducers) => {
    return combineReducers({...reducers})
}
const registerReducer = ({
    id = ThrowParam('Id Required for registerReducer'),
    reducer = ThrowParam('RreducerRequired for registerReducer')

}) => {
    checkStarted()
    UfpSetup.reducers.push({
        id: id,
        reducer
    })
}
const registerMiddleware = ({
    id = ThrowParam('Id Required for registerMiddleware'),
    middleware = ThrowParam('middleware Required for registerMiddleware')

})
    => {
    checkStarted()
    UfpSetup.middleware.push({
        id: id,
        middleware
    })
}
const registerEnhancer = ({
    id = ThrowParam('Id Required for registerEnhancer'),
    enhancer = ThrowParam('enhancer Required for registerEnhancer')

}) => {
    checkStarted()
    UfpSetup.enhancers.push({
        id: id,
        enhancer
    })

}

const registerReducerCreator = ({
    id = ThrowParam('Id Required for registerReducerCreator'),
    reducerCreatorFunction = ThrowParam('reducerCreatorFunction Required for registerReducerCreator')

}) => {
    checkStarted()
    UfpSetup.reducerCreators.push({
        id,
        reducerCreatorFunction
    })

}
const registerMiddlewareCreator = ({
    id = ThrowParam('Id Required for registerMiddlewareCreator'),
    middlewareCreatorFunction = ThrowParam('middlewareCreatorFunction Required for registerMiddlewareCreator')

}) => {
    checkStarted()
    UfpSetup.middlewareCreators.push({
        id,
        middlewareCreatorFunction
    })
}
const registerEnhancerCreator = ({
    id = ThrowParam('Id Required for registerEnhancerCreator'),
    enhancerCreatorFunction = ThrowParam('enhancerCreatorFunction Required for registerEnhancerCreator')

}) => {
    checkStarted()
    UfpSetup.reducers.push({
        id,
        enhancerCreatorFunction
    })
}
const checkStarted = () => {
    if (startedUp) {
        ThrowParam('Ufp Application already started registering no longer possible')
    }
}
const registerManifest = ({
    id = ThrowParam('Id Required for registerManifest'),
    actionCreators = ThrowParam('actionCreators Required for registerManifest'),
    selectors = ThrowParam('selectors Required for registerManifest')
}) => {
    checkStarted()
    UfpSetup.reducers.manifests({
        id: id,
        actionCreators,
        selectors
    })
}

/**
 * the startup method ultimately calls up the application and puts everything in place
 * and creates the required redux store ...
 * @param applicationNameIn
 */
const startup = (applicationNameIn = 'Ufp Application') => {
    checkStarted()

    AdditionsManifest.register()

    startedUp = true
    applicationName = applicationNameIn

    const reducers = UfpSetup.reducers
    UfpSetup.reducerCreators.map((item) => {
        reducers.push(item.reducerCreatorFunction())
    })

    const middleware = UfpSetup.middlewares
    UfpSetup.middlewareCreators.map((item) => {
        middleware.push(item.middlewareCreatorFunction())
    })

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = UfpSetup.enhancers
    UfpSetup.middlewareCreators.map((item) => {
        enhancers.push(item.enhancerCreatorFunction())
    })

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

    // after we created the store, provide bound actioncreators and selectors for ease of use later on
    // we achieve this by iterating over all registered manifest
    UfpSetup.manifests.map((manifest) => {

        var boundSelectors = bindSelectors(manifest.selectors)
        var boundActionCreators = bindActionCreators(manifest.actionCreators)
        Object.keys(boundSelectors).map((key) => {
            // extend js object of incoming manifest
            // yes its brutal, but convenient
            manifest[key] = boundSelectors[key]
        })

        Object.keys(boundActionCreators).map((key) => {
            // extend js object of incoming manifest
            // yes its brutal, but convenient
            manifest[key] = boundActionCreators[key]
        })

    })
}

export default {

    registerReducer,
    registerMiddleware,
    registerEnhancer,

    registerReducerCreator,
    registerMiddlewareCreator,
    registerEnhancerCreator,

    registerManifest,

    startup

}
