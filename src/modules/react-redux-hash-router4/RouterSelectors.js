import RouterConstants from './RouterConstants'

const routerState = (state) => state[RouterConstants.REDUCER_NAME]
const getLocation = (state) => routerState(state).location
const getPathName = (state) => getLocation(state).pathname
const getSearch = (state) => getLocation(state).search
const getHash = (state) => getLocation(state).hash
const getAction = (state) => getLocation(state).action
const getKey = (state) => getLocation(state).key
const getQuery = (state) => getLocation(state).query

export default {
    routerState,
    getLocation,
    getAction,
    getPathName,
    getSearch,
    getHash,
    getKey,
    getQuery
}
