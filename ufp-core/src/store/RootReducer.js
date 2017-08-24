import {combineReducers} from 'redux'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({...asyncReducers})
}

export default {
  makeRootReducer
}
