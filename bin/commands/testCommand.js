const child_process = require('child_process')
const package = require('../../package.json')
const logger = require('../Logger2')('ufp-start')

// my-module.js
exports.command = ['t', 'test']

exports.describe = 'execute the unit tests'

exports.builder = {}

exports.handler = function (argv) {
    // do something with argv.

    logger.info('executing unit tests ')
    child_process.execSync(package.scripts['ufp-test'], {
        cwd: process.cwd(),
        stdio: 'inherit'
    })

}
