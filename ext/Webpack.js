/**
 * entry point for projects wanting to extend the webpack config
 *
 * this is for now the entry point, since templated projects not jet available the 'default' project ist
 * ised hard coded throughout...
 *
 *
 */

const Webpack = require('./presets/default/config/webpack.config')

module.exports = Webpack
