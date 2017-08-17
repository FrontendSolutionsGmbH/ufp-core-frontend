'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var ActionConstants = {
    'UFP_STARTUP_NEXT_STAGE': 'UFP_STARTUP_NEXT_STAGE',
    'UFP_STARTUP_FINISHED': 'UFP_STARTUP_FINISHED',
    'UFP_STARTUP_NO_STEPS': 'UFP_STARTUP_NO_STEPS'
};

var LoadingStateEnum = {
    'UNINITIALISED': 'notLoaded',
    'SUCCESS': 'success',
    'LOADING': 'loading',
    'FAILURE': 'failure'
};

exports['default'] = {
    ActionConstants: ActionConstants,
    LoadingStateEnum: LoadingStateEnum
};
module.exports = exports['default'];