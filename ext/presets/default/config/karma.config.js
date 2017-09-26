const argv = require('yargs').argv
const webpackConfig = require('./webpack.config.js')

const TEST_BUNDLER = './tests/test-bundler.js'

console.log('testsContext ')
console.log('testsContext ', process.cwd())
const karmaConfig = {
    basePath: process.cwd(),
    browsers: ['ChromeHeadless'],
    singleRun: !argv.watch,
    coverageReporter: {
        reporters: [
            {
                type: 'html',
                dir: 'test-report/coverage',
                subdir: 'html'
            },
            {
                type: 'text-summary',
                dir: 'test-report/coverage',
                subdir: 'coverage'
            },
            {
                type: 'clover',
                dir: 'test-report/coverage',
                subdir: 'clover'
            },
            {
                type: 'lcov',
                dir: 'test-report/coverage',
                subdir: 'lcov'
            }
        ]
    },
    files: [{
        pattern: TEST_BUNDLER,
        watched: false,
        served: true,
        included: true
    }],
    frameworks: ['mocha'],
    reporters: ['mocha', 'junit', 'coverage'],
    preprocessors: {
        [TEST_BUNDLER]: ['webpack', 'coverage']
    },
    logLevel: 'DEBUG',
    browserConsoleLogOptions: {
        terminal: true,
        format: '%b %T: %m',
        level: ''
    },
    junitReporter: {
        outputDir: 'test-report', // results will be saved as $outputDir/$browserName.xml
        outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
        useBrowserName: false, // add browser name to report and classes names
        xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
    },
    webpack: {
        entry: TEST_BUNDLER,
        devtool: 'cheap-module-source-map',
        module: webpackConfig.module,
        plugins: webpackConfig.plugins,
        resolve: webpackConfig.resolve,
        externals: {
            'react/addons': 'react',
            'react/lib/ExecutionEnvironment': 'react',
            'react/lib/ReactContext': 'react'

        }
    },
    webpackMiddleware: {
        stats: 'errors-only',
        noInfo: true
    }
}

module.exports = (cfg) => cfg.set(karmaConfig)
