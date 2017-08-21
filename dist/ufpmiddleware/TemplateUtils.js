'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function urlParamsToUrl(templateUrl, urlParams) {
    var toPath = _pathToRegexp2.default.compile(templateUrl);
    return toPath(urlParams);
}
function namedRegexMatch(text, regex, matchNames) {
    var matches = regex.exec(text);
    return matches.reduce(function (result, match, index) {
        if (index > 0) result[matchNames[index - 1]] = match;
        return result;
    }, {});
}
function urlToUrlParams(templateUrl, testUrl) {
    var keys = [];
    var re = (0, _pathToRegexp2.default)(templateUrl, keys);
    var names = keys.map(function (key) {
        return key.name;
    });
    return namedRegexMatch(testUrl, re, names);
}

exports.default = {
    urlParamsToUrl: urlParamsToUrl,
    urlToUrlParams: urlToUrlParams
};