'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UfpManifestPropType = _propTypes2.default.shape({

    type: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired,
    description: _propTypes2.default.string,
    register: _propTypes2.default.func.isRequired
});

exports.default = {

    PropType: UfpManifestPropType

};