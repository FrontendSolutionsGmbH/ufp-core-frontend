/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import UfpCore from '../../core/UfpCore'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default{
    name: 'Ufp Additions',
    description: 'Ufp Additions - logger and thunk are added as per default',
    register: () => {
        // add these middlewares to the ufp core
        UfpCore.registerMiddleware({
            id: 'Redux-Thunk',
            middleware: thunk
        })
        UfpCore.registerMiddleware({
            id: 'Redux-Logger',
            middleware: logger
        })
    }

}
