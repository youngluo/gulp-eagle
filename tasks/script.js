var gulp = require('gulp'),
    Eagle = require('../index'),
    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('script', function (src, output, removePath) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    removePath = typeof removePath === 'boolean' ? removePath : config.removePath;

    new Eagle.Task('script', function () {
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

Eagle.extend('scriptIn', function (src, output) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('scriptIn', function () {
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

    return (
        gulp
        .src(paths.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe($.if(config.js.babel.enabled, $.babel(config.js.babel.options)))
        .on('error', function (e) {
            new Eagle.Notification().error(e, 'Babel Compilation Failed!');
            this.emit('end');
        })
        .pipe($.if(config.production, $.uglify({
            compress: {
                drop_console: true
            }
        })))
    );
}