const regexunused = /(\/?:.*\??\/?)/gu

/*
 helper method to replace vars identifiable by :Variable name used in route definitions
 */
const replaceRouteVariables = (path, vars) => {
    // console.log('Replacing route variables', path, vars)

    if (path === undefined) {
        return path
    }
    var result = path
    for (var i in vars) {
        var value = vars[i]
        // poor mans optional question mark
        // console.log('Replacing route variables1', i, value)
        // console.log('Replacing route variables2', result)
        const regexp = new RegExp(`:${i}\\??`, 'gu')
        // console.log('Replacing route variables3', regexp)
        result = result.replace(regexp, value)
        // console.log('Replacing route variables4', result)
    }

    // remove all optional parts that have not been touched

    var matchused = regexunused.exec(result)
    while (matchused != null) {
        // console.log(matchused)
        // console.log('Replacing found used: ', matchused)
        // console.log('Replacing found used: ', matchused)

        result = result.replace(matchused[0], '')
        matchused = regexunused.exec(result)
    }
    // console.log('Replacing route variables result is', result)
    return result
}

export default replaceRouteVariables
