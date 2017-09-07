// simple point: I don't want to merge arrays
const {
    isPlainObject
} = require('lodash');

const slice = Array.prototype.slice;

function toString(obj) {
    return {}.toString.call(obj);
}

function arrayFromSecondElement(arr) {
    return slice.call(arr, 1);
}

function assignDeep(dest) {
    arrayFromSecondElement(arguments).forEach(src => {
        if (isPlainObject(src)) {
            for (const prop in src) {
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
