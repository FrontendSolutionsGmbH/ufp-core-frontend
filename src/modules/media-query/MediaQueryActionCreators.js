import MediaQueryConstants from './MediaQueryConstants'

// // console.log('MediaQueryConstants ACTION CREATOR CONSTANTS ARE ', MediaQueryConstants)
export const matchMediaQuery = (name, match) => ({
  type: MediaQueryConstants.ActionConstants.MATCH_MEDIA,
  payload: {
    name,
    match
  }
})

export default {
  matchMediaQuery
}
