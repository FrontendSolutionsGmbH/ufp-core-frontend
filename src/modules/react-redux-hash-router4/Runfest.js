/**
 * Application Router
 * @type {{name: string}}
 */
import RouterSelectors from './RouterSelectors'
import RouterConstants from './RouterConstants'
import RouterProvider from './view/RouterProvider'
import {registerRootProvider} from '../ufp-react'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
// Create a history of your choosing (we're using a browser history in this case)
import { routerMiddleware } from 'connected-react-router'
// import history from './history'
// Create an enhanced history that syncs navigation events with the store
export const history = createBrowserHistory()
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
            reducer: connectRouter(history),
        })
        /**
         * use the root provider injection provided by ufp-react
         */
        registerRootProvider({component: RouterProvider})
    }

}

export default Runfest
