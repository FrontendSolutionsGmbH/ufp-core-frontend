export default {
    DEFAULT_LANGUAGE: 'en',
    NAME: 'ufp-intl',

    /**
     * set the current language value
     */
    SET_LANGUAGE: 'SET_LANGUAGE',
    /*
     flushes the root key forcing a rerendering of the tree, this is
     by intention now removed from changing the intl keys
      */
    INTL_FLUSH_KEYS: 'INTL_FLUSH_KEYS',
    STORAGE_KEY: 'ufp-intl-storage',

    SET_LANGUAGES: 'SET_LANGUAGES',
    /**
     * UPDATE_MESSAGES
     *
     * is used to set all translations for a language
     */
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    /**
     *  APPEND_MESSAGES
     *
     *  can be used to append new translations to the existing set of translation
     */
    APPEND_MESSAGES: 'APPEND_MESSAGES',
    /**
     * SET_LANGUAGE_REQUEST
     *
     * this action is not handled by the ufp intl component, it is triggered as soon
     * as a setLanguage() has occured and means that some process shall provide
     * the actual messages required for that language
     */
    SET_LANGUAGE_REQUEST: 'SET_LANGUAGE_REQUEST'

}
