const storeConfig = {
    reducersRegistered: [],
    middlewaresRegistered: []
}

const registerReducer = (reducer) => {
    console.log('UFP Store Configt registerReducer')

    storeConfig.reducersRegistered.push(reducer)
}
const registerMiddleWare = (reducer) => {
    console.log('UFP Store Configt registerMiddleWare')

    storeConfig.reducersRegistered.push(reducer)
}

/**
 * the getconfig is exported as package private variable accessible
 * @returns {{reducersRegistered: Array}}
 */
export const getConfig = () => {
    return storeConfig
}

export default {
    registerMiddleWare,
    registerReducer
}
