"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import _UFPMiddleware from './ufpmiddleware/index.js'
// import _Utils from './utils/index.js'
// import _ConfigureEpics from './epic/ConfigureEpics.js'
// import _Startup from './startup/index.js'
// import _UfpStoreConfig from './store/StoreConfig'
//
// import _Menu from './menu/index.js'
//
// export const ConfigureEpics = _ConfigureEpics
// export const UFPUtils = _Utils
// export const UfpStoreConfig = _UfpStoreConfig
// export const UFPStartup = _Startup
// export const UFPMiddleware = _UFPMiddleware
// // export const UFPMenu = _Menu
// export default{
//
//     UFPMiddleware: _UFPMiddleware,
//     UFPUtils: UFPUtils,
//     UFPStartup: _Startup,
//     UfpStoreConfig,
//     ConfigureEpics: ConfigureEpics,
//     UFPMenu: _Menu
// }
// index.js is evil
// the redux store

var initialStateCallbacks = [];
var manifests = [];
var reducers = [];
var middlewares = [];
var enhancers = [];
var reducerCreators = [];
var middlewareCreators = [];
var enhancerCreators = [];
exports.default = {
    initialStateCallbacks: initialStateCallbacks,
    manifests: manifests,
    reducers: reducers,
    middlewares: middlewares,
    enhancers: enhancers,
    reducerCreators: reducerCreators,
    middlewareCreators: middlewareCreators,
    enhancerCreators: enhancerCreators,

    getAllActionCreators: function getAllActionCreators() {
        var result = [];
        manifests.map(function (manifest) {
            if (manifest.actionCreators) {
                // console.log('United Action pushing', manifest.actionCreators)
                // console.log('United Action pushing', ...manifest.actionCreators)
                result.push.apply(result, (0, _toConsumableArray3.default)(manifest.actionCreators));
            }
        });
        // console.log('United Action manifests are', this)
        // console.log('United Action manifests are', manifests)
        // console.log('United Action Creators are', result)
        return result;
    }

};