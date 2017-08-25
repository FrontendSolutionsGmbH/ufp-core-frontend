/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import UfpCoreConstants from '../../core/UfpCoreConstants'
import ConfigReducer from './ConfigReducer'
import UfpCore from '../../core/UfpCore'
import ConfigActionCreators from './ConfigActionCreators'
import ConfigConstants from './ConfigConstants'
import ConfigSelectors from './ConfigSelectors'

export const setConfigValueAction = {
    name: 'SET_CONFIG_VALUE'
}

var data = {}

const reducerCreatorFunction = () => {
    /**
     * create reducer here, containing all the assigned data in data variable
     */
    return ConfigReducer({data: data})
}

const Manifest = {
    type: UfpCoreConstants.Manifest.REDUCER_TYPE,
    name: 'ConfigReducer',
    description: 'Ufp Config Reducer - property storage',
    actionCreators: ConfigActionCreators,
    selectors: ConfigSelectors,

    register: (initialState, area = ConfigConstants.DEFAULT_AREA) => {
        data[area] = Object.assign(data[area] || {}, initialState)

        // Manifest registering enables rewriting of this Manifest to bound actionCreators and bound selectors
        UfpCore.registerManifest(Manifest)

        UfpCore.registerReducerCreator({
            id: Manifest.name,
            reducerCreatorFunction: reducerCreatorFunction
        })
    }

}

export default Manifest
