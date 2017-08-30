/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import UfpCoreConstants from '../core/UfpCoreConstants'
import UfpMiddleware from './UfpMiddleware'
import UfpMiddlewareConfiguration from './UfpMiddlewareConfiguration'

const reducerCreatorFunction = () => {
    /**
     * create reducer here, containing all the assigned data in data variable
     */
    return (state = UfpMiddlewareConfiguration.get()) => {
        return state
    }
}
const Manifest = {
    type: UfpCoreConstants.Manifest.REDUCER_TYPE,
    name: 'Ufp Redux Middleware',
    id: 'Ufp Redux Middleware',
    description: 'Handles asyncronous actions with intercept hooks',

    onRegistered: ({UfpCore}) => {
        UfpCore.registerMiddleware(
            {
                id: Manifest.name,
                middleware: UfpMiddleware()
            }
        )

        UfpCore.registerReducerCreator({
            id: Manifest.name,
            reducerCreatorFunction: reducerCreatorFunction
        })
    }
}

export default Manifest
