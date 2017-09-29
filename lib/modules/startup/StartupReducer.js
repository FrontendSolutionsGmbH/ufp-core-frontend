'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _StartupConfiguration = require('./StartupConfiguration');

var _StartupConfiguration2 = _interopRequireDefault(_StartupConfiguration);

var _StartupReducerUtils = require('./StartupReducerUtils');

var _StartupReducerUtils2 = _interopRequireDefault(_StartupReducerUtils);

var _StartupActionHandlers = require('./StartupActionHandlers');

var _StartupActionHandlers2 = _interopRequireDefault(_StartupActionHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _StartupReducerUtils2.default.getInitialState(_StartupConfiguration2.default.get());
    var action = arguments[1];

    // first default action andling
    var handler = _StartupActionHandlers2.default[action.type];
    state = handler ? handler(state, action) : state;
    state = _StartupReducerUtils2.default.stepReducer(state, action);
    return state;
};