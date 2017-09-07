/**
 * the manifest.js defines the properties of the ufp-module
 * @type {{name: string}}
 */

import MenuActionCreators from './MenuActionCreators'
import MenuSelectors from './MenuSelectors'
import MenuReducer from './MenuReducer'
import EpicManifest from './../epic/Manifest'
import {ThrowParam} from '../../utils/JSUtils'

const Manifest = {
    name: 'Ufp Menu',
    description: 'Ufp Menu - provides menu management functionality',
    actionCreators: MenuActionCreators,
    selectors: MenuSelectors,

    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        UfpCore.registerManifest(EpicManifest)

        UfpCore.registerReducer({
            id: Manifest.name,
            reducer: MenuReducer
        })
    }

}

export default Manifest
