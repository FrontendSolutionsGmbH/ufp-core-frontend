var watch = require('node-watch');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

console.log('Watching UFP Src', __filename, __dirname)



// console.log(themesDir);
watch(__dirname + '/../src', function (filename) {
    console.log(filename, ' changed.');
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
});
