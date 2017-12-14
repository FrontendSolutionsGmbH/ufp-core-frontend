import {ThrowParam} from '../../utils/JSUtils'
import IntlConfig from './IntlConfig'
import IntlConstants from './IntlConstants'
import IntlReducer from './IntlReducer'
import IntlActionCreators from './IntlActionCreators'
import IntlSelectors from './IntlSelectors'
import {configure} from '../../core'
import {registerRootProvider} from '../ufp-react'
import UfpIntlProvider from './components/UfpIntlProvider'
import {addLocaleData} from 'react-intl'
import StartupConfigurator from '../startup/StartupConfiguration'
var onceRegistered = false

const Runfest = {
    version: '0.2.0',
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
        console.log('INTL Runfest is ', this)
        console.log('INTL IntlConfig is ', IntlConfig)

        if (onceRegistered) {
            ThrowParam('UfpCore Already registered ')
        }
        onceRegistered = true

        StartupConfigurator.registerStagedResource({
            stage: '1',
            name: 'initSetLanguage',
            actionCreator: IntlActionCreators.initSetLanguage,
            actionNameSuccess: IntlConstants.UPDATE_MESSAGES
            //    actionNameFail: IntlConstants.SET_INIT_LANGUAGE.FAIL
        })

        // register provided locales (en is always present)
        IntlConfig.getLocales()
                  .map((locale) => {
                      console.log('Adding locale data ', locale)

                      addLocaleData(locale)
                  })

        registerRootProvider({component: UfpIntlProvider})

        UfpCore.registerReducer({
                id: IntlConstants.NAME,
                reducer: IntlReducer
            }
        )
    }
}

export default Runfest
