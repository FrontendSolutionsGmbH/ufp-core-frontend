/**
 * warning: thesee are ufp-projectr scripts to be executed in project context, not
 * used for any ufp-core processes
 */
const fs = require('fs')
const path = require('path')
const UFP = require('./build/lib/ufp')

const logger = require('./build/lib/Logger2')('update-package-json')

logger.info('Updating package.json from ufp-core refs')

// const packageSrcPath = __dirname + '/../node_modules/ufp-core/package.json'
// const packageDesPath = __dirname + '/../package.json'

const packageDes = path.join(process.cwd(), '/package.json')
const packageSrc = path.join(__dirname, '/../package.json')

logger.info('Updating Package Dependencies from ufp-core')
logger.info('core package.json is located at ')
logger.info(packageSrc)
logger.info('dest package.json is located at ')
logger.info(packageDes)

fs.readFile(packageSrc, 'utf8', function (err, data) {
    if (err) {
        return logger.error(err)
    }
    // console.log(data);
    //
    // console.log(JSON.parse(data))
    const JSONSrc = JSON.parse(data)

    fs.readFile(packageDes, 'utf8', function (errDest, dataDest) {
        if (errDest) {
            logger.error(errDest)
        }
        logger.debug(dataDest)
        logger.debug(data)
        //
        // console.log(JSON.parse(dataDest))
        const JSONDest = JSON.parse(dataDest)

        // loop over all src dependencies
        JSONDest.scripts = UFP.defaultMerge(
            JSONDest.scripts,
            UFP.filterObjectKeys(JSONSrc.scripts, 'ufp-')
        )

        UFP.writeFileWithBackup(packageDes, JSON.stringify(JSONDest, null, 2), 'scripts')
    })
})
