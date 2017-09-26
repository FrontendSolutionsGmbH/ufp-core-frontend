const path = require('path')
const TEST_BUNDLER = './tests/test-bundler.js'

const karmaConfig = {
    basePath: '../',
    browsers: ['ChromeHeadless'],
    singleRun: true,
    coverageReporter: {
        reporters: [
            {type: 'text-summary'},
            {
                type: 'lcov',
                dir: 'coverage',
                subdir: '.'
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
