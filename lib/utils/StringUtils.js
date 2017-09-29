'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var replaceTemplateVar = function replaceTemplateVar(str, vars) {
    console.log('Replacing Template String', str, vars);

    var result = str;

    Object.keys(vars).map(function (key) {
        result = result.replace(':' + key, vars[key]);
        result = result.replace('$' + key, vars[key]);
        result = result.replace('{' + key + '}', vars[key]);
    });

    console.log('Template String result', result);
    return result;
};

var isCharacterUppercase = function isCharacterUppercase(character) {
    return character === character.toUpperCase();
};
/*
 helper method for generation of constant names

 it splits up a string on every big letter, putting the string together with uppercases and "_" in between the word
 */

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
    var result = '';
    for (var i in parts) {
        result += parts[i];
        result += '_';
    }
    result = result.substring(0, result.length - 1);
    // // console.log('Camel Case to Constante ', input, result)
    return result;
};

exports.default = {
    replaceTemplateVar: replaceTemplateVar,
    camelCaseToConstant: camelCaseToConstant
};