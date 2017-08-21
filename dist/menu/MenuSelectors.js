'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MenuReducerName = require('./MenuReducerName');

var _MenuReducerName2 = _interopRequireDefault(_MenuReducerName);

var MenuState = function MenuState(state) {
    return state[_MenuReducerName2['default'].get()];
};

exports.MenuState = MenuState;
var MenuDefinitionSelector = function MenuDefinitionSelector(state) {
    return MenuState(state).MenuDefinition;
};
exports.MenuDefinitionSelector = MenuDefinitionSelector;
var MenuDataSelector = function MenuDataSelector(state) {
    return MenuState(state).MenuData;
};

exports.MenuDataSelector = MenuDataSelector;
var MenuSubAreasSortedSelector = function MenuSubAreasSortedSelector(state, props) {
    var data = MenuDataSelector(state);
    var keysSorted;
    if (props.menuAreaName !== undefined && data !== undefined && data[props.menuAreaName] !== undefined) {
        keysSorted = Object.keys(data[props.menuAreaName]).sort(function (a, b) {
            if (data[props.menuAreaName][a].sortIndex !== -1 && data[props.menuAreaName][b].sortIndex !== -1) {
                return data[props.menuAreaName][a].sortIndex - data[props.menuAreaName][b].sortIndex;
            } else {
                if (data[props.menuAreaName][a].sortIndex === -1 && data[props.menuAreaName][a].sortIndex === -1) {
                    return 0;
                } else if (data[props.menuAreaName][a].sortIndex === -1) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
    } else {
        keysSorted = [];
    }
    var sortedItems = [];
    keysSorted.map(function (item) {
        sortedItems.push(data[props.menuAreaName][item].items);
    });
    return sortedItems;
};

exports.MenuSubAreasSortedSelector = MenuSubAreasSortedSelector;
var MenuSubAreaSelector = function MenuSubAreaSelector(state, props) {
    var data = MenuDataSelector(state);
    return data[props.menuAreaName][props.menuSubAreaName].items;
};

exports.MenuSubAreaSelector = MenuSubAreaSelector;
var MenuDeferedActionsSelector = function MenuDeferedActionsSelector(state) {
    return MenuState(state).DeferedActionsList;
};

exports.MenuDeferedActionsSelector = MenuDeferedActionsSelector;
exports['default'] = {
    MenuSubAreaSelector: MenuSubAreaSelector,
    MenuDefinitionSelector: MenuDefinitionSelector,
    MenuDataSelector: MenuDataSelector,
    MenuDeferedActionsSelector: MenuDeferedActionsSelector,
    MenuSubAreasSortedSelector: MenuSubAreasSortedSelector
};