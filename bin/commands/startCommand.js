const child_process = require('child_process')
const package = require('../../package.json')
const logger = require('../../ext/build/lib/Logger2')('ufp-start')

// my-module.js
exports.command = ['s [dist]', 'start [dist]']

exports.describe = 'start ufp application dev server'

exports.builder = {}

exports.handler = function (argv) {
    // do something with argv.


   if(argv.dist){
       if(argv.dist==='dist') {
           logger.info('starting serve of dist/ ')
           child_process.execSync(package.scripts['ufp-start:dist'], {
               cwd: process.cwd(),
               stdio: 'inherit'
           })
       }else{
           logger.warn('only "dist" allowed for now ')
       }
   }           else{

       logger.info('starting development server ')
       child_process.execSync(package.scripts['ufp-start'], {
           cwd: process.cwd(),
           stdio: 'inherit'
       })
   }

}
