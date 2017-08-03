const path = require('path')
const TEST_BUNDLER = './tests/test-bundler.js'

const karmaConfig = {
    basePath: '../',
    browsers: ['PhantomJS'],
    singleRun: true,
    coverageReporter: {
        reporters: [
            { type: 'text-summary' },
            { type : 'lcov', dir : 'coverage', subdir: '.' }
        ],
    },
    files: ['./node_modules/phantomjs-polyfill/bind-polyfill.js',{
        pattern  : TEST_BUNDLER,
        watched  : false,
        served   : true,
        included : true
    }],
    frameworks: ['mocha'],
    reporters: ['mocha', 'coverage'],
    preprocessors: {
        [TEST_BUNDLER]: ['webpack'],
    },
    logLevel: 'WARN',
    browserConsoleLogOptions: {
        terminal: true,
        format: '%b %T: %m',
        level: '',
    },
    webpack: {
        entry: TEST_BUNDLER,
        devtool: 'cheap-module-source-map',
        externals: {
            'react/addons': 'react',
            'react/lib/ExecutionEnvironment': 'react',
            'react/lib/ReactContext': 'react',
        },
        resolve: {
            modules: [
                path.resolve(__dirname,'../src'),
                'node_modules',
            ],
            extensions: ['*', '.js', '.jsx','.es6', '.json'],
        },
        module: {
            noParse: [
                /\/sinon\.js/
            ],
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader', //+JSON.stringify(project.compiler_babel)+'!'+preprocessString,
                query: {
                    cacheDirectory : true,
                    presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-0'],
                    plugins: ['babel-plugin-transform-runtime', 'babel-plugin-istanbul']
                }
            },
                {
                    test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
                    loader: 'imports-loader?define=>false,require=>false'
                }
            ]
        },
    },
    webpackMiddleware: {
        stats: 'errors-only',
        noInfo: true,
    }
}

module.exports = (cfg) => cfg.set(karmaConfig)
