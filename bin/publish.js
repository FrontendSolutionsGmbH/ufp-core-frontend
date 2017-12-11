#!/usr/bin/env node

const child_process = require('child_process')
const package = require(process.cwd() + '/package.json')

console.log('This script determines wether a beta version or an untagged production release to npm shall be done...')

console.log()
console.log('module is', package.name)
console.log('version is', package.version)

// modified from https://github.com/sindresorhus/semver-regex/blob/master/index.js
// regexp for ommiting v beginning and capture group for tags
const semverRegexp = /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-([\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*))?\b/

const match = semverRegexp.exec('1.1.1')
if (match) {

    if (match[1] === undefined) {
        console.error('publishing production release', match[0])

        child_process.execSync(__dirname + '/npm_publish.sh  ')

    } else {
        console.error('beta version is', match[1])
        child_process.execSync(__dirname + '/npm_publish.sh --tag beta')

    }
    // execute publish script with the login credentials

} else {
    console.error('No Valid Version inside package.json', package.version)
}

console.log('finished with npm publish')
