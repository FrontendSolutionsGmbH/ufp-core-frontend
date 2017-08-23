'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = undefined;

var _Logger = require('../logger/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _Logger2.default.factorLogger('StoreConfig');

var storeConfig = {
  reducersRegistered: []
};

var registerReducer = function registerReducer(reducer) {

  logger.log('UFP Store Configt');

  storeConfig.reducersRegistered.push(reducer);
};

/**
 * the getconfig is exported as package private variable accessible
 * @returns {{reducersRegistered: Array}}
 */
var getConfig = exports.getConfig = function getConfig() {
  return storeConfig;
};

exports.default = {
  registerReducer: registerReducer
};