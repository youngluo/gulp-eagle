var gulp = require('gulp'),
    Eagle = require('../index'),
    _ = require('lodash'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('script', function (src, output, options) {
    var params = Eagle.methods.processParams(src, output, options),
        options = params.options,
        paths = new Eagle.GulpPaths().src(params.src).output(params.output);

    new Eagle.Task('script', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path, {
                    base: options.base
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