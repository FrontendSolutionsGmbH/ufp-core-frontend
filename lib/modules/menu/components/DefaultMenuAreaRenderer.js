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

var _DefaultMenuRenderer = require('./DefaultMenuRenderer');

var _DefaultMenuRenderer2 = _interopRequireDefault(_DefaultMenuRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultMenuAreaRenderer = function (_Component) {
    (0, _inherits3.default)(DefaultMenuAreaRenderer, _Component);

    function DefaultMenuAreaRenderer() {
        (0, _classCallCheck3.default)(this, DefaultMenuAreaRenderer);
        return (0, _possibleConstructorReturn3.default)(this, (DefaultMenuAreaRenderer.__proto__ || Object.getPrototypeOf(DefaultMenuAreaRenderer)).apply(this, arguments));
    }

    (0, _createClass3.default)(DefaultMenuAreaRenderer, [{
        key: 'render',
        value: function render() {
            console.log('Rendering Default Menu Area ', this.props);
            return _react2.default.createElement(_UfpList2.default, { component: _DefaultMenuRenderer2.default,
                data: this.props.menuArea });
        }
    }]);
    return DefaultMenuAreaRenderer;
}(_react.Component);

DefaultMenuAreaRenderer.propTypes = {
    menuArea: _propTypes2.default.array.isRequired
};
DefaultMenuAreaRenderer.defaultProps = {};
exports.default = DefaultMenuAreaRenderer;