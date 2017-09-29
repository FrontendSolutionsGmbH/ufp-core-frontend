'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _JSUtils = require('../../utils/JSUtils');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dummy for eslint without standard-react
console.log('dummy for eslint without standard-react usage of Provider import', _reactRedux.Provider);
var _Providers = [];
var _RootSibblings = [];
var _RootNode = null;
var _ReactApp = null;
var _ReactAppCreatorFunction = null;

var Runfest = {
    name: 'ufp-react',
    description: 'Ufp React Runfest ',

    register: function register(_ref) {
        var _ref$rootNode = _ref.rootNode,
            rootNode = _ref$rootNode === undefined ? (0, _JSUtils.ThrowParam)('HTML RootNode required for initialisation of ufp-react ') : _ref$rootNode,
            _ref$appCreatorFuncti = _ref.appCreatorFunction,
            appCreatorFunction = _ref$appCreatorFuncti === undefined ? (0, _JSUtils.ThrowParam)('JSX Root Component appCreatorFunction required for initialisation of ufp-react') : _ref$appCreatorFuncti;

        _RootNode = rootNode;
        _ReactAppCreatorFunction = appCreatorFunction;
        console.log('ufp-react root:', rootNode);
        console.log('ufp-react aappCreatorFunctionpp:', appCreatorFunction);
    },

    registerProvider: function registerProvider(_ref2) {
        var component = _ref2.component;

        console.log('ufp-react root provider registered:', component);
        _Providers.push(component);
    },

    registerRootSibbling: function registerRootSibbling(_ref3) {
        var _ref3$component = _ref3.component,
            component = _ref3$component === undefined ? (0, _JSUtils.ThrowParam)('component Root sibbling has to be set') : _ref3$component;

        console.log('ufp-react root sibbling :', component);
        _RootSibblings.push(component);
    },

    onPreStartup: function onPreStartup(_ref4) {
        var UfpCore = _ref4.UfpCore;

        console.log('onPreStartup called React ', UfpCore);
        _ReactApp = _ReactAppCreatorFunction({ UfpCore: UfpCore });

        console.log('ufp-react', _RootNode, _ReactApp);

        var App = _ReactApp;

        var currentRootComponent = _react2.default.createElement(App, null);

        var sibblings = [];
        console.log('Root Sibblings are ', sibblings);

        _RootSibblings.map(function (item) {
            var Component = item;
            sibblings.push(_react2.default.createElement(Component, null));
        });

        _Providers.map(function (item, index) {
            var Component = item;
            // remark: here the enclosing div is required because some root
            // component providers rely on single child policy ... tsts even china got rid of it...
            // trick here is summing up all providers as childs
            currentRootComponent = _react2.default.createElement(
                Component,
                null,
                index === 0 ? sibblings.length === 0 ? currentRootComponent : _react2.default.createElement(
                    'div',
                    null,
                    currentRootComponent,
                    sibblings
                ) : currentRootComponent
            );
        });
        console.log('RootComponent is  ', currentRootComponent);

        _reactDom2.default.render(_react2.default.createElement(
            _reactRedux.Provider,
            { store: UfpCore.getStore() },
            currentRootComponent
        ), _RootNode);
    }
};

exports.default = Runfest;