import IntlConstants from './IntlConstants'
import UfpRequestActions from 'core/api/ufpmiddleware/UfpRequestActions'
import ApiDefinitionNew from 'core/api/ApiDefinitionNew'
import AuthSelectors from 'core/redux-modules/ufp/auth/AuthSelectors'
import StartupSelectors from 'core/redux-modules/ufp/startup/StartupSelectors'
import IntlSelectors from './IntlSelectors'
import JsUtils from 'core/utils/JsUtils'
// // // console.log('INTL ACTION CREATOR CONSTANTS ARE ', IntlConstants)
import UfpResultHandlerNotifyRequestSuccess from 'core/api/ufpmiddleware/handlers/UfpResultHandlerNotifyRequestSuccess'

const uploadLanguageJson = (lang, file) => ({
  [UfpRequestActions.UFP_REQUEST_ACTION]: {
    ufpDefinition: ApiDefinitionNew.uploadIntlValuesForLanguage,
    ufpPayload: {},
    ufpData: {
      urlParams: {
        lang: lang
      },
      body: file
    },
    ufpResultHandler: UfpResultHandlerNotifyRequestSuccess
  }
})

const setActiveLanguages = (languages = []) => (dispatch) => dispatch({
  type: IntlConstants.SET_LANGUAGES,
  payload: {
    languages
  }
})

const deleteKey = (key, languageKey) => (dispatch) => dispatch({
  type: IntlConstants.INTL_KEY_VISIBLE,
  payload: {
    lang: languageKey,
    key: key
  }
})

const markKeyUsed = (visibleKey, visibleValue) => (dispatch) => {
  console.log('markKeyYUsed', dispatch, visibleKey, visibleValue)
  dispatch({
    type: IntlConstants.INTL_KEY_VISIBLE,
    payload: {
      value: visibleValue,
      key: visibleKey
    }
  })
  /* dispatch(createNewLanguageKeyInBackend(
   visibleKey,
   visibleValue
   ))
   */
}
const markKeyUnused = (visibleKey, visibleValue) => (dispatch) => {
  console.log('markKeyUnused', dispatch, visibleKey, visibleValue)
  dispatch({
    type: IntlConstants.INTL_KEY_HIDE,
    payload: {
      value: visibleValue,
      key: visibleKey
    }
  })
  /* dispatch(createNewLanguageKeyInBackend(
   visibleKey,
   visibleValue
   ))
   */
}

const intlEditorToggle = () => {
  // console.log('Toggling editor intl')
  return (dispatch) => {
    dispatch({
      type: IntlConstants.INTL_EDITOR_TOGGLE,
      payload: {}
    })
  }
}

const markKeyEditingStart = (visibleKey) => (dispatch) => {
  dispatch({
    type: IntlConstants.INTL_KEY_EDIT_START,
    payload: {
      key: visibleKey
    }
  })
}
const switchKeyEditingStart = (visibleKey) => (dispatch) => {
  dispatch({
    type: IntlConstants.INTL_KEY_EDIT_SWITCH,
    payload: {
      key: visibleKey
    }
  })
}

const markKeyEditingEnd = (visibleKey) => (dispatch) => {
  dispatch({
    type: IntlConstants.INTL_KEY_EDIT_END,
    payload: {
      key: visibleKey
    }
  })
}

const sendAllStoredLanguageKeysToBackend = () => (dispatch, getState) => {
  // // // console.log('IntlActionCreators sending all stored intl keys to backend', getState())

  var allNewKeys = IntlSelectors.allNewKeys(getState())
  for (var i in allNewKeys) {
    const item = allNewKeys[i]
    dispatch(sendNewLanguageKeyToBackend(item.key, item.value, item.groupNames[0]))
  }
}

const createNewLanguageKeyInBackend = (key = JsUtils.ThrowParam('createNewLanguageKeyInBackend key may not be undefined'), defaultValue = 'ufp:' + key, groupName = 'admin', language) => (dispatch, getState) => {
  var state = getState()
  // console.log('createNewLanguageKeyInBackend1 ', key)
  var selLanguage = language || IntlSelectors.CurrentLanguageSelector(state)
  if (!AuthSelectors.isAuthenticatedSelector(state) || !StartupSelectors.AppInitialisedSelector(state)) {
    // // // console.log('createNewLanguageKeyInBackend1 NOT LOGGED IN  ', key, defaultValue, groupName)
    dispatch({
      type: IntlConstants.INTL_KEY_NEW,
      payload: {
        groupNames: [groupName],
        key: key.toLowerCase(),
        value: defaultValue,
        lang: selLanguage
      }
    })
  }
  else {
    // console.log('createNewLanguageKeyInBackend1 LOGGED IN  ', key, defaultValue, groupName)
    dispatch({
      type: IntlConstants.INTL_KEY_NEW,
      payload: {
        groupNames: [groupName],
        key: key.toLowerCase(),
        value: defaultValue,
        lang: selLanguage
      }
    })

    // dispatch(setLanguage(null))
    // dispatch(setLanguage(IntlSelectors.CurrentLanguageSelector(state)))

    dispatch({
      [UfpRequestActions.UFP_REQUEST_ACTION]: {
        ufpDefinition: ApiDefinitionNew.createBackendIntlKey,
        ufpPayload: {
          groupNames: [groupName],
          key: key,
          language: selLanguage,
          value: defaultValue
        },
        ufpData: {
          body: {
            groupNames: [groupName],
            key: key.toLowerCase(),
            value: defaultValue,
            language: selLanguage
          }
        }
      }
    })
  }
}

const sendNewLanguageKeyToBackend = (key, defaultValue = 'ufp:' + key, groupName = 'admin', language) => (dispatch, getState) => {
  var state = getState()
  // // // console.log('createNewLanguageKeyInBackend1 ', key, defaultValue, groupName)
  var selLanguage = language || IntlSelectors.CurrentLanguageSelector(state)

  // dispatch(setLanguage(null))
  // dispatch(setLanguage(IntlSelectors.CurrentLanguageSelector(state)))

  dispatch({
    [UfpRequestActions.UFP_REQUEST_ACTION]: {
      ufpDefinition: ApiDefinitionNew.createBackendIntlKey,
      ufpPayload: {
        groupNames: [groupName],
        key: key,
        language: selLanguage,
        value: defaultValue
      },
      ufpData: {
        body: {
          groupNames: [groupName],
          key: key.toLowerCase(),
          value: defaultValue,
          language: selLanguage
        }
      }
    }
  })
}

const deleteLanguageKeyInBackend = (key, defaultValue = 'ufp:' + key, groupName = 'admin', language) => (dispatch, getState) => {
  var state = getState()
  // // // console.log('createNewLanguageKeyInBackend1 ', key, defaultValue, groupName)
  var selLanguage = language || IntlSelectors.CurrentLanguageSelector(state)

  // dispatch(setLanguage(null))
  // dispatch(setLanguage(IntlSelectors.CurrentLanguageSelector(state)))

  dispatch({
    [UfpRequestActions.UFP_REQUEST_ACTION]: {
      ufpDefinition: ApiDefinitionNew.deleteBackendIntlKey,
      ufpPayload: {
        groupNames: [groupName],
        key: key,
        language: selLanguage,
        value: defaultValue
      },
      ufpData: {
        body: {
          groupNames: [groupName],
          key: key.toLowerCase(),
          value: defaultValue,
          language: selLanguage
        }
      }
    }
  })

  dispatch({
    type: IntlConstants.REMOVE_KEY,
    payload: {
      groupNames: [groupName],
      key: key,
      language: selLanguage,
      value: defaultValue
    }
  })
}

const saveNewLanguageKey = (key, defaultValue = 'ufp:' + key, groupName = 'admin', language) => (dispatch, getState) => {
  var state = getState()
  // // console.log('createNewLanguageKeyInBackend1 ', key, defaultValue, groupName)
  if (key === undefined) {
    return
  }

  var selLanguage = language || IntlSelectors.CurrentLanguageSelector(state)
  dispatch({
    type: IntlConstants.INTL_KEY_NEW,
    payload: {
      groupNames: [groupName],
      key: key.toLowerCase(),
      value: defaultValue,
      lang: selLanguage
    }
  })
}

const setLanguage = (lang) => (dispatch, getState) => {
  if (!getState().intl.allMessages[lang]) {
    dispatch({
      type: IntlConstants.SET_LANGUAGE_REQUEST,
      payload: {lang: lang}
    })
    return Promise.resolve(dispatch(loadMessages(lang)))
      .then(() => {
        dispatch({
          type: IntlConstants.SET_LANGUAGE_SUCCESS,
          payload: {lang: lang}
        })
        return true
      }).catch((e) => {
        dispatch({
          type: IntlConstants.SET_LANGUAGE_FAILURE,
          payload: {

            error: e

          }
        })
        //        return Promise.reject(false)
      })
  } else {
    dispatch({
      type: IntlConstants.SET_LANGUAGE,
      payload: {lang: lang}
    })
    return Promise.resolve()
  }
}

const initSetLanguage = () => (dispatch, getState) => {
  console.log('Setting Language', getState().apiConfig)
  var promise = dispatch(setLanguage(getState().apiConfig.defaultLanguage))
  dispatch({
    types: IntlConstants.SET_INIT_LANGUAGE.ARRAY,
    payload: {
      response: promise
    }
  })
}

const loadMessages = (lang) => (dispatch) => {
  console.log('Load Messages 2', lang)
  // var loadKey = 'loadMessages' + Date.now()
  // var promise = Api.loadLocalLangFile(lang).then(function(response) {

  var obj9 = {
    ufpDefinition: ApiDefinitionNew.getUfpLangFile,
    ufpData: {
      urlParams: {
        lang: lang,
        tag: 'admin'
      }
    },
    ufpTypes: IntlConstants.LOAD_LANGUAGE_FILES,
    ufpActionCreators: {
      [IntlConstants.LOAD_LANGUAGE_FILES.SUCCESS]: (data) => ({
        type: IntlConstants.UPDATE_MESSAGES,
        payload: {
          lang: lang,
          messages: data.payload.data

        }
      })
    }
  }

  var result = {
    [UfpRequestActions.UFP_REQUEST_ACTION]: obj9
  }

  console.log('Load Messages 3', result)
  dispatch(result)
}

export default {
  uploadLanguageJson,
  setActiveLanguages,
  saveNewLanguageKey,
  deleteKey,
  markKeyEditingStart,
  markKeyEditingEnd,
  loadMessages,
  initSetLanguage,
  markKeyUsed,
  markKeyUnused,
  setLanguage,
  deleteLanguageKeyInBackend,
  sendAllStoredLanguageKeysToBackend,
  createNewLanguageKeyInBackend,
  sendNewLanguageKeyToBackend,
  intlEditorToggle,
  switchKeyEditingStart
}
