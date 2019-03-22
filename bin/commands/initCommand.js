// my-module.js
const yargsInteractive = require('yargs-interactive');
const logger = require('../Logger2')('ufp-init')
exports.command = ['i', 'init']
const fs = require('fs-extra');
const path = require('path');
exports.describe = 'initialise ufp-application'

exports.builder = {}

exports.handler = function (argv) {
    const options = {
        // chooseApp: {
        //     type: 'list',
        //     name: 'name',
        //     message: 'xx',
        //     choices: ['one', 'two']
        // }

        installUfp: {
            type: 'confirm',
            default: false,
            describe: 'Install ufp sample application?'
        },
    };
    if (argv.interactive) {
        yargsInteractive().interactive(options).then((result) => {
            // The tool will prompt questions and will output your answers.

            if (result.installUfp) {

                fs.copySync(path.resolve(__dirname, '../../ext/sample/000-ufp-minimal-null/'),
                    path.resolve(process.cwd()));

                logger.info('Sample App installed, to start type')
                logger.info('ufp-core s')

                logger.info('Sample App installed, to build type')
                logger.info('ufp-core b')

                logger.info('for status information')
                logger.info('ufp-core st')

            }

        });
    } else {

        logger.info('Use --interactive to initialise project')

    }
}
