'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isArray = isArray;
exports.isObject = isObject;
exports.isDate = isDate;
function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
    return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
    return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
    return toString.call(val) === '[object Date]';
}

/**
 * serialize queryParams like Axios
 *
 * @param {Object} val The value to test
 *
 */
function queryParams(params) {
    var parts = [];
    Object.keys(params).map(function (k) {
        var value = params[k];
        var key = k;
        if (value === null || typeof value === 'undefined') {
            return;
        }
        if (isArray(value)) {
            key = key + '[]';
        } else {
            value = [value];
        }
        value.map(function (v) {
            if (isDate(v)) {
                v = v.toISOString();
            } else if (isObject(v)) {
                v = JSON.stringify(v);
            }
            parts.push(encode(key) + '=' + encode(v));
        });
    });
    return parts.join('&');
}

exports.default = queryParams;