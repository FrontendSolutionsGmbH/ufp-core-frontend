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

var data = {}

const reducerCreatorFunction = () => {
    /**
     * create reducer here, containing all the assigned data in data variable
     */
    return ConfigReducer(data)
}

export default{
    type: UfpCoreConstants.Manifest.REDUCER_TYPE,
    name: 'ConfigReducer',
    description: 'Ufp Config Reducer - property storage',
    actions: [
        setConfigValueAction
    ],
    register: (initialState) => {

        data = Object.assign(data, initialState)

        UfpCore.registerReducerCreator({
            id: 'ConfigReducer',
            reducerCreatorFunction: reducerCreatorFunction
        })
    }

}
