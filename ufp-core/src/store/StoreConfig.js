
const storeConfig = {
    reducersRegistered: []
}

const registerReducer = (reducer) => {
    console.log('UFP Store Configt')

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
    registerReducer
}
