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
  [ApiDefinitions.createBackendIntlKey.actionConstants.SUCCESS]: (state, action) => {
    // console.log('INTL KEY SUCCESSFUILLY CREATED IN BACKEND ', state, action)

    /**
     * a succsesful key creation removes it from the new list
     *
     */

    state = update(state, {
      loadedMessages: {
        [action.payload.language]: {
          [action.payload.key]: {$set: action.payload.value}
        }
      }
    })

    return state
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

  [IntlConstants.SET_LANGUAGE_SUCCESS]: (state) => state,

  [IntlConstants.UPDATE_MESSAGES]: (state, action) => update(state, {
    allMessages: {[action.payload.lang]: {$set: action.payload.messages}},
    loadedMessages: {[action.payload.lang]: {$set: action.payload.messages}},
    randomKey: {$set: Math.random()},
    currentLanguage: {$set: action.payload.lang}
  }),

  [IntlConstants.INTL_KEY_NEW]: (state, action) => update(state, {
    allMessages: {
      [action.payload.lang]: {
        [action.payload.key]: {$set: action.payload.value}
      }
    },
    newKeys: {
      [action.payload.key]: {$set: action.payload}
    }
  }),

  [IntlConstants.INTL_KEY_VISIBLE]: (state, action) => update(state, {
    visibleKeys: {
      [action.payload.key]: {
        $set: {
          key: action.payload.key,
          currentValue: action.payload.value
        }
      }
    }
  }),

  [IntlConstants.REMOVE_KEY]: (state, action) => update(state, {
    allMessages: {
      [action.payload.language]: {
        [action.payload.key]: {
          $set: undefined
        }
      }
    },
    loadedMessages: {
      [action.payload.language]: {
        [action.payload.key]: {
          $set: undefined
        }
      }
    }
  }),
  [IntlConstants.INTL_KEY_HIDE]: (state, action) => update(state, {
    visibleKeys: {
      [action.payload.key]: {
        $set: undefined
      }
    }
  }),

  [IntlConstants.INTL_KEY_EDIT_START]: (state, action) => update(state, {
    editingKeys: {
      [action.payload.key]: {
        $set: {
          key: action.payload.key
        }
      }
    }
  }),

  [IntlConstants.INTL_KEY_EDIT_END]: (state, action) => update(state, {
    editingKeys: {
      [action.payload.key]: {
        $set: undefined
      }
    }
  }),

  [IntlConstants.INTL_KEY_EDIT_SWITCH]: (state, action) => update(state, {
    editingKeys: {
      [action.payload.key]: {
        $set: state.editingKeys[action.payload.key] ? undefined : {
            key: action.payload.key
          }
      }
    }
  }),

  [IntlConstants.INTL_EDITOR_TOGGLE]: (state) => update(state, {
    intlEditorEnabled: {
      $set: !state.intlEditorEnabled
    }
  })

}
