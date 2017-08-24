import ConfigActionHandlers from './ConfigActionHandlers'
import ReduxUtils from '../../utils/ReduxUtils'
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    data: {}
}

export default ReduxUtils.createReducer(initialState, ConfigActionHandlers)
