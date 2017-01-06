var gulp = require('gulp'),
    Eagle = require('../index'),
    _ = require('lodash'),

    $ = Eagle.plugins,
    bs = Eagle.BS,
    config = Eagle.config;

Eagle.extend('html', function (src, output, options) {
    var params = Eagle.methods.processParams(src, output, options),
        options = params.options,
        paths = new Eagle.GulpPaths().src(params.src).output(params.output);

    new Eagle.Task('html', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path, {
                    base: options.base
                })
                .pipe($.if(config.html.include.enabled, $.fileInclude(config.html.include.options)))
                .pipe($.if(config.html.compress.enabled, $.htmlmin(config.html.compress.options)))
                .pipe($.if(options.removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
                .on('end', bs.reload)
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});