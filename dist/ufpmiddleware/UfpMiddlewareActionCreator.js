'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _UfpRequestActions = require('./UfpRequestActions');

var _UfpRequestActions2 = _interopRequireDefault(_UfpRequestActions);

var createActionCreatorForDefinition = function createActionCreatorForDefinition(definition) {
    var ufpPrehandler = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var ufpResultHandler = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
    return function () {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {
            urlParams: {},
            queryParams: {},
            body: undefined,
            ufpPayload: {}
        } : arguments[0];

        var _ref$urlParams = _ref.urlParams;
        var urlParams = _ref$urlParams === undefined ? {} : _ref$urlParams;
        var _ref$queryParams = _ref.queryParams;
        var queryParams = _ref$queryParams === undefined ? {} : _ref$queryParams;
        var _ref$body = _ref.body;
        var body = _ref$body === undefined ? undefined : _ref$body;
        var _ref$ufpPayload = _ref.ufpPayload;
        var ufpPayload = _ref$ufpPayload === undefined ? {} : _ref$ufpPayload;

        // console.log('Executing automaticly generated action from definition ', UFPRequestActions, definition)
        var result = _defineProperty({}, _UfpRequestActions2['default'].UFP_REQUEST_ACTION, {
            ufpDefinition: definition,
            ufpData: {
                urlParams: urlParams,
                queryParams: queryParams,
                body: body
            },
            ufpPayload: ufpPayload,
            ufpPreHandler: ufpPrehandler,
            ufpResultHandler: ufpResultHandler
        });
        // console.log('Executing automaticl result is ', result)
        return result;
    };
};

exports['default'] = {
    createActionCreatorForDefinition: createActionCreatorForDefinition
};
module.exports = exports['default'];