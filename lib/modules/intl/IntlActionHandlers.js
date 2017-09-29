'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _IntlConstants$SET_LA;

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _IntlConstants = require('./IntlConstants');

var _IntlConstants2 = _interopRequireDefault(_IntlConstants);

var _StorageReal = require('../../utils/storage/StorageReal');

var _StorageReal2 = _interopRequireDefault(_StorageReal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_IntlConstants$SET_LA = {}, (0, _defineProperty3.default)(_IntlConstants$SET_LA, _IntlConstants2.default.SET_LANGUAGES, function (state, action) {
    return (0, _reactAddonsUpdate2.default)(state, {
        languages: { $set: action.payload.languages }
    });
}), (0, _defineProperty3.default)(_IntlConstants$SET_LA, _IntlConstants2.default.SET_LANGUAGE_REQUEST, function (state, action) {
    return (0, _reactAddonsUpdate2.default)(state, {
        nextLanguage: { $set: action.payload.lang }
    });
}), (0, _defineProperty3.default)(_IntlConstants$SET_LA, _IntlConstants2.default.SET_LANGUAGE, function (state, action) {
    if (action.payload.lang && state.currentLanguage !== action.payload.lang) {
        return (0, _reactAddonsUpdate2.default)(state, {
            randomKey: { $set: Math.random() },
            currentLanguage: { $set: action.payload.lang }
        });
    }
    _StorageReal2.default.setItem(_IntlConstants2.default.STORAGE_KEY, action.payload.lang);
    return state;
}), (0, _defineProperty3.default)(_IntlConstants$SET_LA, _IntlConstants2.default.UPDATE_MESSAGES, function (state, action) {
    var result = (0, _reactAddonsUpdate2.default)(state, {
        allMessages: (0, _defineProperty3.default)({}, action.payload.lang, { $set: action.payload.messages }),
        randomKey: { $set: Math.random() }
    });

    if (state.nextLanguage === action.payload.lang && state.currentLanguage !== state.nextLanguage) {
        // update current language according to next language if it was the desire to load for
        // active language (which we define as such)

        result = (0, _reactAddonsUpdate2.default)(result, {
            currentLanguage: { $set: action.payload.lang }
        });
    }

    return result;
}), _IntlConstants$SET_LA);