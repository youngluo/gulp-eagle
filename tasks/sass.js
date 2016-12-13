var gulp = require('gulp'),
    Eagle = require('../index'),
    _ = require('lodash'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('sass', function (src, output, options) {
    if (typeof output == 'object') {
        options = output;
        output = undefined;
    }

    options = _.merge({
        base: null,
        removePath: true
    }, options);

    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('sass', function () {
            this.log(paths.src, paths.output);

            return (
                gulp.src(paths.src.path, {
                    base: options.base
                })
                .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
                .pipe($.sass(config.css.sass.pluginOptions))
                .on('error', function (e) {
                    new Eagle.Notification().error(e, 'Sass Compile Failed');

                    this.emit('end');
                })
                .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe($.if(options.removePath, $.rename({
                    dirname: ''
                })))
                .pipe($.rev())
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Eagle.Notification('Sass Compiled!'))
            )
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});