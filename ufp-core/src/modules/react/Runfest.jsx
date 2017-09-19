import {ThrowParam} from '../../utils/JSUtils'

import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import React from 'react'
// dummy for eslint without standard-react
console.log('dummy for eslint without standard-react usage of Provider import', Provider)
var _Providers = []
var _RootSibblings = []
var _RootNode = null
var _ReactApp = null
var _ReactAppCreatorFunction = null

const Manifest = {
    name: 'ufp-react',
    description: 'Ufp React Manifest ',

    register: ({
        rootNode = ThrowParam('HTML RootNode required for initialisation of ufp-react '),
        appCreatorFunction = ThrowParam('JSX Root Component appCreatorFunction required for initialisation of ufp-react')
    }) => {
        _RootNode = rootNode
        _ReactAppCreatorFunction = appCreatorFunction
        console.log('ufp-react root:', rootNode)
        console.log('ufp-react aappCreatorFunctionpp:', appCreatorFunction)
    },

    registerProvider: ({
        component
    }) => {
        console.log('ufp-react root provider registered:', component)
        _Providers.push(component)
    },

    registerRootSibbling: ({
        component = ThrowParam('component Root sibbling has to be set')
    }) => {
        console.log('ufp-react root sibbling :', component)
        _RootSibblings.push(component)
    },

    onPreStartup: ({UfpCore}) => {
        console.log('onPreStartup called React ', UfpCore)
        _ReactApp = _ReactAppCreatorFunction({UfpCore})

        console.log('ufp-react', _RootNode, _ReactApp)

        const App = _ReactApp

        var currentRootComponent = (<App />)

        const sibblings = []
        console.log('Root Sibblings are ', sibblings)

        _RootSibblings.map((item, index) => {
            const Component = item
            sibblings.push(<Component />)

        })

        _Providers.map((item, index) => {
            const Component = item
            currentRootComponent = (
                <Component>{index == 0 ?
                    <div>{currentRootComponent}{sibblings}</div> : {currentRootComponent}}</Component>)

        })
        console.log('RootComponent is  ', currentRootComponent)

        ReactDOM.render(<Provider store={UfpCore.getStore()}>{currentRootComponent}</Provider>, _RootNode
        )
    }
}

export default Manifest
