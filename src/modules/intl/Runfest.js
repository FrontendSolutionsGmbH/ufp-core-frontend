import {ThrowParam} from '../../utils/JSUtils'
import IntlConfig from './IntlConfig'
import IntlConstants from './IntlConstants'
import IntlReducer from './IntlReducer'
import IntlActionCreators from './IntlActionCreators'
import IntlSelectors from './IntlSelectors'
import {registerRootProvider} from '../ufp-react'
import UfpIntlProvider from './components/UfpIntlProvider'
import {addLocaleData} from 'react-intl'
var onceRegistered = false

const Runfest = {
    name: IntlConstants.NAME,
    description: 'Ufp Internationalisation Manifest',

    actionCreators: IntlActionCreators,
    selectors: IntlSelectors,

    /**
     * returns a list of the distinct parent locales
     * @private
     */

    configure: ({
        locales = ThrowParam('At least one locale should be provided'),
        languages = ThrowParam('At least one language should be provided')

    }) => {
        console.log('Registering locale', locales)

        IntlConfig.locales.push(...locales)
        IntlConfig.languages.push(...languages)
    },

    addLocaleData: (locale) => {
        /**
         * wrapper method to allow adding locales at runtime
         *
         */
        addLocaleData(locale)
    },
    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        console.log('INTL Manifest is ', this)

        if (onceRegistered) {
            ThrowParam('UfpCore Already registered ')
        }

        // register provided locales (en is always present)
        IntlConfig.locales.map((locale) => {
            addLocaleData(locale)
        })

        onceRegistered = true
        registerRootProvider({component: UfpIntlProvider})
        UfpCore.registerReducer({
                id: Runfest.name,
                reducer: IntlReducer
            }
        )
    }
}

export default Runfest
