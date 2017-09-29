"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var randomItem = exports.randomItem = function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
};

exports.default = {
    randomItem: randomItem
};