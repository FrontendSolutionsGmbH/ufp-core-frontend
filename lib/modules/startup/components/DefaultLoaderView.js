'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DefaultLoaderView = undefined;

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

require('./DefaultLoaderView.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultLoaderView = exports.DefaultLoaderView = function (_Component) {
    (0, _inherits3.default)(DefaultLoaderView, _Component);

    function DefaultLoaderView() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DefaultLoaderView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DefaultLoaderView.__proto__ || Object.getPrototypeOf(DefaultLoaderView)).call.apply(_ref, [this].concat(args))), _this), _this.propTypes = {

            totalPercentage: _propTypes2.default.number.isRequired,
            stagePercentage: _propTypes2.default.number.isRequired,
            stepPercentage: _propTypes2.default.number.isRequired

        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DefaultLoaderView, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { id: 'ufp-loader' },
                _react2.default.createElement(
                    'div',
                    { id: 'ufp-spinner' },
                    _react2.default.createElement('div', { className: 'ufp-loader-bar',
                        style: {

                            height: this.props.totalPercentage + '%'
                        } }),
                    _react2.default.createElement('div', { className: 'ufp-loader-bar',
                        style: {

                            height: this.props.stepPercentage + '%'
                        } }),
                    _react2.default.createElement('div', { className: 'ufp-loader-bar',
                        style: {

                            height: this.props.stagePercentage + '%'
                        } })
                )
            );
        }
    }]);
    return DefaultLoaderView;
}(_react.Component);

exports.default = DefaultLoaderView;