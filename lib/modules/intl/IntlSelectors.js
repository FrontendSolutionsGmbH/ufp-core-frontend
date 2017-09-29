'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LanguagesSelector = exports.CurrentLanguageMessagesSelector = exports.AllMessagesSelector = exports.randomIntlKey = exports.CurrentLanguageSelector = exports.IntlSelector = undefined;

var _IntlConstants = require('./IntlConstants');

var _IntlConstants2 = _interopRequireDefault(_IntlConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IntlSelector = exports.IntlSelector = function IntlSelector(state) {
    return state[_IntlConstants2.default.NAME];
};
var CurrentLanguageSelector = exports.CurrentLanguageSelector = function CurrentLanguageSelector(state) {
    return IntlSelector(state) && IntlSelector(state).currentLanguage || 'en';
};
var randomIntlKey = exports.randomIntlKey = function randomIntlKey(state) {
    return IntlSelector(state) && IntlSelector(state).randomKey || 0;
};
var AllMessagesSelector = exports.AllMessagesSelector = function AllMessagesSelector(state) {
    return IntlSelector(state) && IntlSelector(state).allMessages || {};
};

var CurrentLanguageMessagesSelector = exports.CurrentLanguageMessagesSelector = function CurrentLanguageMessagesSelector(state) {
    return AllMessagesSelector(state) && AllMessagesSelector(state)[CurrentLanguageSelector(state)] || {};
};
var LanguagesSelector = exports.LanguagesSelector = function LanguagesSelector(state) {
    return IntlSelector(state) && IntlSelector(state).languages || [];
};

exports.default = {
    CurrentLanguageSelector: CurrentLanguageSelector,
    LanguagesSelector: LanguagesSelector,
    AllMessagesSelector: AllMessagesSelector,
    CurrentLanguageMessagesSelector: CurrentLanguageMessagesSelector,
    randomIntlKey: randomIntlKey

};