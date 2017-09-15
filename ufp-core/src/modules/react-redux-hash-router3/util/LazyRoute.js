export default {

    dynamicIncludeMacro:
        (filename) => (nextState, cb) => {
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const Counter = require('.' + filename).default
            /*  Return getComponent   */
            cb(null, Counter)
            /* Webpack named bundle   */
        }, 'fieldsofapplications')
    }

}
