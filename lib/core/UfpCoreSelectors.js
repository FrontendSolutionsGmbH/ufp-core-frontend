"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// import UfpCoreConstants from './UfpCoreConstants'

// old method trying to keep ufp node but it makes things far too complicated
// const getUfpState = (state) => state[UfpCoreConstants.STATE_NAME]
// so just return state
var getUfpState = function getUfpState(state) {
    return state;
};

exports.default = {
    getUfpState: getUfpState
};