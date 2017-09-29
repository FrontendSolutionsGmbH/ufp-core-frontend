'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ResultHandlerResult = require('../utils/ResultHandlerResult');

var _ResultHandlerResult2 = _interopRequireDefault(_ResultHandlerResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestType = 'JSON';

var matcher = function matcher(ufpHandling) {
    var ufpAction = ufpHandling.ufpAction,
        requestResponse = ufpHandling.requestResponse;

    return ufpAction.ufpDefinition.requestType === requestType && requestResponse.status === 200;
};

var handler = function handler(ufpHandling) {
    // console.log('UFPMiddleware JSON handling: ', ufpHandling)
    var dispatch = ufpHandling.dispatch,
        ufpAction = ufpHandling.ufpAction,
        requestResponse = ufpHandling.requestResponse;
    //  // console.log('UFPResultHandler OK Handling ', ufpHandling)
    // on succes dispatch the received data from here and return hanbdled=true AND success=true

    var dispatchAction = {
        type: ufpAction.ufpTypes.SUCCESS,
        payload: {
            ufpAction: { ufpData: ufpAction.ufpData,
                ufpDefinition: ufpAction.ufpDefinition
            },
            data: requestResponse.data
        }
        // console.log('UFPMiddleware JSON dispatching', JSON.stringify(dispatchAction))
    };dispatch(dispatchAction);
    return Promise.resolve(new _ResultHandlerResult2.default(true, true, false));
};

exports.default = {
    requestType: requestType,
    matcher: matcher,
    handler: handler
};