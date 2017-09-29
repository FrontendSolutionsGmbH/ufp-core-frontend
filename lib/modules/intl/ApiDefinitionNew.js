'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UfpMiddlewareConstants = require('../../middleware/UfpMiddlewareConstants');

var _UfpMiddlewareConstants2 = _interopRequireDefault(_UfpMiddlewareConstants);

var _ReduxUtils = require('../../utils/ReduxUtils');

var _ReduxUtils2 = _interopRequireDefault(_ReduxUtils);

var _StringUtils = require('../../utils/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApiDefinition = {

    getUfpLangFile: {
        url: '{api}api/Language/{tag}/{lang}',
        method: _UfpMiddlewareConstants2.default.RequestMethodConstants.GET,
        requestType: 'JSON'
    },
    getLocalLangFile: {
        url: '{local}lang/{lang}.json',
        method: _UfpMiddlewareConstants2.default.RequestMethodConstants.GET,
        requestType: 'JSON'
    }

    // before returning enrich the apidefinition with default action handlers
};var ApiDefinitionNew = {};
for (var i in ApiDefinition) {
    ApiDefinitionNew[i] = Object.assign({ actionConstants: _ReduxUtils2.default.createAsyncResponseActionNames(_StringUtils2.default.camelCaseToConstant(i)) }, ApiDefinition[i]);
}
// // console.log('Enriched Api Definition: ', ApiDefinitionEnriched)
exports.default = ApiDefinitionNew;