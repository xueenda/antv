'use strict';
var debug = require('debug')('lib:imagemin-dir');
var path = require('path');
var extname = path.extname;
var join = path.join;
var _ = require('lodash');
var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');
var sharp = require('sharp');
var sizeOf = require('image-size');
var walk = require('walk').walk;
var shelljs = require('shelljs');
var mv = shelljs.mv;

// TODO PNG only

var DEFAULT_OPTIONS = {
    width: 800,
    // resizeRatio: 0.5,
    quality: '65-80',
    callback: function () {
    }
};

module.exports = function (dir, options) {
    options = _.assign({}, DEFAULT_OPTIONS, options);
    // var resizeRatio = options.resizeRatio;
    var width = 800;
    debug(dir);

    // resizing
    var walker = walk(dir, { followLinks: false });
    walker.on('file', function (root, stat, next) {
        var filename = join(root, stat.name);
        var targetFilename = filename + '-temp.png';
        var ext = extname(filename);
        if (ext === '.png') {
            var size = sizeOf(filename);
            if (size.width <= width) {
                next();
            } else {
                var resizeRatio = width / size.width;
                var newHeight = size.height * resizeRatio;
                sharp(filename)
                    .resize(width, newHeight)
                    .toFile(targetFilename, function (err) {
                        if (err) {
                            debug(err);
                        }
                        mv('-f', targetFilename, filename);
                        next();
                    });
            }
        } else {
            next();
        }
    });
    walker.on('end', function () {
        debug('stop walking');
        var dirWalker = walk(dir, { followLinks: false });
        dirWalker.on('directory', function (root, stat, next) {
            var pathname = join(root, stat.name);
            imagemin([pathname + '/*.png'], pathname, {
                plugins: [
                    imageminPngquant({
                        quality: options.quality
                    })
                ]
            }).then(function (files) {
                debug(files.map(function (file) {
                    return file.path;
                }));
                next();
            });
        });
        dirWalker.on('end', function () {
            options.callback();
        });
    });
};
