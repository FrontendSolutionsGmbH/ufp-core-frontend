/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */
import StartupActionCreators from './controller/StartupActionCreators'
import StartupSelectors from './model/StartupSelectors'
import StartupConfiguration from './model/StartupConfiguration'
import StartupConstants from './model/StartupConstants'
import StartupReducer from './model/StartupReducer'
import {ThrowParam} from '../../utils/JSUtils'

var onceRegistered = false

const Runfest = {
    name: StartupConstants.NAME,
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
            id: StartupConstants.NAME,
            reducer: StartupReducer
        })
        // register epics for us
        StartupConfiguration.init()
    }
}

export default Runfest
