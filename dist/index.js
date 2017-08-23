'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UFPMiddleware = exports.UFPStartup = exports.UfpStoreConfig = exports.UFPUtils = exports.ConfigureEpics = undefined;

var _index = require('./ufpmiddleware/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./utils/index.js');

var _index4 = _interopRequireDefault(_index3);

var _ConfigureEpics2 = require('./epic/ConfigureEpics.js');

var _ConfigureEpics3 = _interopRequireDefault(_ConfigureEpics2);

var _index5 = require('./startup/index.js');

var _index6 = _interopRequireDefault(_index5);

var _StoreConfig = require('./store/StoreConfig');

var _StoreConfig2 = _interopRequireDefault(_StoreConfig);

var _index7 = require('./menu/index.js');

var _index8 = _interopRequireDefault(_index7);

var _main = require('./main/main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigureEpics = exports.ConfigureEpics = _ConfigureEpics3.default;
var UFPUtils = exports.UFPUtils = _index4.default;
var UfpStoreConfig = exports.UfpStoreConfig = _StoreConfig2.default;
var UFPStartup = exports.UFPStartup = _index6.default;
var UFPMiddleware = exports.UFPMiddleware = _index2.default;
// export const UFPMenu = _Menu
exports.default = {

  UFPMain: _main2.default,

  UFPMiddleware: _index2.default,
  UFPUtils: UFPUtils,
  UFPStartup: _index6.default,
  UfpStoreConfig: UfpStoreConfig,
  ConfigureEpics: ConfigureEpics,
  UFPMenu: _index8.default
};