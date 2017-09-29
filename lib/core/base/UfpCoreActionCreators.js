'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UfpCoreConstants = require('../UfpCoreConstants');

var _UfpCoreConstants2 = _interopRequireDefault(_UfpCoreConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startupAction = function startupAction() {
    return {
        type: _UfpCoreConstants2.default.ACTION_NAMES.STARTUP
    };
};

exports.default = {

    startupAction: startupAction

};