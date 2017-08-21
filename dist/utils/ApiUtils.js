'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _DeepGetSet = require('./DeepGetSet');

var _ChangeCaseUtils = require('./ChangeCaseUtils');

var _ChangeCaseUtils2 = _interopRequireDefault(_ChangeCaseUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * helper method to create the 3 action names request,success,fail to be used by async middleware
 * @param apiDefinitionPath the prefix for the action names
 * @returns {{REQUEST: string, SUCCESS: string, FAILURE: string, END: string}}
 */
var createAsyncResponseActionNames = function createAsyncResponseActionNames(apiDefinitionPath) {
    return {
        REQUEST: apiDefinitionPath.toUpperCase() + '_REQUEST',
        SUCCESS: apiDefinitionPath.toUpperCase() + '_SUCCESS',
        END: apiDefinitionPath.toUpperCase() + '_END',
        FAILURE: apiDefinitionPath.toUpperCase() + '_FAILURE'
    };
};
var traverseDefinition = function traverseDefinition(obj, callback, path) {
    // // console.log('traversinng ', obj, path)
    path = path || [];
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.url === undefined) {
        Object.keys(obj).forEach(function (key) {
            var value = obj[key];
            traverseDefinition(value, callback, path.concat(key));
        });
    } else {
        callback.call(obj, path, obj);
    }
};

var createActionConstantsForApiDefinitions = function createActionConstantsForApiDefinitions(ApiDefinitionsObject) {
    var newApiDefinitionsObject = {};
    traverseDefinition(ApiDefinitionsObject, function (path, definition) {
        (0, _DeepGetSet.set)(newApiDefinitionsObject, path, Object.assign({ actionConstants: createAsyncResponseActionNames(_ChangeCaseUtils2.default.toSnakeCaseUpperCase(path.join('_'))) }, definition));
    });
    return newApiDefinitionsObject;
};

exports.default = {
    createActionConstantsForApiDefinitions: createActionConstantsForApiDefinitions,
    traverseDefinition: traverseDefinition,
    createAsyncResponseActionNames: createAsyncResponseActionNames
};