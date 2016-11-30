var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins;

Eagle.extend('copy', function (src, output) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('copy', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path)
                .pipe($.if(!paths.output.isDir, $.rename(paths.output.name)))
                .pipe(gulp.dest(paths.output.baseDir))
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});