'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    dynamicIncludeMacro: function dynamicIncludeMacro(filename) {
        return function (nextState, cb) {
            require.ensure([], function (require) {
                /*  Webpack - use require callback to define
                 dependencies for bundling   */
                var Counter = require('.' + filename).default;
                /*  Return getComponent   */
                cb(null, Counter);
                /* Webpack named bundle   */
            }, 'fieldsofapplications');
        };
    }

};