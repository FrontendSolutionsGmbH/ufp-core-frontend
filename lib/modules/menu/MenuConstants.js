'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ActionConstants = {
    MENU_OPEN: 'MENU_OPEN',
    MENU_CLOSE: 'MENU_CLOSE',
    MENU_SWITCH_OPENCLOSE: 'MENU_SWITCH_OPENCLOSE'
};
var MenuStateEnum = {
    ENABLED: 'ENABLED',
    DISABLED: 'DISABLED'
};
var MenuEntryTypeEnum = {
    ENTRY: 'ENTRY',
    DIVIDER: 'DIVIDER'
};

exports.default = {
    DEFAULT_AREA: 'default',
    DEFAULT_SUBAREA: 'default-sub',
    NAME: 'ufp-menu',
    MENU_ACTION_SUFFIX: '_MENU',
    ActionConstants: ActionConstants,
    MenuStateEnum: MenuStateEnum,
    MenuEntryTypeEnum: MenuEntryTypeEnum
};