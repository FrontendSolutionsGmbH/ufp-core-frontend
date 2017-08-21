'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MenuActionHandlers = require('./MenuActionHandlers');

var _MenuActionHandlers2 = _interopRequireDefault(_MenuActionHandlers);

var _MenuReducerUtils = require('./MenuReducerUtils');

var _MenuReducerUtils2 = _interopRequireDefault(_MenuReducerUtils);

exports['default'] = function (state, action) {
    if (state === undefined) state = _MenuReducerUtils2['default'].getInitialState();

    // handle own actions
    var handler = _MenuActionHandlers2['default'][action.type];
    state = handler ? handler(state, action) : state;
    state = _MenuReducerUtils2['default'].MenuActionListReducer(state, action);
    return state;
};

module.exports = exports['default'];