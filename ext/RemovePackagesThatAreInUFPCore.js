/**
 * warning: thesee are ufp-projectr scripts to be executed in project context, not
 * used for any ufp-core processes
 */
// const fs = require('fs')
const path = require('path')
const UFP = require('./build/lib/ufp')

/**
 * hmm, this is a vast utility convenience class, to clean out packages that already ship with ufp-core
 * iterating over the package.json of project, and compares it with ufp.core package
 */

const logger = require('./build/lib/Logger2')('update-package-json')

logger.info('Updating package.json from ufp-core refs')

// const packageSrcPath = __dirname + '/../node_modules/ufp-core/package.json'
// const packageDesPath = __dirname + '/../package.json'

const packageDesPath = path.join(process.cwd(), '/package.json')
const packageSrcPath = path.join(__dirname, '/../package.json')
const packageSrc = require(packageSrcPath)
const packageDes = require(packageDesPath)

logger.info('Updating Package Dependencies from ufp-core')
logger.info('core package.json is located at ')
logger.info(packageSrcPath)
logger.info('dest package.json is located at ')
logger.info(packageDesPath)
logger.info('dest ', packageDes.name)
logger.info('src', packageSrc.name)

logger.debug(packageDes)
logger.debug(packageSrc)
//
// console.log(JSON.parse(dataDest))

const getcleaned = (packages, packagesProof) => {
    var result = {}
    Object.keys(packages).forEach((packageName) => {
        if (packagesProof[packageName]) {
            // it exists in check array, dont put it in result
        } else {
            // does not exist in check list, keep
            result[packageName] = packages[packageName]
        }
    })
    return result
}

// loop over all src dependencies
packageDes.scripts = UFP.defaultMerge(
    packageDes.scripts,
    UFP.filterObjectKeys(packageSrc.scripts, 'ufp-')
)

packageDes.dependencies = getcleaned(packageDes.dependencies, Object.assign(packageSrc.dependencies, packageSrc.devDependencies))

UFP.writeFileWithBackup(packageDesPath, JSON.stringify(packageDes, null, 2), 'scripts')
