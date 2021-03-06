/**
 * warning: thesee are ufp-projectr scripts to be executed in project context, not
 * used for any ufp-core processes
 */
const fs = require('fs')
const path = require('path')
const UFP = require('./build/lib/ufp')

const logger = require('./build/lib/Logger2')('update-dependencies')

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
        // console.log(dataDest);
        //
        // console.log(JSON.parse(dataDest))
        const JSONDest = JSON.parse(dataDest)

        /**
         we use devDependencies to inject our ufp deps
         */
        JSONDest.dependencies = UFP.defaultMerge(
            JSONDest.dependencies,
            JSONDest.devDependencies
        )

        Object.keys(JSONSrc.dependencies)
              .map((key) => {
                  // we have to remove it from 'normal' dependencies since ours overrides it completely
                  if (JSONDest.dependencies[key]) {
                      logger.warn('REMOVE project dependency', key, JSONSrc.dependencies[key])
                      delete JSONDest.dependencies[key]
                  }
              })

        // then add src dependencies
        JSONDest.devDependencies = UFP.defaultMerge(
            JSONDest.devDependencies,
            JSONSrc.dependencies
        )

        UFP.writeFileWithBackup(packageDes, JSON.stringify(JSONDest, null, 2), 'dependencies')
    })
})
