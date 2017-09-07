import ReduxUtils from 'core/utils/ReduxUtils'
import IntlConstants from './IntlConstants'
import IntlActionCreators from './IntlActionCreators'
import IntlActionHandlers from './IntlActionHandlers'
import StartupConfigurator from 'ufp-core/lib/modules/startup/StartupConfiguration'
import StorageReal from 'core/utils/storage/StorageReal'

StartupConfigurator.registerStagedResource({
    stage: '1',
    name: 'initSetLanguage',
    actionCreator: IntlActionCreators.initSetLanguage,
    actionNameSuccess: IntlConstants.LOAD_LANGUAGE_FILES.SUCCESS,
    actionNameFail: IntlConstants.SET_INIT_LANGUAGE.FAIL
})

const initialState = {
    newKeys: {},
    visibleKeys: {},
    currentLanguage: StorageReal.getItem(IntlConstants.STORAGE_KEY, 'en'),
    randomKey: Math.random(),
    nextLanguage: null,
    allMessages: {},
    loadedMessages: {},
    editingKeys: {},
    languages: ['en', 'de'],
    intlEditorEnabled: false
}

export default ReduxUtils.createReducer(initialState, IntlActionHandlers)
