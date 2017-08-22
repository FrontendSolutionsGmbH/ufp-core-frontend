'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MenuConstants = require('./MenuConstants');

var _MenuConstants2 = _interopRequireDefault(_MenuConstants);

var _ConfigureEpics = require('../epic/ConfigureEpics');

var _ConfigureEpics2 = _interopRequireDefault(_ConfigureEpics);

var _MenuActionEpicCreator = require('./epics/MenuActionEpicCreator');

var _MenuActionEpicCreator2 = _interopRequireDefault(_MenuActionEpicCreator);

var _JSUtils = require('../utils/JSUtils');

var _JSUtils2 = _interopRequireDefault(_JSUtils);

var _MenuInternalUtils = require('./MenuInternalUtils');

var _MenuInternalUtils2 = _interopRequireDefault(_MenuInternalUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmptyFunc = function EmptyFunc() {};

var MenuConfigurationInternal = function () {
    function MenuConfigurationInternal() {
        var _this = this;

        _classCallCheck(this, MenuConfigurationInternal);

        this.MenuDefinition = [];
        this.MenuData = {};

        this.registerMenuReducer = function (_ref) {
            var _ref$area = _ref.area,
                area = _ref$area === undefined ? 'main' : _ref$area,
                _ref$sortIndex = _ref.sortIndex,
                sortIndex = _ref$sortIndex === undefined ? -1 : _ref$sortIndex,
                subArea = _ref.subArea,
                actionName = _ref.actionName,
                _ref$actionNames = _ref.actionNames,
                actionNames = _ref$actionNames === undefined ? [] : _ref$actionNames,
                actionHandler = _ref.actionHandler,
                _ref$initialState = _ref.initialState,
                initialState = _ref$initialState === undefined ? [] : _ref$initialState;

            //console.log('MenuConfigurator registerMenuReducer', arguments)
            //console.log('MenuConfigurator registerMenuReducer', area, actionNames, actionHandler, initialState)

            if (!subArea) {
                throw new Error('UFP Menu Configuration SubArea needs to be defined');
            }
            // // console.log('Register Menu Reducer called ', area, actionNames, actionHandler, actionName)

            // create an empty place for the menu reducer to live in
            if (!_this.MenuData[area]) {
                _this.MenuData[area] = {};
            }

            if (!_this.MenuData[area][subArea]) {
                _this.MenuData[area][subArea] = {};
                _this.MenuData[area][subArea].items = initialState;
                _this.MenuData[area][subArea].sortIndex = sortIndex;
            }
            var menuDef = {
                // todo/fixme: generalize/centralize generation of ufp id objects!
                area: area,
                sortIndex: sortIndex,
                actionName: actionName + _MenuConstants2.default.MENU_ACTION_SUFFIX,
                subArea: subArea,
                initialState: initialState,
                actionHandler: actionHandler
            };
            // append to menu definition hash using action name as key for quick access to the action handler

            //

            if (Array.isArray(actionNames)) {
                // for quick reference put all original action names into handled actions to be found easily by menureducer to defer its call to the ones renamed in the menu entry
                actionNames.map(function (currentActionName) {
                    // // console.log('Register Menu Reducer called adding item ', currentActionName)
                    if (_this.MenuDefinition[currentActionName] === undefined) {
                        _this.MenuDefinition[currentActionName] = [];
                    }
                    _this.MenuDefinition[currentActionName].push(Object.assign({}, menuDef, { actionName: currentActionName + _MenuConstants2.default.MENU_ACTION_SUFFIX }));
                    /**
                     * create and register an epic of the form: action->action_Menu meaning that the list of actions is going to get
                     * transformed with the menu suffix, this is handled as before just that no UfpActor is needed to watch over the state
                     *
                     */
                    _ConfigureEpics2.default.registerEpic({ epic: _MenuActionEpicCreator2.default.createEpicTransformActionToMenuAction(currentActionName) });
                });
            }
            if (actionName) {
                // // console.log('Register Menu Reducer called adding item single', actionName)
                if (_this.MenuDefinition[actionName] === undefined) {
                    _this.MenuDefinition[actionName] = [];
                }
                _this.MenuDefinition[actionName].push(menuDef);
                _ConfigureEpics2.default.registerEpic({ epic: _MenuActionEpicCreator2.default.createEpicTransformActionToMenuAction(actionName) });
            }
        };

        this.getMenuData = function () {
            return _this.MenuData;
        };

        this.getMenuDefinition = function () {
            return _this.MenuDefinition;
        };
    }

    _createClass(MenuConfigurationInternal, [{
        key: 'createMenuEntry',
        value: function createMenuEntry(_ref2) {
            var _ref2$open = _ref2.open,
                open = _ref2$open === undefined ? false : _ref2$open,
                _ref2$sortIndex = _ref2.sortIndex,
                sortIndex = _ref2$sortIndex === undefined ? 0 : _ref2$sortIndex,
                _ref2$component = _ref2.component,
                component = _ref2$component === undefined ? _JSUtils2.default.ThrowParam('react component has to be set') : _ref2$component,
                href = _ref2.href,
                styleClass = _ref2.styleClass,
                hash = _ref2.hash,
                highLight = _ref2.highLight,
                _ref2$callback = _ref2.callback,
                callback = _ref2$callback === undefined ? EmptyFunc : _ref2$callback,
                _ref2$children = _ref2.children,
                children = _ref2$children === undefined ? [] : _ref2$children;

            return {
                id: _MenuInternalUtils2.default.createRandomId(),
                hash: hash,
                open: open,
                styleClass: styleClass,
                component: component,
                sortIndex: sortIndex,
                highLight: highLight,
                href: href,
                callback: callback,
                children: children
            };
        }
    }]);

    return MenuConfigurationInternal;
}();

exports.default = new MenuConfigurationInternal();