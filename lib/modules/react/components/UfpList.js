'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UFPList = function UFPList(_ref) {
    var data = _ref.data,
        props = _ref.props,
        component = _ref.component,
        _ref$inputRef = _ref.inputRef,
        inputRef = _ref$inputRef === undefined ? undefined : _ref$inputRef;

    var content = [];
    if (data && data.map) {
        data.map(function (item, index) {
            var ComponentNew = component;
            console.log('Rendering UFP ComponentNew', ComponentNew);
            content.push(_react2.default.createElement(ComponentNew, (0, _extends3.default)({ data: item
            }, props, {
                key: 'list-' + (item.id || item.name || index) })));
        });
    }
    /**
     * note:
     *  until react 16 is out we have to contain it in a wrapped <div> :(
     */
    if (content.length == null) {
        return null;
    } else {
        return _react2.default.createElement(
            'div',
            null,
            content
        );
    }
};

UFPList.propTypes = {
    component: _propTypes2.default.any,
    data: _propTypes2.default.array.isRequired,
    inputRef: _propTypes2.default.func,
    props: _propTypes2.default.any
};
UFPList.defaultProps = {
    props: {},
    component: _react2.default.createElement('div', null),
    data: [],
    inputRef: undefined
};

exports.default = UFPList;