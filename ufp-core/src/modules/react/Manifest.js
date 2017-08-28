import {ThrowParam} from '../../utils/JSUtils'
import UfpCoreConstants from '../../core/UfpCoreConstants'
import UfpCore from '../../core/UfpCore'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import React from 'react'
// dummy for eslint without standard-react
console.log('dummy for eslint without standard-react usage of Provider import', Provider)
var _RootNode = null
var _ReactApp = null

const reducerCreatorFunction = () => {
    return (state = {}, action) => {
        if (action.type === UfpCoreConstants.ACTION_NAMES.STARTUP) {
            console.log('Reducer Called ufp-react', state, action)
            console.log('Reducer Called ufp-react', _RootNode, _ReactApp)
            const Item = _ReactApp
            ReactDOM.render(
              <Provider store={UfpCore.getStore()}><Item /></Provider>, _RootNode
            )
        }
        return state
    }
}

const Manifest = {
    name: 'ufp-react',
    description: 'Ufp React Manifest ',

    register: ({
        rootNode = ThrowParam('HTML RootNode required for initialisation of ufp-react'),
        app = ThrowParam('JSX Root Component required for initialisation of ufp-react')
    }) => {
        _RootNode = rootNode
        _ReactApp = app
        console.log('ufp-react root:', rootNode)
        console.log('ufp-react app:', app)

        UfpCore.registerReducerCreator({
            id: 'ufp-react Initialiser',
            reducerCreatorFunction
        })
    }

}

export default Manifest
