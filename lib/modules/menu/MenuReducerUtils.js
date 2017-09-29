'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInitialState = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _MenuConfigurationInternal = require('./MenuConfigurationInternal');

var _MenuConfigurationInternal2 = _interopRequireDefault(_MenuConfigurationInternal);

var _MenuInternalUtils = require('./MenuInternalUtils');

var _MenuInternalUtils2 = _interopRequireDefault(_MenuInternalUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getInitialState = exports.getInitialState = function getInitialState() {
    console.log('Initial State Menu called ', _MenuConfigurationInternal2.default);
    console.log(_MenuConfigurationInternal2.default);

    return {

        MenuData: _MenuConfigurationInternal2.default.getMenuData(),
        MenuDefinition: _MenuConfigurationInternal2.default.getMenuDefinition(),
        DeferedActionsList: []
    };
};

var MenuActionListReducer = function MenuActionListReducer(state, action) {
    // console.log('MenuReducer Called', state, action)
    var menuEntryAll = state.MenuDefinition[action.type];
    // console.log('MenuReducer Called menudef entry is ', menuEntryAll)

    if (menuEntryAll !== undefined) {
        var pushedalread = {};
        menuEntryAll.map(function (menuEntry) {
            // // console.log('MenuReducer entry found ', menuEntry)

            // if menu registered action is encountered, store the aftermath
            // action in the action list to be executed after the "normal" action
            // handlers for that action have done their work
            // this defered actions is then called from the menuactor
            if (pushedalread[menuEntry.actionName] === undefined) {
                state = (0, _reactAddonsUpdate2.default)(state, { DeferedActionsList: { $push: [menuEntry.actionName] } });
            }
            pushedalread[menuEntry.actionName] = true;
            // // console.log('MenuReducer new state is', state)
            // // console.log('MenuReducer new defer is', [menuEntry.actionName])
        });
        return state;
    } else {
        // check if entry is in defer list and call reducer for menu
        if (state.DeferedActionsList.indexOf(action.type) !== -1) {
            // // console.log('MenuReducedr action is in defered list, check for menu
            // reducers and remove entry from defered list')
            for (var i in state.MenuDefinition) {
                var _menuEntryAll = state.MenuDefinition[i];
                if (_menuEntryAll !== undefined) {
                    _menuEntryAll.map(function (menuEntry) {
                        if (menuEntry.actionName === action.type || Array.isArray(menuEntry.actionNames) && menuEntry.actionNames.indexOf(action.type) !== -1) {
                            // call menu reducer with its state from this reducer
                            // // console.log('MenuReducer Called menudef entry is 1', menuEntry)
                            // // console.log('MenuReducer Called menudef state is 2',
                            // state.MenuData[menuEntry.area][menuEntry.subArea])
                            var newLocalState = menuEntry.actionHandler({
                                getState: action.payload.getState,
                                state: state.MenuData[menuEntry.area][menuEntry.subArea].items,
                                action: action
                            });
                            if (Array.isArray(newLocalState)) {
                                newLocalState.map(function (menuEntry) {
                                    _MenuInternalUtils2.default.sortAllChildren(menuEntry);
                                });
                            }
                            // retrieve the local state for the menu, each menu reducer
                            // shall just receive its local menu definition
                            state = (0, _reactAddonsUpdate2.default)(state, {
                                MenuData: (0, _defineProperty3.default)({}, menuEntry.area, (0, _defineProperty3.default)({}, menuEntry.subArea, { items: { $set: newLocalState } }))
                            });
                        }
                    });
                }
            }
            // remove defered action from list
            // // console.log('MenuReducer removing defered action', action)
            state = (0, _reactAddonsUpdate2.default)(state, {
                DeferedActionsList: { $splice: [[state.DeferedActionsList.indexOf(action.type), 1]] }
            });
        }
        return state;
    }
};

exports.default = {
    getInitialState: getInitialState,
    MenuActionListReducer: MenuActionListReducer
};