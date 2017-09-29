'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IntlSelectors = require('../IntlSelectors');

var _IntlSelectors2 = _interopRequireDefault(_IntlSelectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UfpIntlProvider = function UfpIntlProvider(_ref) {
    var randomKey = _ref.randomKey,
        locale = _ref.locale,
        messages = _ref.messages,
        children = _ref.children;

    console.log('Intl Provider rendering', locale, messages, randomKey);
    return _react2.default.createElement(
        _reactIntl.IntlProvider,
        { key: randomKey,
            locale: locale,
            messages: messages
        },
        children
    );
};

UfpIntlProvider.propTypes = {
    children: _propTypes2.default.object.isRequired,
    locale: _propTypes2.default.string.isRequired,
    messages: _propTypes2.default.object,
    randomKey: _propTypes2.default.number.isRequired
};

UfpIntlProvider.defaultProps = {
    messages: {}
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        locale: _IntlSelectors2.default.CurrentLanguageSelector(state),
        messages: _IntlSelectors2.default.CurrentLanguageMessagesSelector(state),
        randomKey: _IntlSelectors2.default.randomIntlKey(state)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(UfpIntlProvider);