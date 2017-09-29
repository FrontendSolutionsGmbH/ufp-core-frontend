'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;
function get(object, keys, defaultVal) {
  keys = Array.isArray(keys) ? keys : keys.split('.');
  object = object[keys[0]];
  if (object && keys.length > 1) {
    return get(object, keys.slice(1), defaultVal);
  }
  return object === undefined ? defaultVal : object;
}

function set(object, keys, val) {
  keys = Array.isArray(keys) ? keys : keys.split('.');
  if (keys.length > 1) {
    object[keys[0]] = object[keys[0]] || {};
    return set(object[keys[0]], keys.slice(1), val);
  }
  object[keys[0]] = val;
}

exports.default = {
  get: get,
  set: set
};