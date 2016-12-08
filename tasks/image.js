var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('image', function (src, output) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('image', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path)
                .pipe($.if(config.production, $.imagemin({
                    progressive: true
                })))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe($.if(config.production, new Eagle.Notification('Image Compressd!')))
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});