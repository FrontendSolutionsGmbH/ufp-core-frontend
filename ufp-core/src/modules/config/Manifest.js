/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import UfpCoreConstants from '../../core/UfpCoreConstants'
import ConfigReducer from './ConfigReducer'
import UfpCore from '../../core/UfpCore'

export const setConfigValueAction = {
    name: 'SET_CONFIG_VALUE'
}

export default{
    type: UfpCoreConstants.Manifest.REDUCER_TYPE,
    name: 'ConfigReducer',
    description: 'Ufp Config Reducer - property storage',
    actions: [
        setConfigValueAction
    ],

    register: () => {
        UfpCore.registerReducer(ConfigReducer)
    }

}
