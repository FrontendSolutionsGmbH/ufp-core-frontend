/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import UfpCoreConstants from '../../core/UfpCoreConstants'
import UfpCore from '../core/UfpCore'
import UfpMiddleware from './UfpMiddleware'

export const setConfigValueAction = {
    name: 'SET_CONFIG_VALUE'
}

export default{
    type: UfpCoreConstants.Manifest.REDUCER_TYPE,
    reducerName: 'config',
    description: 'willi wonka',
    actions: [
        setConfigValueAction
    ],
    initialiser: () => {

    },

    register: ({debug = true}) => {
        UfpCore.registerMiddleware(
            UfpMiddleware({
                debug: debug,
                useAxios: false
            })
        )
    }

}
