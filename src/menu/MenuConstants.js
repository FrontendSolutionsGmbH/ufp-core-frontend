const ActionConstants = {
    MENU_OPEN: 'MENU_OPEN',
    MENU_CLOSE: 'MENU_CLOSE',
    MENU_SWITCH_OPENCLOSE: 'MENU_SWITCH_OPENCLOSE'
}
const MenuStateEnum ={
    ENABLED: 'ENABLED',
    DISABLED: 'DISABLED'
}
const MenuEntryTypeEnum ={
    ENTRY: 'ENTRY',
    DIVIDER: 'DIVIDER'
}

export default{
    MENU_ACTION_SUFFIX: '_MENU',
    ActionConstants,
    MenuStateEnum,
    MenuEntryTypeEnum
}
