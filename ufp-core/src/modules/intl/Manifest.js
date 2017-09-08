import {ThrowParam} from '../../utils/JSUtils'

import IntlReducer from './IntlReducer'
import IntlActionCreators from './IntlActionCreators'
import IntlSelectors from './IntlSelectors'
import ReactManifest from '../react/Manifest'
import UfpIntlProvider from './components/UfpIntlProvider'

import deLocaleData from 'react-intl/locale-data/de'
import {addLocaleData} from 'react-intl'
var onceRegistered = false

const Manifest = {
    name: 'ufp-intl',
    description: 'Ufp Internationalisation Manifest',

    actionCreators: IntlActionCreators,

    selectors: IntlSelectors,

    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        console.log('INTL Manifest is ', this)

        if (onceRegistered) {
            // todo: fixme: move verification of call thismethod once to core
            return
        }

        console.log('Initialising intl ', deLocaleData)
        addLocaleData(deLocaleData)

        onceRegistered = true
        ReactManifest.registerProvider({component: UfpIntlProvider})
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
