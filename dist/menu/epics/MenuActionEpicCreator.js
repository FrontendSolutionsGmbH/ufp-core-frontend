'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MenuConstants = require('../MenuConstants');

var _MenuConstants2 = _interopRequireDefault(_MenuConstants);

/**
 * the menu relies on dedicated menu actions that arise from defined action names, this epic transforms
 * any givven actionName to actionName+MenuSuffix that is then handled in the menureducer
 * @param actionName
 */
var createEpicTransformActionToMenuAction = function createEpicTransformActionToMenuAction(actionName) {
    return function (action$, storeLite) {
        // console.log('MenuActionEpic Action called ', action$)
        return action$.filter(function (action) {
            return action.type === actionName;
        }).mapTo({
            type: actionName + _MenuConstants2['default'].MENU_ACTION_SUFFIX,
            payload: {
                // getState: storeLite.getState
                getState: storeLite.getState
            }
        });
    };
};

exports['default'] = {
    createEpicTransformActionToMenuAction: createEpicTransformActionToMenuAction
};
module.exports = exports['default'];