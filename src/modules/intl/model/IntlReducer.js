import ReduxUtils from '../../../utils/ReduxUtils'
import IntlConstants from './IntlConstants'
// import IntlActionCreators from './IntlActionCreators'
import IntlActionHandlers from './IntlActionHandlers'
import IntlConfig from './IntlConfig'

export default () => {
    const initialState = {
        currentLanguage: IntlConstants.DEFAULT_LANGUAGE,
        randomKey: Math.random(),
        nextLanguage: null,
        locales: IntlConfig.getLocales(),
        allMessages: {

            [IntlConstants.DEFAULT_LANGUAGE]: {}

        },
        languages: IntlConfig.getLanguages()
    }

    return ReduxUtils.createReducer(initialState, IntlActionHandlers)
}
