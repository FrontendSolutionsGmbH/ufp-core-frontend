'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _UfpRequestActions = require('./UfpRequestActions');

var _UfpRequestActions2 = _interopRequireDefault(_UfpRequestActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createActionCreatorForDefinition = function createActionCreatorForDefinition(definition) {
    var ufpPrehandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var ufpResultHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            urlParams: {},
            queryParams: {},
            body: undefined,
            ufpPayload: {}
        },
            _ref$urlParams = _ref.urlParams,
            urlParams = _ref$urlParams === undefined ? {} : _ref$urlParams,
            _ref$queryParams = _ref.queryParams,
            queryParams = _ref$queryParams === undefined ? {} : _ref$queryParams,
            _ref$body = _ref.body,
            body = _ref$body === undefined ? undefined : _ref$body,
            _ref$ufpPayload = _ref.ufpPayload,
            ufpPayload = _ref$ufpPayload === undefined ? {} : _ref$ufpPayload;

        console.log('Executing automaticly generated action from definition ', _UfpRequestActions2.default, definition);
        var result = (0, _defineProperty3.default)({}, _UfpRequestActions2.default.UFP_REQUEST_ACTION, {
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
        console.log('Executing automaticl result is ', result);
        return result;
    };
};

exports.default = {
    createActionCreatorForDefinition: createActionCreatorForDefinition
};