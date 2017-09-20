'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HomeView = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _reactIntl = require('react-intl');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeView = exports.HomeView = function (_Component) {
    (0, _inherits3.default)(HomeView, _Component);

    function HomeView() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, HomeView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = HomeView.__proto__ || Object.getPrototypeOf(HomeView)).call.apply(_ref, [this].concat(args))), _this), _this.propTypes = {
            id: _propTypes2.default.string.isRequired,
            defaultMessage: _propTypes2.default,
            values: _propTypes2.default.object
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(HomeView, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_reactIntl.FormattedMessage, { defaultMessage: this.props.defaultMessage,
                id: this.props.id,
                values: this.props.values });
        }
    }]);
    return HomeView;
}(_react.Component);

var mapStateToProps = function mapStateToProps() {
    return {};
};
var mapDispatchToProps = {};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(HomeView);