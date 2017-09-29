'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _RouterConstants = require('./RouterConstants');

var _RouterConstants2 = _interopRequireDefault(_RouterConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routerState = function routerState(state) {
    return state[_RouterConstants2.default.name];
};
var getLocation = function getLocation(state) {
    return routerState(state)['locationBeforeTransitions'];
};
var getPathName = function getPathName(state) {
    return getLocation(state).pathname;
};
var getSearch = function getSearch(state) {
    return getLocation(state).search;
};
var getHash = function getHash(state) {
    return getLocation(state).hash;
};
var getAction = function getAction(state) {
    return getLocation(state).action;
};
var getKey = function getKey(state) {
    return getLocation(state).key;
};
var getQuery = function getQuery(state) {
    return getLocation(state).query;
};

exports.default = {
    routerState: routerState,
    getLocation: getLocation,
    getAction: getAction,
    getPathName: getPathName,
    getSearch: getSearch,
    getHash: getHash,
    getKey: getKey,
    getQuery: getQuery
};