var fs = require('fs')

const logger = require('../logger')

/**
 * this utility checks if a file exists, if yes return content of the file
 * otherwise return defaultPath contents
 * @param path
 * @param defaultPath
 */
exports.requireDefault = (path, defaultPath) => {
    if (fs.existsSync(path)) {
        return require(path)
    } else {
        return require(defaultPath)
    }
}

exports.filterObjectKeys = (object, regex) => {
    const result = {}
    const re = new RegExp(regex)
    Object.keys(object).map((key) => {
        if (re.test(key)) {
            result[key] = object[key]
        }
    })

    return result
}

exports.defaultMerge = (targetValue, defaultValue) => {

    if (!targetValue) {
        targetValue = {}
    }
    if (!defaultValue) {
        defaultValue = {}
    }

    const result = {}
    // first transfer all incoming target values to result
    Object.keys(targetValue).map((key) => {
        result[key] = targetValue[key]
    })

    /**
     * then all new or changed properties become replaced with default
     */
    Object.keys(defaultValue).map((key) => {
        if (result[key]) {
            // ezxisting key only change if new value
            if (result[key] !== defaultValue[key]) {
                logger.info('UPDATE ', key, result[key], '==>', defaultValue[key])
                result[key] = defaultValue[key]
            }
        } else {
            logger.info('NEW ', key, '==', defaultValue[key])
            result[key] = defaultValue[key]
        }
    })

    return result
}
