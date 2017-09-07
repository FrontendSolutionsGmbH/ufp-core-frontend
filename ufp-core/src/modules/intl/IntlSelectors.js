export const IntlSelector = (state) => state.intl
export const CurrentLanguageSelector = (state) => (IntlSelector(state) && IntlSelector(state).currentLanguage) || 'en'
export const allNewKeys = (state) => (IntlSelector(state) && IntlSelector(state).newKeys) || {}
export const allVisibleKeys = (state) => (IntlSelector(state) && IntlSelector(state).visibleKeys) || {}
export const randomIntlKey = (state) => (IntlSelector(state) && IntlSelector(state).randomKey) || 0
export const AllMessagesSelector = (state) => (IntlSelector(state) && IntlSelector(state).allMessages) || {}
export const LoadedMessagesSelector = (state) => (IntlSelector(state) && IntlSelector(state).loadedMessages) || {}
export const AllEditingKeysSelector = (state) => (IntlSelector(state) && IntlSelector(state).editingKeys) || {}
export const CurrentLanguageMessagesSelector = (state) => (AllMessagesSelector(state) && AllMessagesSelector(state)[CurrentLanguageSelector(state)]) || {}
export const currentLanguageLoadedKeys = (state) => (AllMessagesSelector(state) && LoadedMessagesSelector(state)[CurrentLanguageSelector(state)]) || {}
export const IntlEditorEnabledSelector = (state) => (IntlSelector(state) && IntlSelector(state).intlEditorEnabled) || false
export const LanguagesSelector = (state) => (IntlSelector(state) && IntlSelector(state).languages) || []

export default {
  CurrentLanguageSelector,
  LanguagesSelector,
  AllMessagesSelector,
  allNewKeys,
  currentLanguageLoadedKeys,
  AllEditingKeysSelector,
  allVisibleKeys,
  CurrentLanguageMessagesSelector,
  IntlEditorEnabledSelector,
  IntlSelector,
  randomIntlKey
}
