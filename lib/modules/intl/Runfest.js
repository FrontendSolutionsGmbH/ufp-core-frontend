'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _JSUtils = require('../../utils/JSUtils');

var _IntlConfig = require('./IntlConfig');

var _IntlConfig2 = _interopRequireDefault(_IntlConfig);

var _IntlConstants = require('./IntlConstants');

var _IntlConstants2 = _interopRequireDefault(_IntlConstants);

var _IntlReducer = require('./IntlReducer');

var _IntlReducer2 = _interopRequireDefault(_IntlReducer);

var _IntlActionCreators = require('./IntlActionCreators');

var _IntlActionCreators2 = _interopRequireDefault(_IntlActionCreators);

var _IntlSelectors = require('./IntlSelectors');

var _IntlSelectors2 = _interopRequireDefault(_IntlSelectors);

var _react = require('../react');

var _UfpIntlProvider = require('./components/UfpIntlProvider');

var _UfpIntlProvider2 = _interopRequireDefault(_UfpIntlProvider);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onceRegistered = false;

var Runfest = {
    name: _IntlConstants2.default.NAME,
    description: 'Ufp Internationalisation Manifest',

    actionCreators: _IntlActionCreators2.default,

    selectors: _IntlSelectors2.default,

    /**
     * returns a list of the distinct parent locales
     * @private
     */

    configure: function configure(_ref) {
        var _IntlConfig$locales, _IntlConfig$languages;

        var _ref$locales = _ref.locales,
            locales = _ref$locales === undefined ? (0, _JSUtils.ThrowParam)('At least one locale should be provided') : _ref$locales,
            _ref$languages = _ref.languages,
            languages = _ref$languages === undefined ? (0, _JSUtils.ThrowParam)('At least one language should be provided') : _ref$languages;

        console.log('Registering locale', locales);

        (_IntlConfig$locales = _IntlConfig2.default.locales).push.apply(_IntlConfig$locales, (0, _toConsumableArray3.default)(locales));
        (_IntlConfig$languages = _IntlConfig2.default.languages).push.apply(_IntlConfig$languages, (0, _toConsumableArray3.default)(languages));
    },

    addLocaleData: function addLocaleData(locale) {
        /**
         * wrapper method to allow adding locales at runtime
         *
         */
        (0, _reactIntl.addLocaleData)(locale);
    },
    onRegistered: function onRegistered(_ref2) {
        var _ref2$UfpCore = _ref2.UfpCore,
            UfpCore = _ref2$UfpCore === undefined ? (0, _JSUtils.ThrowParam)('UfpCore Instance Required') : _ref2$UfpCore;

        console.log('INTL Manifest is ', this);

        if (onceRegistered) {
            (0, _JSUtils.ThrowParam)('UfpCore Already registered ');
        }

        // register provided locales (en is always present)
        _IntlConfig2.default.locales.map(function (locale) {
            (0, _reactIntl.addLocaleData)(locale);
        });

        onceRegistered = true;
        (0, _react.registerRootProvider)({ component: _UfpIntlProvider2.default });
        UfpCore.registerReducer({
            id: Runfest.name,
            reducer: _IntlReducer2.default
        });
    }
};

exports.default = Runfest;