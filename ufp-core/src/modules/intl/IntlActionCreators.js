import IntlConstants from './IntlConstants'
import IntlSelectors from './IntlSelectors'
import UfpRequestActions from '../../middleware/UfpRequestActions'
import ApiDefinitionNew from './ApiDefinitionNew'

const setActiveLanguages = (languages = []) => (dispatch) => dispatch({
    type: IntlConstants.SET_LANGUAGES,
    payload: {
        languages
    }
})

const setLanguage = (lang) => (dispatch, getState) => {
    console.log('SetLanguage called ', dispatch, getState)
    console.log('SetLanguage called ', getState())

    if (!IntlSelectors.AllMessagesSelector(getState())[lang]) {
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
                      })
                      .catch((e) => {
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
    console.log('UFP Intl Setting Language', getState().apiConfig)
    // var promise = dispatch(
    //     setLanguage(getState().apiConfig.defaultLanguage)
    // )
    // dispatch({
    //     types: IntlConstants.SET_INIT_LANGUAGE.ARRAY,
    //     payload: {
    //         response: promise
    //     }
    // })
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
    setActiveLanguages,
    initSetLanguage,
    setLanguage
}
