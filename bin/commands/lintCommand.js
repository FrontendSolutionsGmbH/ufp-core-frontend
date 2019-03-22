const child_process = require('child_process')
const package = require('../../package.json')
const logger = require('../Logger2')('ufp-start')

// my-module.js
exports.command = ['l', 'lint']

exports.describe = 'lint fix'

exports.builder = {}

exports.handler = function (argv) {
    // do something with argv.

    logger.info('starting development server ')
    child_process.execSync(package.scripts['ufp-lint:fix'], {
        cwd: process.cwd(),
        stdio: 'inherit'
    })

}
