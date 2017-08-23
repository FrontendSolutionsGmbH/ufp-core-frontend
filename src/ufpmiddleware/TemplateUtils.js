import pathToRegexp from 'path-to-regexp'

function urlParamsToUrl(templateUrl, urlParams) {
  var toPath = pathToRegexp.compile(templateUrl)
  return toPath(urlParams)
}

function namedRegexMatch(text, regex, matchNames) {
  var matches = regex.exec(text)
  return matches.reduce(function (result, match, index) {
    if (index > 0) {
      result[matchNames[index - 1]] = match
    }
    return result
  }, {})
}

function urlToUrlParams(templateUrl, testUrl) {
  var keys = []
  var re = pathToRegexp(templateUrl, keys)
  var names = keys.map((key) => key.name)
  return namedRegexMatch(
    testUrl,
    re,
    names
  )
}

export default {
  urlParamsToUrl,
  urlToUrlParams
}
