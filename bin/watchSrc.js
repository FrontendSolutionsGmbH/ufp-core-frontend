var watch = require('node-watch');
const path = require('path');
const chokidar = require('chokidar');
const fs = require('fs');
const exec = require('child_process').exec;

console.log('Watching UFP Src', __filename, __dirname)

var running = false

// console.log(themesDir);
chokidar.watch(__dirname + '/../src', {}).on('change',function (event,filename) {
    if (running) {
        return;
    }
    running = true
    console.log(event,filename, ' changed.');
    const ls = exec('npm run compile');

    ls.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    running = false
});