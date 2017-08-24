import ConfigActionHandlers from './ConfigActionHandlers'
import {UFPUtils} from '../../utils'
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    data: {}
}

export default UFPUtils.ReduxUtils.createReducer(initialState, ConfigActionHandlers)
