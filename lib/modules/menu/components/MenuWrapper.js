'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MenuSelectors = require('../MenuSelectors');

var _MenuSelectors2 = _interopRequireDefault(_MenuSelectors);

var _MenuActionCreators = require('../MenuActionCreators');

var _MenuActionCreators2 = _interopRequireDefault(_MenuActionCreators);

var _MenuConstants = require('../MenuConstants');

var _MenuConstants2 = _interopRequireDefault(_MenuConstants);

var _DefaultMenuAreaRenderer = require('./DefaultMenuAreaRenderer');

var _DefaultMenuAreaRenderer2 = _interopRequireDefault(_DefaultMenuAreaRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuWrapper = function (_Component) {
    (0, _inherits3.default)(MenuWrapper, _Component);

    function MenuWrapper() {
        (0, _classCallCheck3.default)(this, MenuWrapper);
        return (0, _possibleConstructorReturn3.default)(this, (MenuWrapper.__proto__ || Object.getPrototypeOf(MenuWrapper)).apply(this, arguments));
    }

    (0, _createClass3.default)(MenuWrapper, [{
        key: 'render',
        value: function render() {
            console.log('Rendering Wrapped Menu ', this.props);
            var Component = this.props.menuRenderer;
            return _react2.default.createElement(Component, { menuArea: this.props.menuItems,
                menuAreaName: this.props.menuAreaName,
                menuSubAreaName: this.props.menuSubAreaName });
        }
    }]);
    return MenuWrapper;
}(_react.Component);

MenuWrapper.propTypes = {
    menuAreaName: _propTypes2.default.string,
    menuSubAreaName: _propTypes2.default.string,
    menuRenderer: _propTypes2.default.any,
    menuItems: _propTypes2.default.array
};
MenuWrapper.defaultProps = {

    menuAreaName: _MenuConstants2.default.DEFAULT_AREA,
    menuSubAreaName: _MenuConstants2.default.DEFAULT_SUBAREA,
    menuRenderer: _DefaultMenuAreaRenderer2.default
};


var mapStateToProps = function mapStateToProps(state, props) {
    return {
        menuItems: _MenuSelectors2.default.MenuSubAreaSelector(state, {
            menuAreaName: props.menuAreaName,
            menuSubAreaName: props.menuSubAreaName
        })
    };
};

var mapDispatchToProps = {
    menuClick: _MenuActionCreators2.default.menuClick,
    menuClose: _MenuActionCreators2.default.menuClose,
    menuSwitchOpenClose: _MenuActionCreators2.default.menuSwitchOpenClose,
    menuOpen: _MenuActionCreators2.default.menuOpen
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MenuWrapper);