// my-module.js

const logger = require('../../ext/build/lib/Logger2')('ufp-tests')
exports.command = ['ct', 'createTests']

exports.describe = 'create predefined test cases e.g. existance'

exports.builder = {}

exports.handler = function (argv) {
    // do something with argv.
    logger.info('Creating tests')
}
