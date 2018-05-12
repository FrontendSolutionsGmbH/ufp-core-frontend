import IntlConstants from '../model/IntlConstants'

const setActiveLanguages = (languages = []) => (dispatch) => dispatch({
    type: IntlConstants.SET_LANGUAGES,
    payload: {
        languages
    }
})

/**
 * set messages sets all translations for a language, removing its current values
 * config for a language
 * @param lang
 * @param messages
 */
const setMessages = ({
    lang = IntlConstants.DEFAULT_LANGUAGE,
    messages = {}
}) => ({
    type: IntlConstants.UPDATE_MESSAGES,
    payload: {
        lang,
        messages
    }
})

/**
 * append messages to existing translations
 * config for a language
 * @param lang
 * @param messages
 */
const appendMessages = ({
    lang = IntlConstants.DEFAULT_LANGUAGE,
    messages = {}
}) => ({
    type: IntlConstants.APPEND_MESSAGES,
    payload: {
        lang,
        messages
    }
})

const setLanguage = (lang = IntlConstants.DEFAULT_LANGUAGE) => (dispatch) => {
    // console.log('SetLanguage called ', dispatch, getState)
    // console.log('SetLanguage called ', getState())

    //    if (IntlSelectors.AllMessagesSelector(getState())[lang]===undefined) {
    dispatch({
        type: IntlConstants.SET_LANGUAGE_REQUEST,
        payload: {lang: lang}
    })
}

const initSetLanguage = () => (dispatch) => {
    // console.log('UFP Intl Setting Language', getState().apiConfig)

    dispatch(setLanguage(IntlConstants.DEFAULT_LANGUAGE))
}
const flushKey = () => ({

    type: IntlConstants.INTL_FLUSH_KEYS

})

export default {
    flushKey,
    setMessages,
    appendMessages,
    setActiveLanguages,
    initSetLanguage,
    setLanguage
}
