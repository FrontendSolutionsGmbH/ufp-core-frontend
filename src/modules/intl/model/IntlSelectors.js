import IntlConstants from './IntlConstants'

export const IntlSelector = (state) => state[IntlConstants.NAME]
export const CurrentLanguageSelector = (state) => (IntlSelector(state) && IntlSelector(state).currentLanguage) || 'en'
export const randomIntlKey = (state) => (IntlSelector(state) && IntlSelector(state).randomKey) || 0
export const AllMessagesSelector = (state) => (IntlSelector(state) && IntlSelector(state).allMessages) || {}

export const CurrentLanguageMessagesSelector = (state) => (AllMessagesSelector(state) && AllMessagesSelector(state)[CurrentLanguageSelector(state)]) || {}
export const LanguagesSelector = (state) => (IntlSelector(state) && IntlSelector(state).languages) || []

export default {
    CurrentLanguageSelector,
    LanguagesSelector,
    AllMessagesSelector,
    CurrentLanguageMessagesSelector,
    randomIntlKey

}
