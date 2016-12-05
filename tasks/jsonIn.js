var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('jsonIn', function (src, output) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    console.log(paths);

    new Eagle.Task('jsonIn', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path)
                .pipe($.mergeJson('a.json'))
                .pipe($.if(config.production, $.uglify()))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Eagle.Notification('Json Merged!'))
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});