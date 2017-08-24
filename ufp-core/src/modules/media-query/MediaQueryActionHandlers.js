import update from 'react-addons-update'
import MediaQueryConstants from './MediaQueryConstants'

export default {

  [MediaQueryConstants.ActionConstants.MATCH_MEDIA]: (state, action) => update(state, {
    screenSize: {
      [action.payload.name]: {$set: action.payload.match}
    }
  })

}
