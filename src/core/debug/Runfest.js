/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import logger from 'redux-logger'

export default{
    name: 'Ufp Debug',
    description: 'Ufp Debug - redux logger...',
    onRegistered: ({UfpCore}) => {
        UfpCore.registerMiddleware({
            id: 'Redux-Logger',
            middleware: logger
        })
    }

}
