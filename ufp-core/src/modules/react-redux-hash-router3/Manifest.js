/**
 * Application Router
 * @type {{name: string}}
 */
import {useRouterHistory} from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
import RouterSelectors from './RouterSelectors'
import {routerMiddleware, syncHistoryWithStore, routerReducer as routerReducer3} from 'react-router-redux'

const hashHistory = useRouterHistory(createHashHistory)({
    basename: ''
})

const Manifest = {
    name: 'ufp-react-redux-router3',
    description: 'React Redux Hash Router3',
    selectors: RouterSelectors,

    onRegistered: ({UfpCore}) => {
        console.log('ROUTER REGISTERED CALLED ')

        UfpCore.registerMiddleware({
            id: 'router-middleware',
            middleware: routerMiddleware(hashHistory)
        })

        UfpCore.registerReducer({
            id: Manifest.name,
            reducer: routerReducer3
        })

        // in this example declare react-router
    },

    /**
     * route setup is communicated through main manifes
     */
    syncHistoryWithStore: (store) => {
        return syncHistoryWithStore(hashHistory, store, {

            selectLocationState: (state) => state[Manifest.name]
        })
    }

}

export default Manifest
