const mocha = require('mocha')
const chai = require('chai')
// require('normalize.js')
const sinon = require('sinon')
const dirtyChai = require('dirty-chai')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const chaiEnzyme = require('chai-enzyme')
require('whatwg-fetch')
// Mocha / Chai
// ------------------------------------
var Promise = require('native-promise-only')
mocha.setup({ui: 'bdd'})
chai.should()

global.chai = chai
global.expect = chai.expect
global.sinon = sinon

// Chai Plugins
// ------------------------------------
chai.use(chaiEnzyme())
chai.use(dirtyChai)
chai.use(chaiAsPromised)
chai.use(sinonChai)

// Test Importer
// ------------------------------------
//const __karmaWebpackManifest__ = []; // eslint-disable-line
//const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path)
// We use a Webpack global here as it is replaced with a string during compile.
// Using a regular JS variable is not statically analyzable so webpack will throw warnings.
// require all `tests/spec/**/*.spec.js`
const testsContext = require.context('./specs/', true, /\.spec\.js$/)
// only run tests that have changed after the first pass.
//const testsToRun = testsContext.keys().filter(inManifest)
//    ;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)
testsContext.keys()
            .forEach(testsContext)
// require all `src/**/*.js` except for `main.jsx` (for isparta coverage reporting)

const componentsContext = require.context(process.cwd(), '/src/', true, /^((?!(main|test-bundler)).)*\.(js|jsx)$/)
componentsContext.keys()
                 .forEach(componentsContext)
