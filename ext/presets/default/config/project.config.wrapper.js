const fs = require('fs')
var UFP = require('../../../build/lib/ufp')
const path = require('path')

const projectDefault = require(path.join(__dirname, '/../project.config.js'))

const projectConfig = UFP.requireDefault(
    path.join(process.cwd(), '/project.config.js'),
    path.join(__dirname, '/../project.config.js')
)

const project = Object.assign({}, projectDefault, projectConfig)

module.exports = project
