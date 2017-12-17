const logger = require('../../ext/build/lib/Logger2')('ufp-existance')
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

        if ((className == 'index')  ) {
            let testFile = `
                import ${className} from '${helper}'

                describe('Class ${className}', () => {
                    it('Should Exist', () => {
                        expect(${className}).to.exist
                    })
                })
`
            return testFile
        }else if (  (className !== 'main')) {
            let testFile = `
                import ${className} from '${helper}'

                describe('Class ${className}', () => {
                    it('Should Exist', () => {
                       
                    })
                })
`
            return testFile
        } else {
            let testFile = `
                import ${className} from '${helper}'

                describe('Class ${className}', () => {
                    it('Should Exist', () => {
                      
                    })
                })
`
            return testFile

        }

        //  logger.info(testFile)

    }
}
