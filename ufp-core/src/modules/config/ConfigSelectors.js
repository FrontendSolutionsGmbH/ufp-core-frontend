import {ThrowParam} from '../../utils/JSUtils'
import Manifest from './Manifest'

export const ConfigState = (state) => state[Manifest.name]
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
