import enquire from 'enquire.js'
import MediaQueryActionCreators from './MediaQueryActionCreators'

const MediaQueryRegistration = {
  register: (store) => {
    enquire.register('screen and (max-width: 767px)', {

      // Match function is called when the query is true
      match: () => {
        // dispatch match event
        store.dispatch(MediaQueryActionCreators.matchMediaQuery('isMobile', true))
      },
      // Unmatch function is called when media query is false
      unmatch: () => {
        // dispatch unmatch events
        store.dispatch(MediaQueryActionCreators.matchMediaQuery('isMobile', false))
      }
    })
  }
}

export default MediaQueryRegistration
