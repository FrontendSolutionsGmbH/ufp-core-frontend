/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */

export const setConfigValueAction = {
    name: 'SET_CONFIG_VALUE'
}

export default{
    reducerName: 'config',
    actions: [
        setConfigValueAction
    ]
}
