/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
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
