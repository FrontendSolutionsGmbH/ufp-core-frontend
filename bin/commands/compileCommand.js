const child_process = require('child_process')
const package = require('../../package.json')
const logger = require('../../ext/build/lib/Logger2')('ufp-start')

// my-module.js
exports.command = ['c', 'compile']

exports.describe = 'compile to dist'

exports.builder = {}

exports.handler = function (argv) {
    // do something with argv.

    logger.info('starting development server ')
    child_process.execSync(`node ${__dirname}/../../ext/build/scripts/compile.js`, {
        cwd: process.cwd(),
        stdio: 'inherit'
    })

}
