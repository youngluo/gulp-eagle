var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins;

Eagle.extend('copy', function (src, output, options) {
    var params = Eagle.methods.processParams(src, output, options),
        options = params.options,
        paths = new Eagle.GulpPaths().src(params.src).output(params.output);

    new Eagle.Task('copy', function () {
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