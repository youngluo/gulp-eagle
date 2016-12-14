var del = require('del'),
    vinylPaths = require('vinyl-paths'),
    gulp = require('gulp'),
    Eagle = require('../index'),
    $ = Eagle.plugins,
    config = Eagle.config;

gulp.task('pre-version', function () {

    var files = vinylPaths(),
        src = config.buildPath + '/**/*.{' + config.version.join(',') + '}';

    return (
        gulp.src(src, {
            base: config.buildPath
        })
        .pipe(files)
        .pipe($.rev())
        .pipe(gulp.dest(config.buildPath))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.buildPath))
        .on('end', function () {
            del(files.paths, {
                force: true
            });
        })
    )
});

gulp.task('version', ['pre-version'], function () {

    var manifest = config.buildPath + '/rev-manifest.json',
        src = config.buildPath + '/**/*.{html,js,css}';

    manifest = gulp.src(manifest);

    return (
        gulp.src(src, {
            base: config.buildPath
        })
        .pipe($.revReplace({
            manifest: manifest,
            prefix: config.cdn
        }))
        .pipe(gulp.dest(config.buildPath))
    )
});