'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MenuActionHandlers = require('./MenuActionHandlers');

var _MenuActionHandlers2 = _interopRequireDefault(_MenuActionHandlers);

var _MenuReducerUtils = require('./MenuReducerUtils');

var _MenuReducerUtils2 = _interopRequireDefault(_MenuReducerUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _MenuReducerUtils2.default.getInitialState();
    var action = arguments[1];

    // handle own actions
    var handler = _MenuActionHandlers2.default[action.type];
    state = handler ? handler(state, action) : state;
    state = _MenuReducerUtils2.default.MenuActionListReducer(state, action);
    return state;
};