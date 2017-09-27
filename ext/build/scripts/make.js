const path = require('path')
const fs = require('fs')
const execSync = require('child_process').execSync
const Constants = require('./constants')
const logger = require('../lib/logger')
const validator = require('validator')
/**
 * Parameter Parsing
 */

const yargs = require('yargs')
yargs.version('1.0.0')

Object.keys(Constants.MAKE_OPTIONS)
      .map((key) => {
          yargs.option(key, Constants.MAKE_OPTIONS[key])
      })

logger.info('YARGS INPUT IS', JSON.stringify(yargs.argv))

var {
    FORCE,
    UFP_VERSION,
    UFP_API_TYPE,
    UFP_THEME,
    UFP_NODE_ENV
}=yargs.argv

const sanitizeInput = (value) => {
    logger.info('sanitizing ', value)
    var result = value
    result = validator.blacklist(value, '&|'); //=> true
    return result
}

// Perform a basic sanitation of input

UFP_VERSION = sanitizeInput(UFP_VERSION)
UFP_THEME = sanitizeInput(UFP_THEME)
UFP_API_TYPE = sanitizeInput(UFP_API_TYPE)
UFP_NODE_ENV = sanitizeInput(UFP_NODE_ENV)

logger.info('Ufp Make ')
logger.info('FORCE = ', FORCE)
logger.info('UFP_VERSION = ', UFP_VERSION)
logger.info('UFP_API_TYPE = ', UFP_API_TYPE)
logger.info('UFP_THEME = ', UFP_THEME)
logger.info('UFP_NODE_ENV = ', UFP_NODE_ENV)

/**
 * constants
 */

/**
 * execute command trigges execSync for a shell command, used to execute batches of commands
 * @param command
 */
const executeCommand = (command) => {

    try {

        logger.log('Executing command ', command)

        execSync(command, {
            cwd: process.cwd(),
            stdio: 'inherit'
        })
    } catch (err) {

        logger.error('Execution failed', err)
        if (!FORCE) {
            throw 'exiting, use --FORCE to continue on fail'
        } else {

            logger.warn('Continuing build although step failed!')

        }

    }

}

logger.log('Execute Build')

const postCommands = [
    'node node_modules/cross-env UFP_VERSION = ' + UFP_VERSION,
    'node node_modules/cross-env UFP_API_TYPE = ' + UFP_API_TYPE,
    'node node_modules/cross-env UFP_THEME = ' + UFP_THEME,
    'node node_modules/cross-env UFP_NODE_ENV = ' + UFP_NODE_ENV,
    'npm run ufp-lint -- -f codeframe',
    'npm run ufp-lint -- -f junit -o ' + path.join(Constants.TEST_REPORT_FOLDER, '/eslint/eslint-junit.xml'),
    'npm run ufp-compile:bare',
    'npm run ufp-test'
]

logger.info('postCommands', postCommands)

postCommands.map(executeCommand)

logger.info('Build finished ')

