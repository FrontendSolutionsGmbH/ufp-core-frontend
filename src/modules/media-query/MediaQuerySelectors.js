import MediaQueryConstants from './MediaQueryConstants'
export const MediaQueryState = (state) => state[MediaQueryConstants.reducerName]

export const isMobileSelector = (state) => MediaQueryState(state).screenSize.isMobile

export default {
  isMobileSelector
}
