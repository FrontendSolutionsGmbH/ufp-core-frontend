const path = require('path')
const fs = require('fs')
const glob = require('glob')
var UFP = require('../../../build/lib/ufp')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const project = UFP.requireDefault(
    path.join(process.cwd(), '/project.config'),
    path.join(__dirname, '/../project.config.js')
)
const StatsPlugin = require('stats-webpack-plugin')
const VisualizerPlugin = require('webpack-visualizer-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = (file) => inProject(project.srcDir, file)

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'

const config = {
    entry: {
        main: [
            inProjectSrc(project.main)
        ]
    },
    devtool: project.sourcemaps ? 'source-map' : false,
    output: {
        path: inProject(project.outDir),
        filename: __DEV__ ? '[name].js' : '[name].[chunkhash].js',
        publicPath: project.publicPath
    },
    resolve: {
        modules: [
            inProject(project.srcDir),
            'node_modules'
        ],
        extensions: ['*', '.js', '.jsx', '.json']
    },
    externals: project.externals,
    module: {
        rules: []
    },
    plugins: [
        // CopyWebpackPlugin([
        //     {
        //         from: 'src/static',
        //         to: ''
        //     }]),
        new webpack.DefinePlugin(Object.assign({
            'process.env': {
                NODE_ENV: JSON.stringify(project.env)
            },
            __DEV__,
            __TEST__,
            __PROD__
        }, project.globals))
    ]
}

/**
 * start of ufp static folders copywebpackplugin config
 */
    // static file copy presets, this is ufp configuration default
const folders = [

        {
            /**
             * the src static is copied to root of project, used to create main
             * folders accesible in production
             */
            from: 'src/static',
            to: ''
        },
        {
            /**
             * the res default folder is exported 'as is' to the subfolder /res in production
             */
            from: 'src/res',
            to: 'res'
        }
    ]
// and create copy plugin entries if folders exist in project structure
folders.map((folderData) => {
        if (fs.existsSync(path.join(process.cwd(), folderData.from))) {
            config.plugins.push(
                CopyWebpackPlugin([
                    {
                        from: folderData.from,
                        to: folderData.to
                    }])
            )
        }
    }
)
/**
 * end of ufp static folders copywebpackplugin config
 */

// JavaScript
// ------------------------------------
config.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader',
        query: {
            cacheDirectory: true,
            plugins: [
                'babel-plugin-transform-class-properties',
                'babel-plugin-syntax-dynamic-import',
                'babel-plugin-transform-react-jsx',
                [
                    'babel-plugin-transform-runtime',
                    {
                        helpers: true,
                        polyfill: false, // we polyfill needed features in src/normalize.js
                        regenerator: true
                    }
                ],
                [
                    'babel-plugin-transform-object-rest-spread',
                    {
                        useBuiltIns: false // we polyfill Object.assign in src/normalize.js
                    }
                ]
            ],
            presets: [
                // use this for es5 transpile target
                ['babel-preset-es2015', 'babel-preset-react']

                // modern way of declaring transpile targets
                // ['babel-preset-env', {
                //   modules: false,
                //   targets: {
                //     chrome: "60",
                //   },
                //   uglify: true,
                //
                // }],
            ]
        }
    }]
})

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
    filename: 'styles/[name].[contenthash].css',
    allChunks: true,
    disable: __DEV__
})

config.module.rules.push({
    test: /\.(sass|scss|css)$/,
    loader: extractStyles.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: project.sourcemaps,
                    minimize: {
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions']
                        },
                        discardComments: {
                            removeAll: true
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                        sourcemap: project.sourcemaps
                    }
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: project.sourcemaps,
                    includePaths: [
                        inProjectSrc('styles')
                    ]
                }
            }
        ]
    })
})
config.plugins.push(extractStyles)

// Images
// ------------------------------------
config.module.rules.push({
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader',
    options: {
        limit: 8192
    }
})

// Fonts
// ------------------------------------
;
[
    ['woff', 'application/font-woff'],
    ['woff2', 'application/font-woff2'],
    ['otf', 'font/opentype'],
    ['ttf', 'application/octet-stream'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['svg', 'image/svg+xml']
].forEach((font) => {
    const extension = font[0]
    const mimetype = font[1]

    config.module.rules.push({
        test: new RegExp(`\\.${extension}$`),
        loader: 'url-loader',
        options: {
            name: 'fonts/[name].[ext]',
            limit: 10000,
            mimetype
        }
    })
})

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
    template: inProjectSrc('index.html'),
    inject: true,
    minify: {
        collapseWhitespace: true
    }
}))

// Development Tools
// ------------------------------------
if (__DEV__) {
    config.entry.main.push(
        `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
    )
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    )
}

// Bundle Splitting
// ------------------------------------
if (!__TEST__) {
    const bundles = ['normalize', 'manifest']

    if (project.vendors && project.vendors.length) {
        bundles.unshift('vendor')
        config.entry.vendor = project.vendors
    }
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({names: bundles}))
}

// Production Optimizations
// ------------------------------------
if (__PROD__) {
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    )

    //   stats plugins they take too long in dev setup
    config.plugins.push(
        new webpack.optimize.ModuleConcatenationPlugin(),
        new StatsPlugin('stats.json', {
            chunkModules: true,
            exclude: [/node_modules[\\\/]react/]
        }),
        new VisualizerPlugin({
            filename: './stats.html'
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        // new ZopfliPlugin({
        //   asset: "[path].gz[query]",
        //   algorithm: "zopfli",
        //   test: /\.(js|html)$/,
        //   threshold: 10240,
        //   minRatio: 0.8
        // }),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'dist/*.html'))
        })
    )
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: !!config.devtool,
        compress: {
            warnings: false,
            screw_ie8: true,
            hoist_vars: true,
            hoist_funs: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
        }
    }))
}

module.exports = config
