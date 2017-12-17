/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import ConfigReducer from './model/ConfigReducerCreatorFunction'
import ConfigActionCreators from './controller/ConfigActionCreators'
import ConfigConstants from './model/ConfigConstants'
import ConfigSelectors from './model/ConfigSelectors'
import {ThrowParam} from '../../utils/JSUtils'

var data = {}

const reducerCreatorFunction = () => {
    /**
     * create reducer here, containing all the assigned data in data variable
     */
    return ConfigReducer({data: data})
}

const Runfest = {
    name: ConfigConstants.NAME,
    description: 'Ufp Config Reducer - property storage',
    actionCreators: ConfigActionCreators,
    selectors: ConfigSelectors,
    reducerCreatorFunction,
    registerConfigDefault: (initialState, area = ConfigConstants.DEFAULT_AREA) => {
        data[area] = Object.assign(data[area] || {}, initialState)
    },

    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        UfpCore.registerReducerCreator({
            id: Runfest.name,
            reducerCreatorFunction: reducerCreatorFunction
        })
    }

}

export default Runfest
