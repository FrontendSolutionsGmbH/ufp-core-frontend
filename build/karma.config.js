const path = require('path')
const TEST_BUNDLER = './tests/test-bundler.js'

const karmaConfig = {
    basePath: '../',
    browsers: ['ChromeHeadless'],
    singleRun: true,
    coverageReporter: {
        dir: 'coveragexxx',
        includeAllSources: true,
        reporters: [
            {
                type: 'text-summary',
                dir: 'test-report1',
                subdir: 'coverage'
            },
            {
                type: 'clover',
                dir: 'test-report2',
                subdir: 'coverage'
            },
            {
                type: 'lcov',
                dir: 'test-report3',
                subdir: 'coverage'
            },
            {
                type: 'html',
                dir: 'test-report4',
                subdir: 'coverage'
            }
        ],
    },
    files: [
        {
            pattern: TEST_BUNDLER,
            watched: false,
            served: true,
            included: true
        }
    ],
    frameworks: ['mocha'],
    reporters: ['mocha', 'coverage'],
    logLevel: 'INFO',
    browserConsoleLogOptions: {
        terminal: true,
        format: '%b %T: %m',
        level: '',
    },
    preprocessors: {

        [TEST_BUNDLER]: ['webpack', 'coverage']
    },
    webpack: {
        entry: TEST_BUNDLER,
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel?presets[]=es2015'
                }
            ]
        },
        watch: true
    },

}

module.exports = (cfg) => cfg.set(karmaConfig)
