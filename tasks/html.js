var gulp = require('gulp'),
    Eagle = require('../index'),
    _ = require('lodash'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('html', function (src, output, options) {
    if (typeof output == 'object') {
        options = output;
        output = undefined;
    }

    options = _.merge({
        base: null,
        removePath: true
    }, options);

    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('html', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path, {
                    base: options.base
                })
                .pipe($.if(options.removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});