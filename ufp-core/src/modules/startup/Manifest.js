/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */

import StartupActionCreators from './StartupActionCreators'
import StartupSelectors from './StartupSelectors'
import StartupConfiguration from './StartupConfiguration'
import StartupReducer from './StartupReducer'
import {ThrowParam} from '../../utils/JSUtils'

var onceRegistered = false

const Manifest = {
    name: 'Ufp Startup',
    description: 'Ufp Startup - manages sequentially execution of actions for initialisation',
    actionCreators: StartupActionCreators,
    selectors: StartupSelectors,

    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        if (onceRegistered) {
            // TBD: TODO: manage multi onregister calls in core
            return
        }
        onceRegistered = true

        UfpCore.registerReducer({
            id: Manifest.name,
            reducer: StartupReducer
        })

        StartupConfiguration.init()
    }
}

export default Manifest
