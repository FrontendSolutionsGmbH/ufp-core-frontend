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

const Runfest = {
    name: 'ufp-startup',
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
            id: Runfest.name,
            reducer: StartupReducer
        })
        // register epics for us
        StartupConfiguration.init()
    }
}

export default Runfest
