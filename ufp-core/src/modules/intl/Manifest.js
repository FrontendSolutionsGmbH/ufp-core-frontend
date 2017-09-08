import {ThrowParam} from '../../utils/JSUtils'

import IntlReducer from './IntlReducer'
import IntlActionCreators from './IntlActionCreators'
import IntlSelectors from './IntlSelectors'
import ReactManifest from '../react/Manifest'
import IntlProvider from './components/IntlProvider'

var onceRegistered = false

const Manifest = {
    name: 'ufp-intl',
    description: 'Ufp Internationalisation Manifest',

    actionCreators: IntlActionCreators,

    selectors: IntlSelectors,

    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        if (onceRegistered) {
            // todo: fixme: move verification of call thismethod once to core
            return
        }
        onceRegistered = true
        ReactManifest.registerProvider({component: IntlProvider})
        UfpCore.registerReducer({
                id: Manifest.name,
                reducer: IntlReducer
            }
        )
    }
}

// configure is the new register
Manifest.configure = Manifest.register

export default Manifest
