'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _MenuConstants$ActionConstants$MENU_OPEN$MenuConstants$ActionConstants$MENU_CLOSE$MenuConstants$ActionConstants$MENU_SWITCH_OPENCLOSE;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _MenuConstants = require('./MenuConstants');

var _MenuConstants2 = _interopRequireDefault(_MenuConstants);

var _utilsObjectUtils = require('../utils/ObjectUtils');

var _utilsObjectUtils2 = _interopRequireDefault(_utilsObjectUtils);

var _MenuUtils = require('./MenuUtils');

var _MenuUtils2 = _interopRequireDefault(_MenuUtils);

exports['default'] = (_MenuConstants$ActionConstants$MENU_OPEN$MenuConstants$ActionConstants$MENU_CLOSE$MenuConstants$ActionConstants$MENU_SWITCH_OPENCLOSE = {}, _defineProperty(_MenuConstants$ActionConstants$MENU_OPEN$MenuConstants$ActionConstants$MENU_CLOSE$MenuConstants$ActionConstants$MENU_SWITCH_OPENCLOSE, _MenuConstants2['default'].ActionConstants.MENU_OPEN, function (state, action) {
    var updater = _utilsObjectUtils2['default'].buildUpdateObjectSetValue(_MenuUtils2['default'].findPathForMenuId(state.MenuData, action.payload.menuItem.id).path + '.open', true);
    return (0, _reactAddonsUpdate2['default'])(state, { MenuData: updater });
}), _defineProperty(_MenuConstants$ActionConstants$MENU_OPEN$MenuConstants$ActionConstants$MENU_CLOSE$MenuConstants$ActionConstants$MENU_SWITCH_OPENCLOSE, _MenuConstants2['default'].ActionConstants.MENU_CLOSE, function (state, action) {
    var updater = _utilsObjectUtils2['default'].buildUpdateObjectSetValue(_MenuUtils2['default'].findPathForMenuId(state.MenuData, action.payload.menuItem.id).path + '.open', false);
    return (0, _reactAddonsUpdate2['default'])(state, { MenuData: updater });
}), _defineProperty(_MenuConstants$ActionConstants$MENU_OPEN$MenuConstants$ActionConstants$MENU_CLOSE$MenuConstants$ActionConstants$MENU_SWITCH_OPENCLOSE, _MenuConstants2['default'].ActionConstants.MENU_SWITCH_OPENCLOSE, function (state, action) {
    var pathAndValue = _MenuUtils2['default'].findPathForMenuId(state.MenuData, action.payload.menuItem.id);
    var updater = _utilsObjectUtils2['default'].buildUpdateObjectSetValue(pathAndValue.path + '.open', !pathAndValue.value.open);
    return (0, _reactAddonsUpdate2['default'])(state, { MenuData: updater });
}), _MenuConstants$ActionConstants$MENU_OPEN$MenuConstants$ActionConstants$MENU_CLOSE$MenuConstants$ActionConstants$MENU_SWITCH_OPENCLOSE);
module.exports = exports['default'];