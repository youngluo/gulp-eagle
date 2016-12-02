var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('sass', function (src, output) {
    var paths = new Eagle.GulpPaths().src(src).output(output);
    console.log(paths);
    new Eagle.Task('sass', function () {
            this.log(paths.src, paths.output);

            return gulp.src(paths.src.path)
                .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
                .pipe($.sass(config.css.sass.pluginOptions))
                .on('error', function (e) {
                    new Eagle.Notification().error(e, 'Compile  Failed');

                    this.emit('end');
                })
                .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Eagle.Notification('Sass Compiled!'))
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});