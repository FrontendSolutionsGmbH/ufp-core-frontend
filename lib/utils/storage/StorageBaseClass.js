'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JSUtils = require('../JSUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StorageBaseClass = function () {
    function StorageBaseClass(storageKey) {
        (0, _classCallCheck3.default)(this, StorageBaseClass);

        this.storageKey = storageKey;
    }

    (0, _createClass3.default)(StorageBaseClass, [{
        key: 'setItem',
        value: function setItem(key, value) {
            var obj = JSON.parse(window.localStorage.getItem(this.storageKey)) || {};
            obj[key] = value;
            window.localStorage.setItem(this.storageKey, JSON.stringify(obj));
        }
    }, {
        key: 'getItem',
        value: function getItem(key, defaultVal) {
            var obj = JSON.parse(window.localStorage.getItem(this.storageKey)) || {};
            if (!obj[key]) {
                obj[key] = defaultVal;
                window.localStorage.setItem(this.storageKey, JSON.stringify(obj));
            }
            return obj[key];
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            var obj = JSON.parse(window.localStorage.getItem(this.storageKey)) || {};
            if (obj[key]) {
                obj[key] = undefined;
            }
            window.localStorage.setItem(this.storageKey, JSON.stringify(obj));
        }

        // removes all key they are not in keArray

    }, {
        key: 'removeAllExcept',
        value: function removeAllExcept(keyArray) {
            var obj = JSON.parse(window.localStorage.getItem(this.storageKey)) || {};
            for (var key in obj) {
                if (!(0, _JSUtils._Includes)(keyArray, key)) {
                    if (obj[key]) {
                        obj[key] = undefined;
                    }
                }
            }
            window.localStorage.setItem(this.storageKey, JSON.stringify(obj));
        }
    }, {
        key: 'clear',
        value: function clear() {
            window.localStorage.removeItem(this.storageKey);
        }
    }]);
    return StorageBaseClass;
}();

exports.default = StorageBaseClass;