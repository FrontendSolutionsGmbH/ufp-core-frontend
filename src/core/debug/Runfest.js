/**
 * modules used for debugging a ufp application, it is triggered currently
 * only via a GET parameter when ufp-core runs in browser
 */
import logger from 'redux-logger'
import RoutingUtils from '../../utils/RoutingUtils'
export default{
    name: 'Ufp Debug',
    description: 'Ufp Debug - redux logger...',
    onRegistered: ({UfpCore}) => {
        if (RoutingUtils.getParameterByName('debug') === 'true') {
            UfpCore.registerMiddleware({
                id: 'Redux-Logger',
                middleware: logger
            })
        }
    }

}
