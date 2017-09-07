import RouterManifest from './Manifest'

const routerState = (state) => state[RouterManifest.name]
const getLocation = (state) => routerState(state)['locationBeforeTransitions']
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
