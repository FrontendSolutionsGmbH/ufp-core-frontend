/**
 * the runfest.js defines the properties of the ufp-module and serves as RUNtimemaniFEST
 * @type {{name: string}}
 */

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
const Runfest = {
    name: 'Ufp Redux Middleware',
    id: 'Ufp Redux Middleware',
    description: 'Handles asyncronous actions with intercept hooks',

    onRegistered: ({UfpCore}) => {
        UfpCore.registerMiddleware(
            {
                id: Runfest.name,
                middleware: UfpMiddleware()
            }
        )

        UfpCore.registerReducerCreator({
            id: Runfest.name,
            reducerCreatorFunction: reducerCreatorFunction
        })
    }
}

export default Runfest
