const argv = require('yargs').argv
const webpackConfig = require('./webpack.config.js')

const TEST_BUNDLER = require('../tests/test-bundler.js')
const karmaConfig = {
    basePath: '../',
    browsers: ['PhantomJS'],
    singleRun: !argv.watch,
    coverageReporter: {
        reporters: [
            {type: 'text-summary'}
        ]
    },
    files: [{
        pattern: TEST_BUNDLER,
        watched: false,
        served: true,
        included: true
    }],
    frameworks: ['mocha'],
    reporters: ['mocha'],
    preprocessors: {
        [TEST_BUNDLER]: ['webpack']
    },
    logLevel: 'INFO',
    browserConsoleLogOptions: {
        terminal: true,
        format: '%b %T: %m',
        level: ''
    },
    webpack: {
        entry: TEST_BUNDLER,
        devtool: 'cheap-module-source-map',
        module: webpackConfig.module,
        plugins: webpackConfig.plugins,
        resolve: webpackConfig.resolve,
        externals: {}
    },
    webpackMiddleware: {
        stats: 'errors-only',
        noInfo: true
    }
}

module.exports = (cfg) => cfg.set(karmaConfig)
