'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var UFPMiddlewareConfigurationX = {
    resultHandlings: {
        genericResultHandler: [],
        unhandledResultHandler: []
    },
    preRequestHandling: [],
    createConfig: undefined
};

var register = function register(array) {
    return function (handlers) {
        if (Array.isArray(handlers)) {
            handlers.map(function (handler) {
                array.push(handler);
            });
        } else {
            array.push(handlers);
        }
    };
};

var setCreateConfig = function setCreateConfig(createConfig) {
    UFPMiddlewareConfigurationX.createConfig = createConfig;
};

var traverseDefinition = function traverseDefinition(obj, callback, path) {
    // // console.log('traversinng ', obj, path)
    path = path || [];
    if (typeof obj === 'object' && obj.url === undefined) {
        Object.keys(obj).forEach(function (key) {
            var value = obj[key];
            traverseDefinition(value, callback, path.concat(key));
        });
    } else {
        callback.call(obj, path, obj);
    }
};

var registerResultHandler = register(UFPMiddlewareConfigurationX.resultHandlings.genericResultHandler);
var registerPreHandler = register(UFPMiddlewareConfigurationX.preRequestHandling);
var registerUnhandledHandler = register(UFPMiddlewareConfigurationX.resultHandlings.unhandledResultHandler);
//UFPMiddlewareConfigurationX.resultHandlings.unhandledResultHandler.push(UFPResponseHandler)

exports['default'] = {
    get: function get() {
        return UFPMiddlewareConfigurationX;
    },
    registerResultHandler: registerResultHandler,
    registerPreHandler: registerPreHandler,
    registerUnhandledHandler: registerUnhandledHandler,
    traverseDefinition: traverseDefinition,
    setCreateConfig: setCreateConfig
};
module.exports = exports['default'];