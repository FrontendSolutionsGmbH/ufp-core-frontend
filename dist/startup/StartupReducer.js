'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _StartupConfiguration = require('./StartupConfiguration');

var _StartupConfiguration2 = _interopRequireDefault(_StartupConfiguration);

var _StartupReducerUtils = require('./StartupReducerUtils');

var _StartupReducerUtils2 = _interopRequireDefault(_StartupReducerUtils);

var _StartupActionHandlers = require('./StartupActionHandlers');

var _StartupActionHandlers2 = _interopRequireDefault(_StartupActionHandlers);

exports['default'] = function (state, action) {
    if (state === undefined) state = _StartupReducerUtils2['default'].getInitialState(_StartupConfiguration2['default'].get());

    // first default action andling
    var handler = _StartupActionHandlers2['default'][action.type];
    state = handler ? handler(state, action) : state;
    state = _StartupReducerUtils2['default'].stepReducer(state, action);
    return state;
};

module.exports = exports['default'];