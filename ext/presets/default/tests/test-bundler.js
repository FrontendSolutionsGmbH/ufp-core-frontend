const mocha = require('mocha')
const chai = require('chai')
const path = require('path')

// require('normalize.js')
const sinon = require('sinon')
const dirtyChai = require('dirty-chai')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const chaiEnzyme = require('chai-enzyme')
require('whatwg-fetch')
// Mocha / Chai
// ------------------------------------
// var Promise = require('native-promise-only')
//
// console.log('mochaaaaaaa is ', mocha)
// console.log('mochaaaaaaa is ', mocha.setup)
//
// mocha.setup({ui: 'bdd'})
// chai.should()
//
// global.chai = chai
// global.expect = chai.expect
// global.sinon = sinon
//
// // Chai Plugins
// // ------------------------------------
// chai.use(chaiEnzyme())
// chai.use(dirtyChai)
// chai.use(chaiAsPromised)
// chai.use(sinonChai)

// Test Importer
// ------------------------------------
//const __karmaWebpackManifest__ = []; // eslint-disable-line
//const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path)
// We use a Webpack global here as it is replaced with a string during compile.
// Using a regular JS variable is not statically analyzable so webpack will throw warnings.
// require all `tests/spec/**/*.spec.js`
console.log('testsContext ')
console.log('testsContext ', process.cwd())
console.log('testsContext ', path.join(process.cwd(), './tests'))
console.log('testsContext2 ', path.resolve('../../../../../tests'))

const testsContext = require.context('../../../../../../tests', true, /\.spec\.js$/)

console.log('testsContext ', testsContext)
// only run tests that have changed after the first pass.
//const testsToRun = testsContext.keys().filter(inManifest)
//    ;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)
testsContext.keys()
            .forEach(testsContext)
// require all `src/**/*.js` except for `main.jsx` (for isparta coverage reporting)
const componentsContext = require.context(path.join(process.cwd(), '/src/'), true, /^((?!(main|test-bundler)).)*\.(js|jsx)$/)
componentsContext.keys()
                 .forEach(componentsContext)
