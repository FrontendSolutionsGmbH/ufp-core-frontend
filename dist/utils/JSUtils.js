'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ThrowParam = function ThrowParam(string) {
  throw new Error(string);
};

function pad(pad, str, padRight) {
  if (typeof str === 'undefined') return pad;
  if (padRight) {
    return (str + pad).substring(0, pad.length);
  } else {
    return (pad + str).slice(-pad.length);
  }
}

var factorMethodSkalarArray = function factorMethodSkalarArray(fn) {
  return function (param) {
    if (Array.isArray(param)) {
      // if is array call method for each array item
      data.map(function (item) {
        fn.call(null, item);
      });
    } else {
      // if is no array call method as normal
      fn.call(null, data);
    }
  };
};

exports.default = {
  ThrowParam: ThrowParam,
  pad: pad,
  factorMethodSkalarArray: factorMethodSkalarArray

};