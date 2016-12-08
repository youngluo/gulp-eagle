var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('html', function (src, output, options) {
    if (typeof output == 'object') {
        options = output;
        output = undefined;
    } else {
        options = options || {};
    }

    var manifest = config.buildPath + '/**/rev-manifest.json';

    src = Array.isArray(src) ? src.contact(manifest) : [src, manifest];

    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('html', function () {
            this.log(paths.src, paths.output);

            manifest = gulp.src(manifest);

            return (
                gulp
                .src(paths.src.path)
                .pipe($.revReplace({
                    manifest: manifest,
                    prefix: config.cdn
                }))
                .pipe($.if(options.removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});