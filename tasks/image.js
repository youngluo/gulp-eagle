var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    bs = Eagle.BS,
    config = Eagle.config;

Eagle.extend('image', function (src, output, options) {
    var params = Eagle.methods.processParams(src, output, options),
        options = params.options,
        paths = new Eagle.GulpPaths().src(params.src).output(params.output);

    new Eagle.Task('image', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path, {
                    base: options.base
                })
                .pipe($.if(config.production, $.imagemin({
                    progressive: true
                })))
                .pipe($.if(options.removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe($.if(config.production, new Eagle.Notification('Image Compressd!')))
                .on('end', bs.reload)
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});