import ConfigActionHandlers from './ConfigActionHandlers'
import ReduxUtils from '../../utils/ReduxUtils'

const initialState = {
    data: {}
}

export default ReduxUtils.createReducer(initialState, ConfigActionHandlers)
