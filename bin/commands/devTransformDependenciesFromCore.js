const child_process = require('child_process')
const package = require('../../package.json')
const path = require('path')

const Table = require('cli-table3')
const logger = require('../Logger2')('ufp-show-used-packages')
const fs = require('fs');
const notMatchFolders = /node_modules/
const matchFile = /.*\.(json|js|ts|yml)/
const stripper = [
    'eslint-plugin',
    'babel-plugin',

]

// my-module.js
exports.command = ['dacd', 'dev-add-core-dependencies']

exports.describe = 'DEV - makes all dependencies of ufp-core a dev-dependency in current '

exports.builder = {}
function compareCountsAtIndex0(a, b) {
    if (a[0] > b[0])
        return -1;
    if (a[0] < b[0])
        return 1;
    return 0;
}
exports.handler = function (argv) {

    console.warn('Transforming ufp-core dependencies to current package...')

    child_process.execSync(`node ${path.join(__dirname, '../../ext/')}UpdatePackageJsonDependencies.js`, {
        cwd: process.cwd(),
        stdio: 'inherit'
    })
}
