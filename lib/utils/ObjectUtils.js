'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isObjectEmpty = exports.buildUpdateObjectSetValue = exports.flattenObject = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flattenObject = exports.flattenObject = function flattenObject(target, object) {
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    for (var i in object) {
        if (object.hasOwnProperty(i)) {
            if (object[i] !== undefined) {
                if (object[i] !== null) {
                    if (object[i] !== '') {
                        if ((0, _typeof3.default)(object[i]) === 'object') {
                            flattenObject(target, object[i], path === '' ? i : path + '.' + i);
                        } else if (Array.isArray(object[i])) {
                            // flatten array as comma separated list ?
                        } else {
                            if (Array.isArray(object)) {
                                target[path === '' ? '[' + i + ']' : path + '[' + i + ']'] = object[i];
                            } else {
                                target[path === '' ? i : path + '.' + i] = object[i];
                            }
                        }
                    }
                }
            }
        }
    }
    return target;
};

var buildUpdateObjectSetValue = exports.buildUpdateObjectSetValue = function buildUpdateObjectSetValue(path, newValue) {
    //console.log('buildUpdateObject 1 ', path, newValue)
    var elems = path.split('.');
    var current;
    elems.reverse();
    //console.log('buildUpdateObject 2 ', elems, elems.length)
    for (var i = 0; i < elems.length; i++) {
        //console.log('buildUpdateObject checking value 3', i, elems[i])
        var item = elems[i];
        if (i === 0) {
            current = (0, _defineProperty3.default)({}, item, {
                $set: newValue
            });
        } else {
            current = (0, _defineProperty3.default)({}, item, current);
        }
    }

    //console.log('buildUpdateObject returning', current)
    return current;
};

/**
 * checks of an object has at least one own property
 * @param obj
 * @returns {boolean}
 */
var isObjectEmpty = exports.isObjectEmpty = function isObjectEmpty(obj) {
    if (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
    }
    return true;
};

exports.default = {
    isObjectEmpty: isObjectEmpty,
    flattenObject: flattenObject,
    buildUpdateObjectSetValue: buildUpdateObjectSetValue
};