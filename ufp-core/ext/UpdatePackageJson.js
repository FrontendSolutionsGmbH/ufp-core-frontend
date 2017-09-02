var fs = require('fs');

const logger = require('./build/lib/logger')

logger.info('Updating package.json from ufp-core refs')

// const packageSrc = __dirname + '/../node_modules/ufp-core/package.json'
// const packageDes = __dirname + '/../package.json'

const packageDes = process.cwd() + '/package.json'
const packageSrc = __dirname + '/../package.json'

logger.info('Updating Package Dependencies from ufp-core')
logger.info('core package.json is located at ', packageSrc)
logger.info('dest package.json is located at ', packageDes)

fs.readFile(packageSrc, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    // console.log(data);
    //
    // console.log(JSON.parse(data))
    const JSONSrc = JSON.parse(data)

    fs.readFile(packageDes, 'utf8', function (errDest, dataDest) {
        if (errDest) {
            return console.log(errDest);
        }
        // console.log(dataDest);
        //
        // console.log(JSON.parse(dataDest))
        const JSONDest = JSON.parse(dataDest)


        // loop over all src dependencies

        Object.keys(JSONSrc.dependencies).map((key) => {

            if (JSONDest.dependencies[key]) {
                // ezxisting key only change if new value
                if (JSONDest.dependencies[key] !== JSONSrc.dependencies[key]) {

                    logger.info("UPDATE ", key, JSONDest.dependencies[key], '==>', JSONSrc.dependencies[key]);
                    JSONDest.dependencies[key] = JSONSrc.dependencies[key]
                }
            } else {
                logger.info("NEW ", key, JSONDest.dependencies[key], '==>', JSONSrc.dependencies[key]);
                JSONDest.dependencies[key] = JSONSrc.dependencies[key]

            }

        })

        // save json then as if nothing happened
        fs.writeFile(packageDes + '.generated', JSON.stringify(JSONDest, null, 4), function (err) {
            if (err) {
                return console.log(err);
            }

            logger.log("package.json updated");
            logger.log(packageDes);
        });

    });

});
