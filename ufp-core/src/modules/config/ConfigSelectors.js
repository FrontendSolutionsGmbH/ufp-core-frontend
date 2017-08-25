import {ThrowParam} from '../../utils/JSUtils'
import Manifest from './Manifest'
import ConfigConstants from './ConfigConstants'
import UfpCoreSelectors from '../../core/UfpCoreSelectors'

const getReducerState = (state) => UfpCoreSelectors.getUfpState(state)[Manifest.name]

export default {
    getConfigValue: (globalState, {
        key = ThrowParam('Config Key has to be set'),
        area = ConfigConstants.DEFAULT_AREA
    }) => {
        console.log('Retrieving config value', globalState, area, key)
        const state = getReducerState(globalState).data
        console.log('Retrieving config value', state, area, key)
        if (state && state[area] && state[area][key]) {
            return state[area][key]
        } else {
            return ConfigConstants.DEFAULT_VALUE
        }
    }
}
