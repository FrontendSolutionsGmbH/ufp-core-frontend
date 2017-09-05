/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */

import StartupActionCreators from './StartupActionCreators'
import StartupSelectors from './StartupSelectors'
import StartupReducer from './StartupReducer'
import {ThrowParam} from '../../utils/JSUtils'

const Manifest = {
    name: 'Ufp Startup',
    description: 'Ufp Startup - manages sequentially execution of actions for initialisation',
    actionCreators: StartupActionCreators,
    selectors: StartupSelectors,

    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        UfpCore.registerReducer({
            id: Manifest.name,
            reducer: StartupReducer
        })
    }

}

export default Manifest
