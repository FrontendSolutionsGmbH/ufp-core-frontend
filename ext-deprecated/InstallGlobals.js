/**
 * warning: thesee are ufp-projectr scripts to be executed in project context, not
 * used for any ufp-core processes
 *
 * this particular script sahould deal with installing npm global packages
 * to be available in dev environment TBD
 *
 */
var watch = require('node-watch')
var path = require('path')

const exec = require('child_process').exec

console.log('Preparing UFP Infrastructure')
console.log('Global packages are required to run ufp-core smoothly on your system')

// console.log(themesDir);
watch(path.join(__dirname, '/../src'), function (filename) {
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
})
