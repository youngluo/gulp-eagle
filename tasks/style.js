var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('style', function (src, output, options) {
    if (typeof output == 'object') {
        options = output;
        output = undefined;
    } else {
        options = options || {};
    }

    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('style', function () {
            this.log(paths.src, paths.output);

            return gulp.src(paths.src.path, {
                    base: options.base || null
                })
                .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
                .pipe($.if(config.production, $.cssnano(config.css.cssnano.pluginOptions)))
                .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe($.if(options.removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe($.if(config.production, new Eagle.Notification('Style Compressd!')))
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});