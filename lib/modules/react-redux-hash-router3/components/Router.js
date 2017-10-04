'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Router = require('react-router/lib/Router');

var _Router2 = _interopRequireDefault(_Router);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = function Router(props) {
    return _react2.default.createElement(_Router2.default, { children: props.routes,
        history: props.history });
};

Router.propTypes = {
    routes: _propTypes2.default.object,
    history: _propTypes2.default.object
};
exports.default = Router;