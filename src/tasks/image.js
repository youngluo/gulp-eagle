var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('image', function (src, output, removePath) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    removePath = typeof removePath === 'boolean' ? removePath : config.removePath;

    new Eagle.Task('image', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path)
                .pipe($.if(config.production, $.imagemin({
                    progressive: true
                })))
                .pipe($.if(removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});