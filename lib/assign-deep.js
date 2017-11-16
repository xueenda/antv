'use strict';

// simple point: I don't want to merge arrays
var _ = require('lodash');
var isPlainObject = _.isPlainObject;

var slice = Array.prototype.slice;

function toString(obj) {
    return {}.toString.call(obj);
}

function arrayFromSecondElement(arr) {
    return slice.call(arr, 1);
}

function assignDeep(dest) {
    arrayFromSecondElement(arguments).forEach(function (src) {
        if (isPlainObject(src)) {
            for (var prop in src) {
                if (toString(src[prop]) !== toString(dest[prop])) {
                    dest[prop] = src[prop];
                } else {
                    if (isPlainObject(src[prop])) {
                        assignDeep(dest[prop], src[prop]);
                    } else {
                        dest[prop] = src[prop];
                    }
                }
            }
        } else {
            Object.assign(dest, src);
        }
    });
    return dest;
}

module.exports = assignDeep;
