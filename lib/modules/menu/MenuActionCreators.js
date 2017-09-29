'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MenuConstants = require('./MenuConstants');

var _MenuConstants2 = _interopRequireDefault(_MenuConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menuClick = function menuClick(menuEntry, pushActionCreator) {
    return function (dispatch, getState) {
        if (menuEntry.hash) {
            return dispatch(pushActionCreator(menuEntry.hash));
        } else if (menuEntry.callback) {
            menuEntry.callback({
                menuEntry: menuEntry,
                dispatch: dispatch,
                globalState: getState()
            });
            return Promise.resolve();
        }
    };
};

var menuOpen = function menuOpen(menuItem) {
    return {
        type: _MenuConstants2.default.ActionConstants.MENU_OPEN,
        payload: {
            menuItem: { id: menuItem.id }
        }
    };
};

var menuSwitchOpenClose = function menuSwitchOpenClose(menuItem, area, path) {
    return {
        type: _MenuConstants2.default.ActionConstants.MENU_SWITCH_OPENCLOSE,
        payload: {
            menuItem: { id: menuItem.id },
            pathInfo: {
                area: area,
                path: path
            }
        }
    };
};

var menuClose = function menuClose(menuItem) {
    if (menuItem.open) {
        return {
            type: _MenuConstants2.default.ActionConstants.MENU_CLOSE,
            payload: {
                menuItem: { id: menuItem.id }
            }
        };
    }
};

exports.default = {
    menuClick: menuClick,
    menuOpen: menuOpen,
    menuSwitchOpenClose: menuSwitchOpenClose,
    menuClose: menuClose
};