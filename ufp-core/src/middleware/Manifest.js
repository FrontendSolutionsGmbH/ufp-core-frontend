/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import UfpCoreConstants from '../core/UfpCoreConstants'
import UfpCore from '../core/UfpCore'
import UfpMiddleware from './UfpMiddleware'

const Manifest = {
    type: UfpCoreConstants.Manifest.REDUCER_TYPE,
    name: 'Ufp Redux Middleware',
    id: 'Ufp Redux Middleware',
    description: 'Handles asyncronous actions with intercept hooks',

    register: ({debug = true}={debug: true}) => {
        UfpCore.registerMiddleware(
            {
                id: Manifest.name,
                middleware: UfpMiddleware({
                    debug: debug,
                    useAxios: false
                })
            }
        )
    }

}
export default Manifest
