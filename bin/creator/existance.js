const logger = require("../../build/scripts/logger")
const path = require("path")
const glob = require("glob")
const fs = require("fs")
const JSUtils = require("../../ext/build/lib/JSUtils")

exports.default = {

    name: 'existance',
    process: ({
        fileName = JSUtils.ThrowParam('process() fileName has to be set ')
    }=JSUtils.ThrowParam('process() has to be called with parameter object')) => {

        logger.info('Creating new test-spec.js')
        // clean up path brutally by replacing stuff
        let helper = fileName
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
                })
`
        if (className !== 'index') {

            return testFile
        } else {
            return null
            logger.info('index.js files ignored for now...')

        }

        //  logger.info(testFile)

    }
}