'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var UFPHandlerPropTypeDefinition = _propTypes2['default'].shape({
    matcher: _propTypes2['default'].func.isRequired,
    handler: _propTypes2['default'].func.isRequired
});

var UFPHandlerPropTypeDefinitionArray = {
    input: _propTypes2['default'].arrayOf(UFPHandlerPropTypeDefinition).isRequired
};
var UFPHandlerPropTypeDefinitionObject = {
    input: UFPHandlerPropTypeDefinition.isRequired
};

var UFPHandler = (function () {
    function UFPHandler(handler) {
        _classCallCheck(this, UFPHandler);

        if (_Util2['default'].PropTypesCheck({ input: handler }, UFPHandlerPropTypeDefinitionArray)) {
            this.handlerArray = handler;
        } else if (_Util2['default'].ReactPropTypesCheck({ input: handler }, UFPHandlerPropTypeDefinitionObject)) {
            this.handlerArray = [handler];
        } else {
            this.handlerArray = [];
        }
    }

    _createClass(UFPHandler, [{
        key: 'registerHandler',
        value: function registerHandler(handlerObj) {
            if (_Util2['default'].PropTypesCheck({ input: handlerObj }, UFPHandlerPropTypeDefinitionArray)) {
                this.handlerArray = this.handlerArray.concat(handlerObj);
            } else if (_Util2['default'].PropTypesCheck({ input: handlerObj }, UFPHandlerPropTypeDefinitionObject)) {
                this.handlerArray.push(handlerObj);
            }
        }
    }, {
        key: 'handle',
        value: function handle(resultData) {
            var _this = this;

            var result = new Promise(function callee$2$0(resolve) {
                var ufpErrorHandlerResultPromiseArray, promiseAll;
                return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            ufpErrorHandlerResultPromiseArray = [];

                            this.handlerArray.map(function (handlerObject) {
                                if (handlerObject.matcher(resultData)) {
                                    ufpErrorHandlerResultPromiseArray.push(handlerObject.handler(resultData));
                                }
                            });
                            context$3$0.next = 4;
                            return regeneratorRuntime.awrap(Promise.all(ufpErrorHandlerResultPromiseArray));

                        case 4:
                            promiseAll = context$3$0.sent;

                            resolve(promiseAll);

                        case 6:
                        case 'end':
                            return context$3$0.stop();
                    }
                }, null, _this);
            });
            return result;
        }
    }, {
        key: 'handleSuccessive',
        value: function handleSuccessive(resultData) {
            var _this2 = this;

            // // console.log('handleSuccessive 2')
            var result = new Promise(function callee$2$0(resolve) {
                var handled, i, handlerObject, handlerRes;
                return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            if (!(this.handlerArray.length === 0)) {
                                context$3$0.next = 4;
                                break;
                            }

                            // // console.log('handleSuccessive 3')
                            resolve({
                                'break': false,
                                handled: false
                            });
                            context$3$0.next = 18;
                            break;

                        case 4:
                            handled = false;
                            i = 0;

                        case 6:
                            if (!(i < this.handlerArray.length)) {
                                context$3$0.next = 17;
                                break;
                            }

                            handlerObject = this.handlerArray[i];

                            if (handled) {
                                context$3$0.next = 14;
                                break;
                            }

                            if (!handlerObject.matcher(resultData)) {
                                context$3$0.next = 14;
                                break;
                            }

                            context$3$0.next = 12;
                            return regeneratorRuntime.awrap(handlerObject.handler(resultData));

                        case 12:
                            handlerRes = context$3$0.sent;

                            // // console.log('handleSuccessive 6', handlerRes)
                            if (handlerRes.handled) {
                                // // console.log('handleSuccessive 7', handlerRes)
                                handled = true;
                                resolve(handlerRes);
                            }

                        case 14:
                            i++;
                            context$3$0.next = 6;
                            break;

                        case 17:
                            if (!handled) {
                                resolve({
                                    'break': false,
                                    handled: false
                                });
                            }

                        case 18:
                        case 'end':
                            return context$3$0.stop();
                    }
                }, null, _this2);
            });
            return result;
        }
    }, {
        key: 'get',
        value: function get() {
            return this.handlerArray;
        }
    }]);

    return UFPHandler;
})();

exports['default'] = UFPHandler;
module.exports = exports['default'];

// // console.log('handleSuccessive 2')

// // console.log('handleSuccessive 4')

// // console.log('handleSuccessive 5', handlerObject)