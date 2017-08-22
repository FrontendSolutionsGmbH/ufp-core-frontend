'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StartupReducerName = function StartupReducerName() {
    var _this = this;

    (0, _classCallCheck3.default)(this, StartupReducerName);

    this.set = function (newName) {
        if (_this.setCalled) {
            return _this.reducerName;
        } else {
            _this.setCalled = true;
            _this.reducerName = newName;
            return _this.reducerName;
        }
    };

    this.get = function () {
        return _this.reducerName;
    };

    this.reset = function () {
        _this.reducerName = _this.reducerNameOriginal;
        _this.setCalled = false;
        return _this.reducerName;
    };

    this.setCalled = false;
    Object.defineProperty(this, 'reducerNameOriginal', {
        value: 'ufpStartup',
        writable: false
    });
    this.reducerName = 'ufpStartup';
};

exports.default = new StartupReducerName();