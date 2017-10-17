const path = require('path')
const execSync = require('child_process').execSync
const Constants = require('../ext/build/scripts/constants')
const logger = require('../ext/build/lib/Logger')
const validator = require('validator')
const rimraf = require('rimraf')
// var Table = require('cli-table')

/**
 * Parameter Parsing
 */

const yargs = require('yargs')
yargs.version('1.0.0')

Object.keys(Constants.MAKE_OPTIONS)
    .map((key) => {
        yargs.option(key, Constants.MAKE_OPTIONS[key])
    })

// logger.info('YARGS INPUT IS', JSON.stringify(yargs.argv))

var {
    FORCE,
    CLEAN,
    UFP_STEP,
    UFP_VERSION,
    UFP_API_TYPE,
    UFP_THEME,
    UFP_NODE_ENV
}=yargs.argv

const sanitizeInput = (value) => {
    // logger.info('sanitizing ', value)
    var result = value
    result = validator.blacklist(value, '&|') //=> true
    return result
}

// Perform a basic sanitation of input

UFP_VERSION = sanitizeInput(UFP_VERSION)
UFP_THEME = sanitizeInput(UFP_THEME)
UFP_API_TYPE = sanitizeInput(UFP_API_TYPE)
UFP_NODE_ENV = sanitizeInput(UFP_NODE_ENV)

logger.info('Ufp Make ')
logger.info('cwd = ', process.cwd())
logger.info('UFP_STEP = ', UFP_STEP)
logger.info('CLEAN = ', CLEAN)
logger.info('FORCE = ', FORCE)
logger.info('UFP_VERSION = ', UFP_VERSION)
logger.info('UFP_API_TYPE = ', UFP_API_TYPE)
logger.info('UFP_THEME = ', UFP_THEME)
logger.info('UFP_NODE_ENV = ', UFP_NODE_ENV)

const handleError = (err) => {
    logger.error('Execution failed', err.error)
    if (!FORCE) {
        throw new Error('exiting, use --FORCE to continue on fail')
    } else {
        logger.warn('Continuing build although step failed!')
    }
}

/**
 * constants
 */

/**
 * execute command trigges execSync for a shell command, used to execute batches of commands
 * @param command
 */
const executeCommand = (command) => {
    try {
        logger.debug('Executing command ', command)

        execSync(command, {
            cwd: process.cwd(),
            stdio: ['inherit', 'inherit', 'inherit']

        })
    }
    catch (err) {
        handleError(err)
    }
}
logger.info('Execute Build')

if (CLEAN) {
    logger.info('Cleaning build folders...')
    rimraf.sync(path.join(process.cwd(), 'lib'))
    rimraf.sync(path.join(process.cwd(), Constants.TEST_REPORT_FOLDER))
    logger.info('.. finished')
}

const postCommands = [
    'node node_modules/cross-env UFP_VERSION = ' + UFP_VERSION,
    'node node_modules/cross-env UFP_API_TYPE = ' + UFP_API_TYPE,
    'node node_modules/cross-env UFP_THEME = ' + UFP_THEME,
    'node node_modules/cross-env UFP_NODE_ENV = ' + UFP_NODE_ENV,
    'npm run lint -- -f codeframe',
    'npm run lint -- -f junit -o ' + path.join(Constants.TEST_REPORT_FOLDER, '/eslint/eslint-junit.xml'),
    'npm run compile',
    'npm run test'
]

postCommands.map(executeCommand)

logger.info('Build finished ')
