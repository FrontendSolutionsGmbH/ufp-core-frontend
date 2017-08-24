import ReduxUtils from 'modules/utils/ReduxUtils'

import MediaQueryActionHandlers from './MediaQueryActionHandlers'
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  screenSize: {
    isMobile: false
  }
}

export default ReduxUtils.createReducer(initialState, MediaQueryActionHandlers)
