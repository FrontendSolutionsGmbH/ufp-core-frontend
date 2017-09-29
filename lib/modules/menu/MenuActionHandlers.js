'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _MenuConstants$Action;

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _MenuConstants = require('./MenuConstants');

var _MenuConstants2 = _interopRequireDefault(_MenuConstants);

var _ObjectUtils = require('../../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _MenuInternalUtils = require('./MenuInternalUtils');

var _MenuInternalUtils2 = _interopRequireDefault(_MenuInternalUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_MenuConstants$Action = {}, (0, _defineProperty3.default)(_MenuConstants$Action, _MenuConstants2.default.ActionConstants.MENU_OPEN, function (state, action) {
    var updater = _ObjectUtils2.default.buildUpdateObjectSetValue(_MenuInternalUtils2.default.findPathForMenuId(state.MenuData, action.payload.menuItem.id).path + '.open', true);
    return (0, _reactAddonsUpdate2.default)(state, { MenuData: updater });
}), (0, _defineProperty3.default)(_MenuConstants$Action, _MenuConstants2.default.ActionConstants.MENU_CLOSE, function (state, action) {
    var updater = _ObjectUtils2.default.buildUpdateObjectSetValue(_MenuInternalUtils2.default.findPathForMenuId(state.MenuData, action.payload.menuItem.id).path + '.open', false);
    return (0, _reactAddonsUpdate2.default)(state, { MenuData: updater });
}), (0, _defineProperty3.default)(_MenuConstants$Action, _MenuConstants2.default.ActionConstants.MENU_SWITCH_OPENCLOSE, function (state, action) {
    var pathAndValue = _MenuInternalUtils2.default.findPathForMenuId(state.MenuData, action.payload.menuItem.id);
    var updater = _ObjectUtils2.default.buildUpdateObjectSetValue(pathAndValue.path + '.open', !pathAndValue.value.open);
    return (0, _reactAddonsUpdate2.default)(state, { MenuData: updater });
}), _MenuConstants$Action);