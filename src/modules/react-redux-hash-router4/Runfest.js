/**
 * Application Router
 * @type {{name: string}}
 */
import RouterSelectors from './RouterSelectors'
import RouterConstants from './RouterConstants'
import RouterProvider from './view/RouterProvider'
import {registerRootProvider} from '../ufp-react'
import {routerMiddleware, routerReducer as routerReducer4} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

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
            id: 'router',
            reducer: routerReducer4
        })
        registerRootProvider({component: RouterProvider})
        // in this example declare react-router
    }

}

export default Runfest
