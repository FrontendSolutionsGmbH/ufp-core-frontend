'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testErrorRequest = exports.getPetById = exports.getGlobals = undefined;

var _ApiDefinition = require('api/ApiDefinition');

var _ApiDefinition2 = _interopRequireDefault(_ApiDefinition);

var _ufpCore = require('ufp-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getGlobals = exports.getGlobals = function getGlobals() {
  return _ufpCore.UFPMiddleware.createActionCreatorForDefinition(_ApiDefinition2.default.getGlobals)({ queryParams: { test: 'test' } });
};

var getPetById = exports.getPetById = function getPetById(petId) {
  return _ufpCore.UFPMiddleware.createActionCreatorForDefinition(_ApiDefinition2.default.getPetById)({ urlParams: { petId: petId } });
};

var testErrorRequest = exports.testErrorRequest = function testErrorRequest() {
  return _ufpCore.UFPMiddleware.createActionCreatorForDefinition(_ApiDefinition2.default.testErrorRequest)();
};

exports.default = {
  getGlobals: getGlobals,
  getPetById: getPetById,
  testErrorRequest: testErrorRequest
};