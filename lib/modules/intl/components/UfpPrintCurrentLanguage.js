'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UfpPrintCurrentLanguage = undefined;

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _IntlSelectors = require('../IntlSelectors');

var _IntlSelectors2 = _interopRequireDefault(_IntlSelectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UfpPrintCurrentLanguage = exports.UfpPrintCurrentLanguage = function (_Component) {
    (0, _inherits3.default)(UfpPrintCurrentLanguage, _Component);

    function UfpPrintCurrentLanguage() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, UfpPrintCurrentLanguage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UfpPrintCurrentLanguage.__proto__ || Object.getPrototypeOf(UfpPrintCurrentLanguage)).call.apply(_ref, [this].concat(args))), _this), _this.propTypes = {
            currentLanguage: _propTypes2.default.string
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(UfpPrintCurrentLanguage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_reactIntl.FormattedMessage, { defaultMessage: this.props.currentLanguage,
                id: 'language_label_' + this.props.currentLanguage });
        }
    }]);
    return UfpPrintCurrentLanguage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        currentLanguage: _IntlSelectors2.default.CurrentLanguageSelector(state)
    };
};
var mapDispatchToProps = {};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UfpPrintCurrentLanguage);