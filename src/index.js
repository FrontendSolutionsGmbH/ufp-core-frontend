import * as _UfpCore from './core'

export const UfpCore = _UfpCore
export const STARTUP_ACTION_NAME = _UfpCore.STARTUP_ACTION_NAME


// Deprecated, use {import} es6 import syntax
export default {
    ..._UfpCore
}
