import chai from 'chai'
import sinon from 'sinon'
import dirtyChai from 'dirty-chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'

// Mocha / Chai
// ------------------------------------
mocha.setup({ ui: 'bdd' })
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
const __karmaWebpackManifest__ = []; // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path)
// We use a Webpack global here as it is replaced with a string during compile.
// Using a regular JS variable is not statically analyzable so webpack will throw warnings.
// require all `tests/spec/**/*.spec.js`
const testsContext = require.context('./specs/', true, /\.spec\.js$/)
// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest)
    ;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)

// require all `src/**/*.js` except for `main.jsx` (for isparta coverage reporting)

const componentsContext = require.context('../src/', true, /^((?!main).)*\.(js|jsx)$/)
componentsContext.keys().forEach(componentsContext)
