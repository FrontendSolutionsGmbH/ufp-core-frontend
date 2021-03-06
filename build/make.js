const path = require('path')
const execSync = require('child_process').execSync
const Constants = require('../ext/build/scripts/constants')
const logger = require('../ext/build/lib/Logger2')('ufp-make')
const validator = require('validator')
const rimraf = require('rimraf')
// var Table = require('cli-table')

/**
 * Parameter Parsing
 */

var currentArea = 'none'
var countSuccessCommands = {}
var countFailCommands = {}
var countCommands = {}

logger.mark('Ufp-Make ')
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
logger.debug('cwd = ', process.cwd())
logger.debug('UFP_STEP = ', UFP_STEP)
logger.debug('CLEAN = ', CLEAN)
logger.debug('FORCE = ', FORCE)
logger.debug('UFP_VERSION = ', UFP_VERSION)
logger.debug('UFP_API_TYPE = ', UFP_API_TYPE)
logger.debug('UFP_THEME = ', UFP_THEME)
logger.debug('UFP_NODE_ENV = ', UFP_NODE_ENV)

const handleError = (err) => {
    countFailCommands[currentArea]++
    // logger.error('Execution failedxxx', err.stderr.toString())
    logger.debug('Execution failed', err.stdout.toString())
    // logger.error('Execution failed', err)
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
const executeCommandArea = (command) => {
    if (typeof command === 'string' || command instanceof String) {
        executeCommand(command)
    } else {
        logger.mark('Starting:', command.name)
        currentArea = command.name
        countCommands[currentArea] = 0
        countFailCommands[currentArea] = 0
        countSuccessCommands[currentArea] = 0
        logger.info(command.description)
        command.commands.map(executeCommandArea)
        logger.mark('Finished:', command.name)
    }
}
const executeCommand = (command) => {
    countCommands[currentArea]++
    try {
        logger.info('EXEC [', command, ']')

        const output = execSync(command, {
            cwd: process.cwd(),
            stdio: ['pipe', 'pipe', 'pipe']

        })

        logger.info('END [ ', command, '] ')

        logger.debug('stdout was:')
        logger.debug(output.toString())
        countSuccessCommands[currentArea]++
    }
    catch (err) {
        logger.error('FAIL [', command, ']')
        handleError(err)
    }
}

if (CLEAN) {
    logger.mark('Cleaning build folders...')
    rimraf.sync(path.join(process.cwd(), 'lib'))
    rimraf.sync(path.join(process.cwd(), Constants.TEST_REPORT_FOLDER))
    logger.info('.. finished')
}

const postCommands = [
    {
        name: 'Environment Setup',
        description: 'used to configure environment variables used throughout the build',
        commands: ['node node_modules/cross-env UFP_VERSION = ' + UFP_VERSION,
            'node node_modules/cross-env UFP_API_TYPE = ' + UFP_API_TYPE,
            'node node_modules/cross-env UFP_THEME = ' + UFP_THEME,
            'node node_modules/cross-env UFP_NODE_ENV = ' + UFP_NODE_ENV]
    },
    {
        name: 'Linting Sourcecode',
        description: '... performing static code analysis',
        commands: [
            'npm run lint -- -f codeframe',
            'npm run lint -- -f junit -o ' + path.join(Constants.TEST_REPORT_FOLDER, '/eslint/eslint-junit.xml')]
    },

    {
        name: 'Testing ',
        description: '... performs the unit tests',
        commands: [

            'npm run test'
        ]
    }, {
        name: 'Building',
        allowedToFail: false,
        description: '... actually executing the build',
        commands: [
            'npm run compile'
        ]
    }
]

const printStats = () => {
    Object.keys(countCommands).map((key) => {
        if (countFailCommands[key] > 0) {
            logger.mark('%d of %d failed for: [%s]', countFailCommands[key], countCommands[key], key)
        } else {
            logger.mark('no problems: [%s]', key)
        }
    })
}

try {
    postCommands.map(executeCommandArea)
    logger.mark('success')
}
catch (e) {
    logger.error('', e.message)

    logger.mark('use --LOG_LEVEL=DEBUG for more information output')
}
printStats()
logger.mark('finished ')
