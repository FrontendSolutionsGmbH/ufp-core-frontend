/**
 * addition manifest registers additional default modules, at the beginning
 * there was only redux-thunk that is installed per default
 *
 * as of now this module is mandatory and not configurable, might change in future
 */
import thunk from 'redux-thunk'

export default{
    name: 'Ufp Additions',
    description: 'Ufp Additions - logger and thunk are added as per default',
    onRegistered: ({UfpCore}) => {
        // add the thunk middlewares to the ufp core
        UfpCore.registerMiddleware({
            id: 'Redux-Thunk',
            middleware: thunk
        })
    }

}
