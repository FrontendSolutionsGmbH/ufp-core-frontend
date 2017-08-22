'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flattenObject = function flattenObject(target, object) {
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    for (var i in object) {
        if (object.hasOwnProperty(i)) {
            if (object[i] !== undefined) {
                if (object[i] !== null) {
                    if (object[i] !== '') {
                        if (_typeof(object[i]) === 'object') {
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

var buildUpdateObjectSetValue = function buildUpdateObjectSetValue(path, newValue) {
    //console.log('buildUpdateObject 1 ', path, newValue)
    var elems = path.split('.');
    var current;
    elems.reverse();
    //console.log('buildUpdateObject 2 ', elems, elems.length)
    for (var i = 0; i < elems.length; i++) {
        //console.log('buildUpdateObject checking value 3', i, elems[i])
        var item = elems[i];
        if (i === 0) {
            current = _defineProperty({}, item, { $set: newValue });
        } else {
            current = _defineProperty({}, item, current);
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
var isObjectEmpty = function isObjectEmpty(obj) {
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