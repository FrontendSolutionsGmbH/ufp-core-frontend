'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ReduxUtils = require('../../utils/ReduxUtils');

var _ReduxUtils2 = _interopRequireDefault(_ReduxUtils);

var _IntlConstants = require('./IntlConstants');

var _IntlConstants2 = _interopRequireDefault(_IntlConstants);

var _IntlActionCreators = require('./IntlActionCreators');

var _IntlActionCreators2 = _interopRequireDefault(_IntlActionCreators);

var _IntlActionHandlers = require('./IntlActionHandlers');

var _IntlActionHandlers2 = _interopRequireDefault(_IntlActionHandlers);

var _StartupConfiguration = require('../startup/StartupConfiguration');

var _StartupConfiguration2 = _interopRequireDefault(_StartupConfiguration);

var _StorageReal = require('../../utils/storage/StorageReal');

var _StorageReal2 = _interopRequireDefault(_StorageReal);

var _IntlConfig = require('./IntlConfig');

var _IntlConfig2 = _interopRequireDefault(_IntlConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_StartupConfiguration2.default.registerStagedResource({
    stage: '1',
    name: 'initSetLanguage',
    actionCreator: _IntlActionCreators2.default.initSetLanguage,
    actionNameSuccess: _IntlConstants2.default.UPDATE_MESSAGES
    //    actionNameFail: IntlConstants.SET_INIT_LANGUAGE.FAIL
});

var initialState = {
    currentLanguage: _StorageReal2.default.getItem(_IntlConstants2.default.STORAGE_KEY, 'en'),
    randomKey: Math.random(),
    nextLanguage: null,
    locales: _IntlConfig2.default.getLocales(),
    allMessages: {
        en: {},
        de: {}
    },
    languages: _IntlConfig2.default.getLanguages()
};

exports.default = _ReduxUtils2.default.createReducer(initialState, _IntlActionHandlers2.default);