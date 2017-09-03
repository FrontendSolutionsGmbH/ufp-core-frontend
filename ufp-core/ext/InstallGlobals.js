var watch = require('node-watch')
const path = require('path')
const fs = require('fs')
const prompt = require('../lib/prompt')

const exec = require('child_process').exec

console.log('Preparing UFP Infrastructure')
console.log('Global packages are required to run ufp-core smoothly on your system')

const globalPackages = [
    'jshint',
    'node-gyp',
    'npm'

]

var running = false

// console.log(themesDir);
watch(__dirname + '/../src', function (filename) {
    // if (running) {
    //     return;
    // }
    running = true
    console.log(filename, ' changed.')
    const ls = exec('npm run compile')

    ls.stdout.on('data', (data) => {
        console.log(`${data}`)
    })

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
    })
    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })
    running = false
});
