const TEST_BUNDLER = './tests/test-bundler.js'

const karmaConfig = {
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 60000, //by default 10000
    basePath: '../',
    browsers: ['ChromeHeadless'],
    singleRun: false,
    coverageReporter: {
        dir: 'coverage',
        includeAllSources: true,
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
    files: [
        {
            pattern: TEST_BUNDLER,
            watched: true,
            served: true,
            included: true
        }
    ],
    frameworks: ['mocha'],
    reporters: ['mocha', 'junit', 'coverage'],
    logLevel: 'INFO',
    browserConsoleLogOptions: {
        terminal: true,
        format: '%b %T: %m',
        level: '',
    },
    junitReporter: {
        outputDir: 'test-report', // results will be saved as $outputDir/$browserName.xml
        outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
        useBrowserName: false, // add browser name to report and classes names
        xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
    },

    preprocessors: {

        [TEST_BUNDLER]: ['webpack', 'coverage']
    },
    webpack: {
        entry: [
            TEST_BUNDLER,
            'src/index.js'
        ],
        resolve: {
            // enforce no-symlinking for module resolving, required when using modules from filesystem (e.g. ufp-core)
            symlinks: false,

            modules: [
                'lib',
                'node_modules'
            ],
            extensions: ['*', '.js', '.jsx', '.json']
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader?presets[]=es2015'
                }
            ]
        },
        externals: {
            'react/addons': 'react',
            'react/lib/ExecutionEnvironment': 'react',
            'react/lib/ReactContext': 'react'

        },
        watch: true
    },

}

module.exports = (cfg) => cfg.set(karmaConfig)
