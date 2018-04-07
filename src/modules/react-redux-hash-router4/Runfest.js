/**
 * Application Router
 * @type {{name: string}}
 */
import RouterSelectors from './RouterSelectors'
import RouterConstants from './RouterConstants'
import {routerMiddleware, syncHistoryWithStore, routerReducer as routerReducer3} from 'react-router-redux'
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
            id: RouterConstants.NAME,
            reducer: routerReducer3
        })

        // in this example declare react-router
    }

}

export default Runfest
