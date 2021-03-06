const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    debug: false,
    name: 'ufp-app',
    /** The environment to use when building the project */
    env: NODE_ENV,
    /** The full path to the project's root directory */
    basePath: process.cwd(),
    /** The name of the directory containing the application source code */
    srcDir: 'src',
    /** The file name of the application's entry point */
    main: 'main',
    /** The name of the directory in which to emit compiled assets */
    outDir: 'dist',
    /** html webpack configuration, automatically include chunks in entry html or not */
    injectChunks: true,

    devServer: {
        stats: 'normal'
    },
    ignoreModules: [],
    /** used as entry point for the html, may contain path **/
    indexHtmlPath: 'index.html',
    /** The base path for all projects assets (relative to the website root) */
    publicPath: '',
    /** Whether to generate sourcemaps */
    sourcemaps: NODE_ENV === 'development',
    /** A hash map of keys that the compiler should treat as external to the project */
    externals: {
        browser: 'browser'
    },
    chunkFolder: 'gen',
    /** A hash map of variables and their values to expose globally */
    globals: {},

    /** The list of modules to bundle separately from the core application code */
    vendors: [
        // 'ufp-core'
        // 'react',
        // 'react-dom',
        // 'preact',
        // 'preact-compat',
        // 'react-redux',
        // 'react-router',
        // 'redux',
        // 'rxjs',
        // 'history'

    ]
}
