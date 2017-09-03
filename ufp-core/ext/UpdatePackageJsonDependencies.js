const fs = require('fs')
const path = require('path')
const UFP = require('./build/lib/ufp')

const logger = require('./build/lib/logger')

logger.info('Updating package.json from ufp-core refs')

// const packageSrc = __dirname + '/../node_modules/ufp-core/package.json'
// const packageDes = __dirname + '/../package.json'

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

        // loop over all src dependencies
        JSONDest.scripts = UFP.defaultMerge(
            JSONDest.scripts,
            UFP.filterObjectKeys(JSONSrc.scripts, 'ufp-')
        )

        /**
         we use devDependencies to inject our ufp deps
         */
        JSONDest.dependencies = UFP.defaultMerge(
            JSONDest.dependencies,
            JSONDest.devDependencies
        )

        Object.keys(JSONSrc.dependencies).map((key) => {

            // we have to remove it from 'normal' dependencies since ours overrides it completely
            if (JSONDest.dependencies[key]) {

                logger.warn('REMOVE project dependency', key, JSONSrc.dependencies[key])
                delete JSONDest.dependencies [key]
            }

        })

        // then add src dependencies
        JSONDest.devDependencies = UFP.defaultMerge(
            JSONDest.devDependencies,
            JSONSrc.dependencies
        )

        // save json then as if nothing happened
        fs.writeFile(packageDes, JSON.stringify(JSONDest, null, 4), (err) => {
            if (err) {
                return logger.error(err)
            }

            logger.log('package.json updated')
            logger.log(packageDes)
        })
    })
})
