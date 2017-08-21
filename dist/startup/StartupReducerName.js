'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StartupReducerName = function StartupReducerName() {
    var _this = this;

    _classCallCheck(this, StartupReducerName);

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