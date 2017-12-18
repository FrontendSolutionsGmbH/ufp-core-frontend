// my-module.js
const package = require('../../package.json')
const child_process = require('child_process')
const logger = require('../../ext/build/lib/Logger2')('ufp-tests')
exports.command = ['ct', 'createTests']

exports.describe = 'create predefined test cases e.g. existance'

exports.builder = {}

exports.handler = function (argv) {
    // do something with argv.
    logger.info('creating predefined tests ')
    child_process.execSync(package.scripts['ufp-util:createTests'], {
        cwd: process.cwd(),
        stdio: 'inherit'
    })
}
