var gulp = require('gulp'),
    Eagle = require('../index'),
    _ = require('lodash'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('style', function (src, output, removePath) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    removePath = typeof removePath === 'boolean' ? removePath : config.removePath;

    new Eagle.Task('style', function () {
            return gulpTask.call(this, paths)
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe($.if(removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});

Eagle.extend('styleIn', function (src, output) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('styleIn', function () {
            return gulpTask.call(this, paths)
                .pipe($.concat(paths.output.name))
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe(gulp.dest(paths.output.baseDir))
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});

function gulpTask(paths) {
    this.log(paths.src, paths.output);

    return gulp.src(paths.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
        .pipe($.if(config.production, $.cssnano(config.css.cssnano.pluginOptions)))
}