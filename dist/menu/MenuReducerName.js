'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuReducerName = function MenuReducerName() {
    var _this = this;

    (0, _classCallCheck3.default)(this, MenuReducerName);

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
        value: 'ufpMenu',
        writable: false
    });
    this.reducerName = 'ufpMenu';
};

exports.default = new MenuReducerName();