'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var IntlConfig = {

    locales: [],
    languages: [],
    getLocales: function getLocales() {
        return IntlConfig.locales;
    },

    getLanguages: function getLanguages() {
        if (IntlConfig.languages.length === 0) {
            return ['en'];
        } else {
            return IntlConfig.languages;
        }
    }

};

exports.default = IntlConfig;