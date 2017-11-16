'use strict';

var fs = require('fs');
var readdirSync = fs.readdirSync;
var readFileSync = fs.readFileSync;
var path = require('path');
var basename = path.basename;
var extname = path.extname;
var join = path.join;
var nunjucks = require('nunjucks');
var Environment = nunjucks.Environment;
var FileSystemLoader = nunjucks.FileSystemLoader;
var compile = nunjucks.compile;

var TEMPLATE_EXTS = ['.html', '.njk'];

function loadTemplates(root) {
    var templateMap = {};
    var files = readdirSync(root);
    var env = new Environment(new FileSystemLoader(root));
    files.forEach(function (file) {
        var ext = extname(file);
        if (TEMPLATE_EXTS.indexOf(ext) > -1) {
            var key = basename(file, ext);
            templateMap[key] = compile(readFileSync(join(root, file), 'utf8'), env);
        }
    });
    return templateMap;
}

module.exports = loadTemplates;
