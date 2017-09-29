'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _DeepGetSet = require('./DeepGetSet');

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
    if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' && obj.url === undefined) {
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
        (0, _DeepGetSet.set)(newApiDefinitionsObject, path, Object.assign({
            actionConstants: createAsyncResponseActionNames(path.join('_').toLocaleUpperCase())
        }, definition));
    });
    return newApiDefinitionsObject;
};

exports.default = {
    createActionConstantsForApiDefinitions: createActionConstantsForApiDefinitions,
    createAsyncResponseActionNames: createAsyncResponseActionNames
};