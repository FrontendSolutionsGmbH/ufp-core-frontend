#!/usr/bin/env node
const yargs = require('yargs')
const logger = require('../ext/build/lib/Logger2')('ufp-core-cli')
const package = require('../package.json')

yargs.version(package.version)
yargs.command(require('./commands/defaultCommand'))
yargs.command(require('./commands/initCommand'))
yargs.command(require('./commands/startCommand'))
yargs.command(require('./commands/buildCommand'))
yargs.command(require('./commands/statusCommand'))
yargs.help()
yargs.argv

