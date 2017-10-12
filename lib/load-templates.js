'use strict';

var _require = require('fs'),
    readdirSync = _require.readdirSync,
    readFileSync = _require.readFileSync;

var _require2 = require('path'),
    basename = _require2.basename,
    extname = _require2.extname,
    join = _require2.join;

var _require3 = require('nunjucks'),
    Environment = _require3.Environment,
    FileSystemLoader = _require3.FileSystemLoader,
    compile = _require3.compile;

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
