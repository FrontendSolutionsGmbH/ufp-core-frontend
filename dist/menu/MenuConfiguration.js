'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuConfigurationInternal = require('./MenuConfigurationInternal');

var _MenuConfigurationInternal2 = _interopRequireDefault(_MenuConfigurationInternal);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var creators = {};

function getMenuEntryCreator(creator) {
    if (creators[creator] !== undefined) {
        return creators[creator];
    }
    return function createEntry() {
        return [];
    };
}

function registerCreator(creatorName, creator) {
    creators[creatorName] = creator;
}

function uniqueActionNames(actionNamesUnique, actionNamesArray) {
    if (Array.isArray(actionNamesArray)) {
        actionNamesArray.map(function (actionName) {
            if (actionNamesUnique.indexOf(actionName) === -1) {
                actionNamesUnique.push(actionName);
            }
        });
    }
}

function createMenu(MenuConfig, actionNamesArray) {
    var actionNames = [
        //AuthConstants.ActionConstants.AUTHENTICATED,
        //AuthConstants.ActionConstants.UNAUTHENTICATED
    ];
    uniqueActionNames(actionNames, actionNamesArray);
    //console.log('GENERICMENU createGenericMenu', MenuConfig)
    _MenuConfigurationInternal2.default.registerMenuReducer({
        area: MenuConfig.settings.area || 'main',
        subArea: MenuConfig.settings.subArea,
        sortIndex: MenuConfig.settings.sortIndex,
        actionHandler: function actionHandler(data) {
            console.log('GENERICMENU ACTION HANDLER', data);
            function createEntry(item) {
                //console.log('createEntry', item)
                var children = [];
                if (item.children !== undefined) {
                    item.children.map(function (child) {
                        var result = [];
                        if (child.creator !== undefined) {
                            //console.log('createGenericMenu call creator')
                            result = getMenuEntryCreator(child.creator)(child, data);
                            // console.log('createGenericMenu2', result)
                        } else {
                            //console.log('createGenericMenu call createEntry')
                            result = createEntry(child);
                        }
                        result.map(function (entry) {
                            children.push(entry);
                        });
                    });
                }
                var def = {
                    highLight: item.highLight,
                    sortIndex: item.sortIndex,
                    component: item.component,
                    styleClass: item.styleClass
                };
                if (item.intlSortAlphabetically === true) {
                    def.intlSortAlphabetically = true;
                }
                if (children.length) {
                    def.children = children;
                }

                if (item.routeName !== undefined) {
                    def.hash = item.routeName;
                }

                if (item.hash !== undefined) {
                    def.hash = item.hash;
                }

                if (item.callback !== undefined && typeof item.callback === 'function') {
                    def.callback = item.callback;
                }
                return [_MenuConfigurationInternal2.default.createMenuEntry(def)];
            }

            if (MenuConfig.isAuthenticatedSelector(data.getState())) {
                //console.log('GENERICMENU ACTION HANDLER CREATING AUTHENTICATED MENU')
                var menuAuthenticated = [];
                MenuConfig.authenticated.map(function (item) {
                    var result = [];
                    if (item.creator !== undefined) {
                        result = getMenuEntryCreator(item.creator)(item, data);
                    } else {
                        result = createEntry(item);
                    }
                    result.map(function (entry) {
                        menuAuthenticated.push(entry);
                    });
                });
                console.log('menuAuthenticated', menuAuthenticated);

                return (0, _reactAddonsUpdate2.default)(data.state, { $set: menuAuthenticated });
            } else {
                //console.log('GENERICMENU ACTION HANDLER CREATING UNAUTHENTICATED MENU')
                var menuUnauthenticated = [];
                MenuConfig.unauthenticated.map(function (item) {
                    var result = [];
                    if (item.creator !== undefined) {
                        result = getMenuEntryCreator(item.creator)(item, data);
                    } else {
                        result = createEntry(item);
                    }
                    result.map(function (entry) {
                        menuUnauthenticated.push(entry);
                    });
                });
                console.log('menuUnauthenticated', menuUnauthenticated);
                return (0, _reactAddonsUpdate2.default)(data.state, { $set: menuUnauthenticated });
            }
        },
        actionNames: actionNames
    });
}

exports.default = {
    createMenuEntry: _MenuConfigurationInternal2.default.createMenuEntry,
    createMenu: createMenu,
    registerCreator: registerCreator
};