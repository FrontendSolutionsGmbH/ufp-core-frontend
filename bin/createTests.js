var logger = require("../build/scripts/logger")
var path = require("path")
var glob = require("glob")
var fs = require("fs")

const srcDir = 'src'
const testsSrc = 'tests/existance/'
function mkdirp(filepath) {
    var dirname = path.dirname(filepath);
    console.log('Dirname is ', filepath)
    console.log('Dirname is ', dirname)

    if (!fs.existsSync(dirname)) {
        mkdirp(dirname);
    }

    console.log('filepath is ', filepath)
    try {
        fs.mkdirSync(dirname);
    } catch (e) {
        logger.error(e)
    }
}

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
                logger.info('Test already existing')
            } else {

                logger.info('Creating new test-spec.js')
                // clean up path brutally by replacing stuff
                let helper = file.replace('src/', '')
                helper = helper.replace('.jsx', '')
                helper = helper.replace('.js', '')
                const helperparts = helper.split('/')
                const className = helperparts[helperparts.length - 1]
                const testFile = `
                import ${className} from '${helper}'

                describe('Class ${className}', () => {
                    it('Should Exist', () => {
                        expect(${className}).to.exist
                    })
                })`
                mkdirp(testFilename)
                if (className !== 'index') {
                    fs.writeFile(testFilename, testFile, function (err) {
                        if (err) {
                            return console.log(err);
                        }

                        console.log(`The Test file ${testFilename}has been created !`);
                    });
                } else {
                    logger.info('index.js files ignored for now...')

                }

                //  logger.info(testFile)

            }
        })

    })