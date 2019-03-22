// my-module.js
exports.command = ['$0']
const logger = require('../Logger2')('ufp-default')
const package = require('../../package.json')
exports.describe = 'default ufp command'

exports.builder = {}

exports.handler = function (argv) {
    // do something with argv.
    logger.mark('UfpCore ', package.version)
    logger.mark(package.description)
    logger.mark('')
    logger.mark('For now use the following commands for init')
    logger.mark('Install ')
    logger.mark(package.scripts['ufp-install'])
    logger.mark('Update ')
    logger.mark(package.scripts['ufp-update'])
    logger.mark('for more cli options type')
    logger.mark('ufp --help ')
}

