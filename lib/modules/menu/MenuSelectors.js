'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MenuDeferedActionsSelector = exports.MenuSubAreaSelector = exports.MenuSubAreasSortedSelector = exports.MenuDataSelector = exports.MenuDefinitionSelector = exports.MenuState = undefined;

var _MenuConstants = require('./MenuConstants');

var _MenuConstants2 = _interopRequireDefault(_MenuConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuState = exports.MenuState = function MenuState(state) {
    return state[_MenuConstants2.default.NAME];
};

var MenuDefinitionSelector = exports.MenuDefinitionSelector = function MenuDefinitionSelector(state) {
    return MenuState(state).MenuDefinition;
};
var MenuDataSelector = exports.MenuDataSelector = function MenuDataSelector(state) {
    return MenuState(state).MenuData || {};
};

var MenuSubAreasSortedSelector = exports.MenuSubAreasSortedSelector = function MenuSubAreasSortedSelector(state, props) {
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

var MenuSubAreaSelector = exports.MenuSubAreaSelector = function MenuSubAreaSelector(state, props) {
    var data = MenuDataSelector(state);
    return data && data[props.menuAreaName] && data[props.menuAreaName][props.menuSubAreaName].items || {};
};

var MenuDeferedActionsSelector = exports.MenuDeferedActionsSelector = function MenuDeferedActionsSelector(state) {
    return MenuState(state).DeferedActionsList;
};

exports.default = {
    MenuSubAreaSelector: MenuSubAreaSelector,
    MenuDefinitionSelector: MenuDefinitionSelector,
    MenuDataSelector: MenuDataSelector,
    MenuDeferedActionsSelector: MenuDeferedActionsSelector,
    MenuSubAreasSortedSelector: MenuSubAreasSortedSelector
};