'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _useRouterHistory = require('react-router/lib/useRouterHistory');

var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);

var _createHashHistory = require('history/lib/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _RouterSelectors = require('./RouterSelectors');

var _RouterSelectors2 = _interopRequireDefault(_RouterSelectors);

var _RouterConstants = require('./RouterConstants');

var _RouterConstants2 = _interopRequireDefault(_RouterConstants);

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashHistory = (0, _useRouterHistory2.default)(_createHashHistory2.default)({
    basename: ''
}); /**
     * Application Router
     * @type {{name: string}}
     */


var Runfest = {
    name: _RouterConstants2.default.NAME,
    description: 'React Redux Hash Router3',
    selectors: _RouterSelectors2.default,

    onRegistered: function onRegistered(_ref) {
        var UfpCore = _ref.UfpCore;

        console.log('ROUTER REGISTERED CALLED ');

        UfpCore.registerMiddleware({
            id: 'router-middleware',
            middleware: (0, _reactRouterRedux.routerMiddleware)(hashHistory)
        });

        UfpCore.registerReducer({
            id: _RouterConstants2.default.NAME,
            reducer: _reactRouterRedux.routerReducer
        });

        // in this example declare react-router
    },

    /**
     * route setup is communicated through main manifes
     */
    syncHistoryWithStore: function syncHistoryWithStore(store) {
        return (0, _reactRouterRedux.syncHistoryWithStore)(hashHistory, store, {

            selectLocationState: function selectLocationState(state) {
                return state[Runfest.name];
            }
        });
    }

};

exports.default = Runfest;