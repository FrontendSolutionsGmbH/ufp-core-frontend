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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UfpList = require('../../react/components/UfpList');

var _UfpList2 = _interopRequireDefault(_UfpList);

var _DefaultMenuItemRenderer = require('./DefaultMenuItemRenderer');

var _DefaultMenuItemRenderer2 = _interopRequireDefault(_DefaultMenuItemRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultMenuRenderer = function (_Component) {
    (0, _inherits3.default)(DefaultMenuRenderer, _Component);

    function DefaultMenuRenderer() {
        (0, _classCallCheck3.default)(this, DefaultMenuRenderer);
        return (0, _possibleConstructorReturn3.default)(this, (DefaultMenuRenderer.__proto__ || Object.getPrototypeOf(DefaultMenuRenderer)).apply(this, arguments));
    }

    (0, _createClass3.default)(DefaultMenuRenderer, [{
        key: 'render',
        value: function render() {
            console.log('Rendering Default Menu ', this.props);
            return _react2.default.createElement(_UfpList2.default, { component: _DefaultMenuItemRenderer2.default,
                data: this.props.data.children });
        }
    }]);
    return DefaultMenuRenderer;
}(_react.Component);

DefaultMenuRenderer.propTypes = {
    data: _propTypes2.default.shape({
        children: _propTypes2.default.array
    }).isRequired
};
DefaultMenuRenderer.defaultProps = {};
exports.default = DefaultMenuRenderer;