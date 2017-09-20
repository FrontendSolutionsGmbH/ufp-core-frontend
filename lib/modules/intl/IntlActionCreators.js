'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _IntlConstants = require('./IntlConstants');

var _IntlConstants2 = _interopRequireDefault(_IntlConstants);

var _IntlSelectors = require('./IntlSelectors');

var _IntlSelectors2 = _interopRequireDefault(_IntlSelectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setActiveLanguages = function setActiveLanguages() {
    var languages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (dispatch) {
        return dispatch({
            type: _IntlConstants2.default.SET_LANGUAGES,
            payload: {
                languages: languages
            }
        });
    };
};

/**
 * set messages actually sets a message
 * config for a language
 * @param lang
 * @param messages
 */
var setMessages = function setMessages(_ref) {
    var lang = _ref.lang,
        messages = _ref.messages;
    return {
        type: _IntlConstants2.default.UPDATE_MESSAGES,
        payload: {
            lang: lang,
            messages: messages
        }
    };
};

var setLanguage = function setLanguage(lang) {
    return function (dispatch, getState) {
        console.log('SetLanguage called ', dispatch, getState);
        console.log('SetLanguage called ', getState());

        if (_IntlSelectors2.default.AllMessagesSelector(getState())[lang]) {
            dispatch({
                type: _IntlConstants2.default.SET_LANGUAGE_REQUEST,
                payload: { lang: lang }
            });
            // return Promise.resolve(dispatch(loadMessages(lang)))
            //               .then(() => {
            //                   dispatch({
            //                       type: IntlConstants.SET_LANGUAGE_SUCCESS,
            //                       payload: {lang: lang}
            //                   })
            //                   return true
            //               })
            //               .catch((e) => {
            //                   dispatch({
            //                       type: IntlConstants.SET_LANGUAGE_FAILURE,
            //                       payload: {
            //
            //                           error: e
            //
            //                       }
            //                   })
            //                   //        return Promise.reject(false)
            //               })
        } else {
            dispatch({
                type: _IntlConstants2.default.SET_LANGUAGE,
                payload: { lang: lang }
            });
        }
    };
};

var initSetLanguage = function initSetLanguage() {
    return function (dispatch, getState) {
        console.log('UFP Intl Setting Language', getState().apiConfig);

        dispatch(setLanguage('en'));

        // var promise = dispatch(
        //     setLanguage(getState().apiConfig.defaultLanguage)
        // )
        // dispatch({
        //     types: IntlConstants.SET_INIT_LANGUAGE.ARRAY,
        //     payload: {
        //         response: promise
        //     }
        // })
    };
};
//
// const loadMessages = (lang) => (dispatch) => {
//     console.log('Load Messages 2', lang)
//     // var loadKey = 'loadMessages' + Date.now()
//     // var promise = Api.loadLocalLangFile(lang).then(function(response) {
//
//     var obj9 = {
//         ufpDefinition: ApiDefinitionNew.getUfpLangFile,
//         ufpData: {
//             urlParams: {
//                 lang: lang,
//                 tag: 'admin'
//             }
//         },
//         ufpTypes: IntlConstants.LOAD_LANGUAGE_FILES,
//         ufpActionCreators: {
//             [IntlConstants.LOAD_LANGUAGE_FILES.SUCCESS]: (data) => ({
//                 type: IntlConstants.UPDATE_MESSAGES,
//                 payload: {
//                     lang: lang,
//                     messages: data.payload.data
//
//                 }
//             })
//         }
//     }

//
//     var result = {
//         [UfpRequestActions.UFP_REQUEST_ACTION]: obj9
//     }
//
//     console.log('Load Messages 3', result)
//     dispatch(result)
// }

exports.default = {
    setMessages: setMessages,
    setActiveLanguages: setActiveLanguages,
    initSetLanguage: initSetLanguage,
    setLanguage: setLanguage
};