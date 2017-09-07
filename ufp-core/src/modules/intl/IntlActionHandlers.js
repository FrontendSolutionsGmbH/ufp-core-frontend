import update from 'react-addons-update'
import IntlConstants from './IntlConstants'
import StorageReal from 'core/utils/storage/StorageReal'
import ApiDefinitions from 'core/api/ApiDefinitionNew'

export default {
    [IntlConstants.SET_LANGUAGES]: (state, action) => {
        return update(state, {
            languages: {$set: action.payload.languages}
        })
    },

    [IntlConstants.SET_LANGUAGE]: (state, action) => {
        if (action.payload.lang && state.currentLanguage !== action.payload.lang) {
            return update(state, {
                currentLanguage: {$set: action.payload.lang}
            })
        }
        StorageReal.setItem(IntlConstants.STORAGE_KEY, action.payload.lang)
        return state
    },

    [IntlConstants.UPDATE_MESSAGES]: (state, action) => update(state, {
        allMessages: {[action.payload.lang]: {$set: action.payload.messages}},
        randomKey: {$set: Math.random()},
        currentLanguage: {$set: action.payload.lang}
    })

}
