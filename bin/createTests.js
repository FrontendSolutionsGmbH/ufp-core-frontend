var logger = require("../build/scripts/logger")
var path = require("path")
var glob = require("glob")
var fs = require("fs")

const srcDir = 'src'
const testsSrc = 'tests'

// options is optional
glob(srcDir + "/**/*.js*", {
        cwd: process.cwd(),
        root: path.join(process.cwd(), srcDir),

    }
    ,
    function (er, files) {
        console.log(er, files)
        // files is an array of filenames.
        // If the `nonull` option is set, and nothing
        // was found, then files is ["**/*.js"]
        // er is an error object or null.

        files.map((file) => {

            logger.info('Checking file ', file)

            const testFilename = path.resolve(testsSrc, file.replace('.js', '.spec.js'))
            logger.info('ccc file ', testFilename)

            if (fs.existsSync(testFilename)) {
                logger.info('TEST ALREADY EXISING')

            }
        })

    })