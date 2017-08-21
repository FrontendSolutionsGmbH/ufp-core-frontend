'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _noCase = require('no-case');

var _noCase2 = _interopRequireDefault(_noCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCharacterUppercase = function isCharacterUppercase(character) {
    return character === character.toUpperCase();
};

var camelCaseArray = function camelCaseArray(input) {
    var current = '';

    var parts = [];
    for (var i = 0, len = input.length; i < len; i++) {
        if (isCharacterUppercase(input[i])) {
            if (current !== '') {
                parts.push(current.toUpperCase());
            }
            current = input[i];
        } else {
            current += input[i];
        }
    }
    parts.push(current.toUpperCase());

    return parts;
};

var camelCaseToConstant = function camelCaseToConstant(input) {
    var parts = camelCaseArray(input);
    return parts.join('_');
};

var toSnakeCaseUpperCase = function toSnakeCaseUpperCase(value, locale) {
    return (0, _noCase2.default)(value, locale, '_').toUpperCase();
};
var toSnakeCase = function toSnakeCase(value) {
    return (0, _noCase2.default)(value, undefined, '_');
};
var toSnakeCase2 = function toSnakeCase2(value) {
    return value.replace(/\.?([A-Z]+)/g, function (x, y) {
        return '_' + y.toLowerCase();
    }).replace(/^_/, '');
};
var toSnakeCaseUpperCase2 = function toSnakeCaseUpperCase2(value) {
    return toSnakeCase2(value).toUpperCase();
};

exports.default = {
    toSnakeCase: toSnakeCase,
    toSnakeCase2: toSnakeCase2,
    toSnakeCaseUpperCase: toSnakeCaseUpperCase,
    toSnakeCaseUpperCase2: toSnakeCaseUpperCase2,
    camelCaseToConstant: camelCaseToConstant
};