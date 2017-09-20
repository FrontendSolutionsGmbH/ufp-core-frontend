import {ThrowParam} from '../utils/JSUtils'
import UfpSetup from './UfpSetup'
// import UfpCoreConstants from './UfpCoreConstants'
import AdditionsRunfest from './addition/Runfest'
import BaseRunfest from './base/Runfest'
import {applyMiddleware, compose, combineReducers, createStore} from 'redux'

var store = null

/**
 *
 * entry points for ufp core v0.1.0 it defines the crucial redux configuration,
 * providing wrapper for reducers middlewares and enhancers
 *
 * they all are called BEFORE the call to startup happens, afterwards an error is thrown
 *
 */

var startedUp = false
var applicationName

const bindSelectors = (selectors) => {
    var result = {}

    if (selectors) {
        Object.keys(selectors)
            .map((key) => {
                result[key] = (...params) => {
                    return selectors[key](store.getState(), ...params)
                }
            })
    }

    return result
}

const bindActionCreators = (actionCreators) => {
    var result = {}
    if (actionCreators) {
        Object.keys(actionCreators)
            .map((key) => {
                result[key] = (...params) => {
                    return store.dispatch(actionCreators[key](...params))
                }
            })
    }
    return result
}

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
const getInitialState = () => {
    var result = {}
    UfpSetup.initialStateCallbacks.map((cb) => {
        if (typeof cb === 'function') {
            result = Object.assign(result, cb())
        }
    })
    return result
}

export const makeRootReducer = (reducers) => {
    /**
     old method, creating ufp node in state tree, but it is just making problems so keep it in main state
     return combineReducers({[UfpCoreConstants.STATE_NAME]: combineReducers(reducers)})
     *
     */
    return combineReducers(reducers)
}
const registerReducer = ({
    id = ThrowParam('Id Required for registerReducer'),
    reducer = ThrowParam('RreducerRequired for registerReducer')

}) => {
    checkStarted()

    // allow multi registration, last one wins though
    // if (UfpSetup.reducers[id]) {
    //     ThrowParam('Reducer already registered ... ', id, UfpSetup.reducers)
    // }s

    console.log('Registering Reducer ', id, reducer)
    UfpSetup.reducers[id] = {
        id: id,
        reducer
    }
}

const registerMiddleware = ({
    id = ThrowParam('Id Required for registerMiddleware'),
    middleware = ThrowParam('middleware Required for registerEnhancer')

}) => {
    checkStarted()
    // console.log('Registering Middleware ', id, middleware)
    UfpSetup.middlewares.push({
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
    if (UfpSetup.reducers[id]) {
        ThrowParam('Reducer already registered ... ', id)
    }
    UfpSetup.reducerCreators[id] = {
        id,
        reducerCreatorFunction
    }
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
const registerRunfest = (manifest) => {
    checkStarted()

    // call onRegistered only if explicit
    if (manifest.onRegistered) {
        // console.log('Calling onRegistered on manifest', UfpCore)
        manifest.onRegistered({UfpCore})
    }

    /*
     fill in dummy bound functions for outputting error notifications
     when used before startup() is called
     */
    // after we created the store, provide bound actioncreators and selectors for ease of use later on
    // we achieve this by iterating over all registered manifest

    if (manifest.actionCreators) {
        Object.keys(manifest.actionCreators)
            .map((key) => {
                // extend js object with notification throw error when startup has not been called
                // yes its brutal, but convenient
                manifest[key] = () => ThrowParam(manifest.name + '.' + key + ' called before ufpCore.startup() ')
            })
    }

    if (manifest.selectors) {
        Object.keys(manifest.selectors)
            .map((key) => {
                // extend js object with notification throw error when startup has not been called
                // yes its brutal, but convenient
                manifest[key] = () => ThrowParam(manifest.name + '.' + key + ' called before ufpCore.startup() ')
            })
    }
    UfpSetup.manifests.push(manifest)
}

/**
 * the startup method ultimately calls up the application and puts everything in place
 * and creates the required redux store ...
 * @param applicationNameIn
 */
const startup = ({applicationNameIn = 'Ufp Application'}={applicationNameIn: 'Ufp Application'}) => {
    checkStarted()

    registerRunfest(AdditionsRunfest)
    registerRunfest(BaseRunfest)

    // @if NODE_ENV=='develop'
    const DebugRunfest = require('./debug/Runfest')
    registerRunfest(DebugRunfest)

    // @endif

    startedUp = true
    applicationName = applicationNameIn
    // console.log('UFP Application startup - ', applicationName)
    const reducers = []
    Object.keys(UfpSetup.reducers)
        .map((key) => {
            // console.log('Creating Reducer From', key, index, UfpSetup.reducers[key])
            reducers[key] = UfpSetup.reducers[key].reducer
        })

    Object.keys(UfpSetup.reducerCreators)
        .map((key) => {
            // console.log('Creating Reducer From CreatorFunction', key, index)
            reducers[key] = UfpSetup.reducerCreators[key].reducerCreatorFunction()
        })

    const middleware = []
    UfpSetup.middlewares.map((item) => {
        middleware.push(item.middleware)
    })
    UfpSetup.middlewareCreators.map((item) => {
        middleware.push(item.middlewareCreatorFunction())
    })

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = []
    UfpSetup.enhancers.map((item) => {
        enhancers.push(item.enhancer)
    })

    UfpSetup.enhancerCreators.map((item) => {
        enhancers.push(item.enhancerCreatorFunction())
    })

    var composeEnhancers = compose

    // check dev environment
    if (__DEV__) {
        if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                name: 'UFP ' + applicationName,
                shouldCatchErrors: true,
                actionCreators: UfpSetup.getAllActionCreators()

            })
        }
    }

    // debug

    const rootReducer = makeRootReducer(reducers)
    // console.log('Reducers are:', rootReducer)
    // console.log('middleware are: ', middleware)
    // console.log('enhancers are:', enhancers)

    store = createStore(
        rootReducer,
        // initialstate shall be managed by reducers themselves no direct state initialisation foreseen
        getInitialState(),
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )

    // after we created the store, provide bound actioncreators and selectors for ease of use later on
    // we achieve this by iterating over all registered manifest
    UfpSetup.manifests.map((manifest) => {
        // console.log('Updating manifest')
        var boundSelectors = bindSelectors(manifest.selectors)
        var boundActionCreators = bindActionCreators(manifest.actionCreators)
        Object.keys(boundSelectors)
            .map((key) => {
                // extend js object of incoming manifest
                // yes its brutal, but convenient
                // console.log('boundSelectors : ', key, boundSelectors[key])
                manifest[key] = boundSelectors[key]
            })

        Object.keys(boundActionCreators)
            .map((key) => {
                // extend js object of incoming manifest
                // yes its brutal, but convenient
                // console.log('boundActionCreators : ', key, boundActionCreators[key])
                manifest[key] = boundActionCreators[key]
            })
    })

    // iterate over all manifests an call 'onPreStartup'
    Object.keys(UfpSetup.manifests)
        .map((key) => {
            if (UfpSetup.manifests[key] && UfpSetup.manifests[key].onPreStartup) {
                UfpSetup.manifests[key].onPreStartup({UfpCore})
            }
        })

    /**
     * dispatch init action
     */
    BaseRunfest.startupAction()
}

const registerInitialStateCallback = ({
    callback = ThrowParam('Callback has to be set for registerInitialStateCallback')
}) => {
    UfpSetup.initialStateCallbacks.push(callback)
}

const UfpCore = {
    registerInitialStateCallback,
    registerReducer,
    registerMiddleware,
    registerEnhancer,

    registerReducerCreator,
    registerMiddlewareCreator,
    registerEnhancerCreator,

    registerRunfest,

    startup,

    // wrapping of redux store
    getState: () => {
        return store.getState()
    },

    dispatch: (action) => {
        return store.dispatch(action)
    },

    subscribe: (listener) => {
        return store.subscribe(listener)
    },

    replaceReducer: (nextReducer) => {
        return store.replaceReducer(nextReducer)
    },
    getStore: () => {
        return store
    }

}
export default UfpCore
