var gulp = require('gulp'),
    Eagle = require('../index'),
    _ = require('lodash'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('html', function (src, output, removePath) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    removePath = typeof removePath === 'boolean' ? removePath : config.removePath;

    new Eagle.Task('html', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path)
                .pipe($.if(config.html.include.enabled, $.fileInclude(config.html.include.options)))
                .pipe($.if(config.html.compress.enabled, $.htmlmin(config.html.compress.options)))
                .pipe($.if(removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});