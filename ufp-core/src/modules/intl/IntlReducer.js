import ReduxUtils from '../../utils/ReduxUtils'
import IntlConstants from './IntlConstants'
import IntlActionCreators from './IntlActionCreators'
import IntlActionHandlers from './IntlActionHandlers'
import StartupConfigurator from '../startup/StartupConfiguration'
import StorageReal from '../../utils/storage/StorageReal'
import IntlConfig from './IntlConfig'

StartupConfigurator.registerStagedResource({
    stage: '1',
    name: 'initSetLanguage',
    actionCreator: IntlActionCreators.initSetLanguage,
    actionNameSuccess: IntlConstants.UPDATE_MESSAGES
    //    actionNameFail: IntlConstants.SET_INIT_LANGUAGE.FAIL
})

const initialState = {
    currentLanguage: StorageReal.getItem(IntlConstants.STORAGE_KEY, 'en'),
    randomKey: Math.random(),
    nextLanguage: null,
    locales: IntlConfig.getLocales(),
    allMessages: {
        en: {},
        de: {}
    },
    languages: IntlConfig.getLanguages()
}

export default ReduxUtils.createReducer(initialState, IntlActionHandlers)
