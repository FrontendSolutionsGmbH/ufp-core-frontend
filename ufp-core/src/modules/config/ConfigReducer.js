import ConfigActionHandlers from './ConfigActionHandlers'
import {UFPUtils} from 'ufp-core'
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
   data: {}
}

export default UFPUtils.ReduxUtils.createReducer(initialState, ConfigActionHandlers)
