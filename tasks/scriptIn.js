var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('scriptIn', function (src, output) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('scriptIn', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path)
                .pipe($.concat(paths.output.name))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Eagle.Notification('Script merged!'))
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});