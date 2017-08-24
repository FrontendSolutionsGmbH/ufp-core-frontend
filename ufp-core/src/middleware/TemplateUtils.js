// @DEPRECATED severe deprecation path extration has to be done without external dep
// import pathToRegexp from 'path-to-regexp'
import JsUtils from '../utils/JsUtils'

// function urlParamsToUrl(templateUrl, urlParams) {
//     var toPath = pathToRegexp.compile(templateUrl)
//     return toPath(urlParams)
// }
//
// function namedRegexMatch(text, regex, matchNames) {
//     var matches = regex.exec(text)
//     return matches.reduce(function (result, match, index) {
//         if (index > 0) {
//             result[matchNames[index - 1]] = match
//         }
//         return result
//     }, {})
// }
//
// function urlToUrlParams(templateUrl, testUrl) {
//     var keys = []
//     var re = pathToRegexp(templateUrl, keys)
//     var names = keys.map((key) => key.name)
//     return namedRegexMatch(
//         testUrl,
//         re,
//         names
//     )
// }

export default {
    urlParamsToUrl: JsUtils.ThrowParam('Deprecated urlParamsToUrl() due to external dependency '),
    urlToUrlParams: JsUtils.ThrowParam('Deprecated urlToUrlParams() due to external dependency ')
}
