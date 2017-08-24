import ConfigConstants from './ConfigConstants'
import {ThrowParam} from '../../utils/JSUtils'

export const ConfigState = (state) => state[ConfigConstants.reducerName]
export const ConfigDataSelector = (state) => ConfigState(state).data

export default {
    ConfigDataSelector,

    getConfigValue: (globalState, {
        key = ThrowParam('Config Key has to be set'),
        area = 'default'
    }) => {
        return {
            key,
            area,
            value: 'WILLIWALUE'
        }
    }
}
