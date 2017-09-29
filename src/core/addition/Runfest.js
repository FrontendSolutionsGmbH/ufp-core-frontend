/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
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