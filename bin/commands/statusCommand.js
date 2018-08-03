const child_process = require('child_process')
const fs = require('fs')
const path = require('path')
const logger = require('../../ext/build/lib/Logger2')('ufp-status')
const package = require('../../package.json')
const Table = require('cli-table3')
const prettyBytes = require('pretty-bytes')
const sloc = require('node-sloc')
var countFiles = require('count-files')
var config = require('../../ext/presets/default/config/project.config.wrapper')

// my-module.js
exports.command = ['st', 'status']

exports.describe = 'some informations about ufp-application'

exports.builder = {}

const printConfig2 = (obj, hide) => {
    var table
    if (hide) {
        table = new Table();
    } else {
        table = new Table({
            head: ['config key', 'config value']
        });
    }

    Object.keys(obj).sort().forEach((key) => {
        const value = obj[key]
        if (Array.isArray(value)) {
            table.push([key, `[${value}]`])

        } else if (typeof value === 'object') {

            table.push([key, printConfig2(value, true)])

        } else {

            table.push([key, `'${value}'`])
        }
    })
    if (!hide) {
        table.push(
            [{
                colSpan: 2,
                content: `current project.config
create a project.config file to override setting`
            }])
    }
    return table.toString()

}
const printConfig = (obj) => {
    console.log(printConfig2(obj))
}

const handleLinesOfCodeStats = (dirs) => {
    var table = new Table({
        head: ['dir', 'loc', 'sloc', 'blank', 'comments', 'files']
    });
    var count = dirs.length
    const handle = function (dir, res) {

        table.push(['/' + dir, ...Object.values(res.sloc)])

        if (--count == 0) {
            table.push(
                [{
                    colSpan: 6,
                    content: `source code stats
loc=Lines of Code, sloc=Source Lines of Code`
                }])
            console.log(table.toString())
        }
    }

    dirs.map((dir) => {
        const options = {
            path: path.join(process.cwd(), dir)
        }
        // Using promises
        sloc(options).then(handle.bind(this, dir))
    })
}

const handleDirStats = (dirs) => {
    var table = new Table({
        head: ['dir', 'files', 'dirs', 'bytes']
    });

    var count = dirs.length
    const dealWithResult = function (dir, err, results) {
        if (err) {
            table.push(['/' + dir, {
                colSpan: 3,
                content: 'not available'

            }])
        } else {
            table.push(['/' + dir, results.files, results.dirs, prettyBytes(results.bytes)])
        }

        if (--count === 0) {
            table.push(
                [{
                    colSpan: 4,
                    content: 'directory stats'
                }])
            console.log(table.toString())
        }
    }

    dirs.forEach((dir) => countFiles(path.join(process.cwd(), dir), dealWithResult.bind(this, dir)))
}
exports.handler = function (argv) {
    // do something with argv.
    // console.log('jo', package.scripts['ufp-start'])

    const checks = [
        {
            dir: 'node_modules',
            required: true,
            description: 'npm modules',
            message: 'use\n npm install',
            success: 'npm modules installed'
        }
        , {
            file: 'webpack.config.js',
            dir: 'config',
            required: false,
            description: 'Webpack Config',
            message: 'default is used from\n ufp-core ',
            success: 'project extends base \nwebpack config'
        }
        , {
            file: 'project.config',
            required: false,
            description: 'The Project config ',
            message: 'default is used from\n ufp-core ',
            success: 'project settings '
        }
        ,
        {
            dir: 'src',
            required: true,
            description: 'folder containing \nmain.js and index.html',
            message: 'create sample using \n ufp-core init',
            success: 'source dir available'

        }
        ,
        {
            dir: 'test',
            required: false,
            description: 'unit test folder',
            message: 'create tests automatically\n using\n ufp-core createTests',
            message: 'unit tests available'

        }, {
            dir: 'dist',
            required: false,
            description: 'build directory',
            message: 'build using\n ufp-core make',
            success: 'build exists,rebuild\n ufp-core make'

        }]
    // instantiate
    var table = new Table({
        head: ['file', 'e', 'r', 'description', 'help'],
        colWidths: [30, 3, 3, 25, 25]
    });
    checks.forEach((entry) => {
        const file = path.join(entry.dir || '', entry.file || '')
        //  logger.info(`${entry.description} `)
        //  logger.info(`/${file} `)

        if (fs.existsSync(path.join(process.cwd(), file))) {

            // logger.info(`${file} exists`)
            table.push([file, 'X', entry.required ? 'X' : 'O', entry.description, entry.success || ''])
        } else {
            //  logger.warn(`${file} does not exist`)
            //logger.warn(`${entry.message} `)
            table.push([file, 'O', entry.required ? 'X' : 'O', entry.description, entry.message])

        }
    })

    table.push(
        [{
            colSpan: 5,
            content: 'configuration file checks and required folders check\nr=required e=exists'
        }])
    console.log(table.toString());

    // lines of code
    handleLinesOfCodeStats(['src', 'tests'])
    handleDirStats(['src', 'node_modules', 'dist','tests'])
    // lines of code end
    printConfig(config)

    // node modules stats
    // handleLinesOfCodeStats('node_modules')
    // node modules stats end

}
