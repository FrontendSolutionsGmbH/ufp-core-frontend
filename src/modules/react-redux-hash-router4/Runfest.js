/**
 * Application Router
 * @type {{name: string}}
 */
import RouterSelectors from './RouterSelectors'
import RouterConstants from './RouterConstants'
import RouterProvider from './view/RouterProvider'
import {registerRootProvider} from '../ufp-react'
// Create a history of your choosing (we're using a browser history in this case)
import {connectRouter, routerMiddleware} from 'connected-react-router'
// import history from './history'
// Create an enhanced history that syncs navigation events with the store
import history from './history'

const Runfest = {
    name: RouterConstants.NAME,
    description: 'React Redux Hash Router3',
    selectors: RouterSelectors,

    onRegistered: ({UfpCore}) => {
        // console.log('ROUTER REGISTERED CALLED ')

        UfpCore.registerMiddleware({
            id: 'router-middleware',
            middleware: routerMiddleware(history)
        })

        UfpCore.registerReducer({
            id: RouterConstants.REDUCER_NAME,
            reducer: connectRouter(history)
        })
        /**
         * use the root provider injection provided by ufp-react
         */
        registerRootProvider({component: RouterProvider})
    }

}

export default Runfest
