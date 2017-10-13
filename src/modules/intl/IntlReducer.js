import ReduxUtils from '../../utils/ReduxUtils'
import IntlConstants from './IntlConstants'
import IntlActionCreators from './IntlActionCreators'
import IntlActionHandlers from './IntlActionHandlers'
import StorageReal from '../../utils/storage/StorageReal'
import IntlConfig from './IntlConfig'


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
