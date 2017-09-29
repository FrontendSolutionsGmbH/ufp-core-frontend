'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoaderDisplay = undefined;

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

var _StartupSelectors = require('../StartupSelectors');

var _StartupSelectors2 = _interopRequireDefault(_StartupSelectors);

var _DefaultLoaderView = require('./DefaultLoaderView');

var _DefaultLoaderView2 = _interopRequireDefault(_DefaultLoaderView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoaderDisplay = exports.LoaderDisplay = function (_Component) {
    (0, _inherits3.default)(LoaderDisplay, _Component);

    function LoaderDisplay() {
        (0, _classCallCheck3.default)(this, LoaderDisplay);
        return (0, _possibleConstructorReturn3.default)(this, (LoaderDisplay.__proto__ || Object.getPrototypeOf(LoaderDisplay)).apply(this, arguments));
    }

    (0, _createClass3.default)(LoaderDisplay, [{
        key: 'render',
        value: function render() {
            if (this.props.appInitialized) {
                return this.props.appComponent;
            } else {
                var _Component2 = this.props.loaderComponent;
                return _react2.default.createElement(_Component2, this.props);
            }
        }
    }]);
    return LoaderDisplay;
}(_react.Component);

LoaderDisplay.propTypes = {
    loaderComponent: _propTypes2.default.any.isRequired,
    appComponent: _propTypes2.default.any.isRequired,
    totalPercentage: _propTypes2.default.number.isRequired,
    stagePercentage: _propTypes2.default.number.isRequired,
    stepPercentage: _propTypes2.default.number.isRequired,
    appInitialized: _propTypes2.default.bool.isRequired,
    defaultMessage: _propTypes2.default.string,
    values: _propTypes2.default.object
};
LoaderDisplay.defaultProps = {

    loaderComponent: _DefaultLoaderView2.default

};


var mapStateToProps = function mapStateToProps(state) {
    return {
        appInitialized: _StartupSelectors2.default.AppInitialisedSelector(state),
        totalPercentage: _StartupSelectors2.default.TotalPercentageSelector(state),
        stagePercentage: _StartupSelectors2.default.StagePercentageSelector(state),
        stepPercentage: _StartupSelectors2.default.StepPercentageSelector(state)
    };
};
var mapDispatchToProps = {};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LoaderDisplay);