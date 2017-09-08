import ReduxUtils from '../../utils/ReduxUtils'
import IntlConstants from './IntlConstants'
// import IntlActionCreators from './IntlActionCreators'
import IntlActionHandlers from './IntlActionHandlers'
// import StartupConfigurator from '../startup/StartupConfiguration'
import StorageReal from '../../utils/storage/StorageReal'

// StartupConfigurator.registerStagedResource({
//     stage: '1',
//     name: 'initSetLanguage',
//     actionCreator: IntlActionCreators.initSetLanguage
//     // actionNameSuccess: IntlConstants.LOAD_LANGUAGE_FILES.SUCCESS,
// //    actionNameFail: IntlConstants.SET_INIT_LANGUAGE.FAIL
// })

const initialState = {
    currentLanguage: StorageReal.getItem(IntlConstants.STORAGE_KEY, 'en'),
    randomKey: Math.random(),
    nextLanguage: null,
    allMessages: {
        en: {
                'welcome': 'Welcome'
        },
        de: {
            'welcome': 'Willkommen'
        }

    },
    languages: ['en']
}

export default ReduxUtils.createReducer(initialState, IntlActionHandlers)
