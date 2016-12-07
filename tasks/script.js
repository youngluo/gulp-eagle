var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('script', function (src, output, options) {
    if (typeof output == 'object') {
        options = output;
        output = undefined;
    } else {
        options = options || {};
    }

    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('script', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path, {
                    base: options.base || null
                })
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
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe($.if(options.removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe($.if(config.production, new Eagle.Notification('Script Compressd!')))
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});