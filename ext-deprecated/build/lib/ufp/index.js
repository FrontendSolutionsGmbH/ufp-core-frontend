var fs = require('fs')

const logger = require('../Logger2')('ufp-utils')

/**
 * this utility checks if a file exists, if yes return content of the file
 * otherwise return defaultPath contents
 * @param path
 * @param defaultPath
 */
exports.chooseExistingPath = (path, defaultPath) => {
    if (fs.existsSync(path)) {
        return path
    } else {
        return defaultPath
    }
}
exports.requireDefault = (path, defaultPath) => {
    return require(exports.chooseExistingPath(path, defaultPath))
}

exports.filterObjectKeys = (object, regex) => {
    const result = {}
    const re = new RegExp(regex)
    Object.keys(object)
          .map((key) => {
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
    Object.keys(targetValue)
          .map((key) => {
              result[key] = targetValue[key]
          })

    /**
     * then all new or changed properties become replaced with default
     */
    Object.keys(defaultValue)
          .map((key) => {
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

exports.writeFileWithBackup = (destFilename, content, prefix = 'default') => {
    logger.info('Writing into file ')
    logger.info(destFilename)

    const backupFilename = destFilename + '.' + prefix + '.backup'

    if (fs.existsSync(destFilename)) {
        logger.info('File is existing, check for backup... ')

        if (fs.existsSync(backupFilename)) {
            logger.info('Backup file exists for target ')
            logger.info(destFilename)
        } else {
            logger.info('No Backup file for target exists, create one ')
            logger.info(backupFilename)

            fs.writeFileSync(backupFilename, fs.readFileSync(destFilename))
        }
    }

    // save json then as if nothing happened
    fs.writeFile(destFilename, content, (err) => {
        if (err) {
            return logger.error(err)
        }

        logger.log(destFilename + ' updated')
    })
}
