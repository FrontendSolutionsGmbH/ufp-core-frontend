const logger = require("../ext/build/lib/Logger2")('create-tests')
const path = require("path")
const glob = require("glob")
const fs = require("fs")

const JSUtils = require("../ext/build/lib/JSUtils")
const srcDir = 'src'
const testsSrc = 'tests/existance/'

const processors = []

processors.push(require("./creator/existance").default)

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
const exec = () => {
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

                            console.log(`The Test file ${testFilename} has been created !`);
                        });
                    } else {
                        logger.info('index.js files ignored for now...')

                    }

                    //  logger.info(testFile)

                }
            })

        })
}

const createTests =
    {

        execute: ({
            srcDir = JSUtils.ThrowParam('srcDir has to be set'),
            targetDir = JSUtils.ThrowParam('targetDir has to be set')
        }=JSUtils.ThrowParam('execute() needs to be called with parameter object')) => {

// options is optional
            glob(srcDir + "/**/*.js*", {
                    cwd: process.cwd(),
                    root: path.join(process.cwd(), srcDir),

                }
                , function (error, files) {
                    if (error === null) {
                        // no error, fine
                        files.map((fileName) => {
                            // iterate the files
                            processors.map((processor) => {
                                // and forward to processors
                                console.log('Processor is ', processor)
                                const processorResult = processor.process({
                                    fileName: fileName.replace(srcDir + '/', '')
                                })

                                /**
                                 * each processor defines a 'name' property which is used
                                 * to create the target destination
                                 */

                                const testFilename = path.resolve(targetDir, processor.name, fileName.replace('.js', '.spec.js'))
                                logger.info('ccc file ', testFilename)

                                if (processorResult !== null) {
                                    mkdirp(testFilename)
                                    fs.writeFile(testFilename, processorResult, function (err) {
                                        if (err) {
                                            return console.log(err);
                                        }

                                        console.log(`The Test file 
${testFilename}
 has been created !`);
                                    });

                                }

                            })

                        })
                    } else {
                        throw(error)
                    }
                }
            )
        },
        makeDirectoryRecursive: mkdirp
    }

createTests.execute({
    srcDir: srcDir,
    targetDir: 'tests'
})