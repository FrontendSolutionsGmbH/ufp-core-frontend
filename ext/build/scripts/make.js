const path = require('path')
const ufpMake = require('ufp-make')

/**
 * if a project makefile is present, merge that (yes) with
 * default project config
 */

ufpMake.makeFile({
    fileName: path.join(__dirname, '../../presets/default/ufp-make.yml')
})
