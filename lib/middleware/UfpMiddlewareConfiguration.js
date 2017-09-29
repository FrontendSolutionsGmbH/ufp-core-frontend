'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UfpMiddlewareUtils = require('./UfpMiddlewareUtils');

var _UfpMiddlewareUtils2 = _interopRequireDefault(_UfpMiddlewareUtils);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UFPMiddlewareConfigurationX = {
  resultHandlings: {
    genericResultHandler: [],
    unhandledResultHandler: []
  },
  preRequestHandling: [],
  createConfig: undefined
};

var UFPHandlerPropTypeDefinition = _propTypes2.default.shape({
  matcher: _propTypes2.default.func.isRequired,
  handler: _propTypes2.default.func.isRequired
});

var UFPHandlerPropTypeDefinitionArray = {
  input: _propTypes2.default.arrayOf(UFPHandlerPropTypeDefinition).isRequired
};
var UFPHandlerPropTypeDefinitionObject = {
  input: UFPHandlerPropTypeDefinition.isRequired
};

var register = function register(array) {
  return function (handlers) {
    if (Array.isArray(handlers)) {
      if (_UfpMiddlewareUtils2.default.PropTypesCheck({ input: handlers }, UFPHandlerPropTypeDefinitionArray)) {
        handlers.map(function (handler) {
          array.push(handler);
        });
      } else {
        throw new Error('UFP ResultHandler or Prehandler Objects need to have a matcher and handler function');
      }
    } else {
      if (_UfpMiddlewareUtils2.default.PropTypesCheck({ input: handlers }, UFPHandlerPropTypeDefinitionObject)) {
        array.push(handlers);
      } else {
        throw new Error('UFP ResultHandler or Prehandler Objects need to have a matcher and handler function');
      }
    }
  };
};

var setCreateConfig = function setCreateConfig(createConfig) {
  UFPMiddlewareConfigurationX.createConfig = createConfig;
};

var registerResultHandler = register(UFPMiddlewareConfigurationX.resultHandlings.genericResultHandler);
var registerPreHandler = register(UFPMiddlewareConfigurationX.preRequestHandling);
var registerUnhandledHandler = register(UFPMiddlewareConfigurationX.resultHandlings.unhandledResultHandler);
//UFPMiddlewareConfigurationX.resultHandlings.unhandledResultHandler.push(UFPResponseHandler)

exports.default = {
  get: function get() {
    return UFPMiddlewareConfigurationX;
  },
  registerResultHandler: registerResultHandler,
  registerPreHandler: registerPreHandler,
  registerUnhandledHandler: registerUnhandledHandler,
  setCreateConfig: setCreateConfig
};