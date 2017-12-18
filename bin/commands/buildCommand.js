const child_process = require('child_process')
const package = require('../../package.json')

// my-module.js
exports.command = ['b', 'build']

exports.describe = 'build ufp application'

exports.builder = {}

exports.handler = function (argv) {
    // do something with argv.
    // console.log('jo', package.scripts['ufp-start'])
    child_process.execSync(package.scripts['ufp-make'], {
        cwd: process.cwd(),
        stdio: 'inherit'
    })

}
