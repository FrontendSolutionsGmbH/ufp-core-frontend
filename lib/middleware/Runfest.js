'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UfpMiddleware = require('./UfpMiddleware');

var _UfpMiddleware2 = _interopRequireDefault(_UfpMiddleware);

var _UfpMiddlewareConfiguration = require('./UfpMiddlewareConfiguration');

var _UfpMiddlewareConfiguration2 = _interopRequireDefault(_UfpMiddlewareConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * the runfest.js defines the properties of the ufp-module and serves as RUNtimemaniFEST
 * @type {{name: string}}
 */

var reducerCreatorFunction = function reducerCreatorFunction() {
    /**
     * create reducer here, containing all the assigned data in data variable
     */
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _UfpMiddlewareConfiguration2.default.get();

        return state;
    };
};
var Runfest = {
    name: 'Ufp Redux Middleware',
    id: 'Ufp Redux Middleware',
    description: 'Handles asyncronous actions with intercept hooks',

    onRegistered: function onRegistered(_ref) {
        var UfpCore = _ref.UfpCore;

        UfpCore.registerMiddleware({
            id: Runfest.name,
            middleware: (0, _UfpMiddleware2.default)()
        });

        UfpCore.registerReducerCreator({
            id: Runfest.name,
            reducerCreatorFunction: reducerCreatorFunction
        });
    }
};

exports.default = Runfest;