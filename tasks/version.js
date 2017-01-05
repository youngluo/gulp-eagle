var fs = require('fs'),
    del = require('del'),
    gulp = require('gulp'),
    Eagle = require('../index'),
    $ = Eagle.plugins,
    config = Eagle.config;

gulp.task('pre-version', function () {

    var src = config.buildPath + '/**/*.{' + config.version.join(',') + '}';

    return (
        gulp.src(src, {
            base: config.buildPath
        })
        .pipe($.rev())
        .pipe(gulp.dest(config.buildPath))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.buildPath))
    )
});

gulp.task('version', ['pre-version'], function () {

    var manifest = config.buildPath + '/rev-manifest.json',
        src = config.buildPath + '/**/*.{html,js,css}',
        manifestStream = gulp.src(manifest);

    return (
        gulp.src(src, {
            base: config.buildPath
        })
        .pipe($.revReplace({
            manifest: manifestStream,
            prefix: config.cdn
        }))
        .pipe(gulp.dest(config.buildPath))
        .on('end', function () {
            delOriginalFiles(config.buildPath, manifest);
        })
    )
});

function delOriginalFiles(buildPath, manifest) {
    fs.stat(manifest, function (err, stat) {
        if (!err) {
            manifest = JSON.parse(fs.readFileSync(manifest));

            for (var key in manifest) {
                del.sync(buildPath + '/' + key, {
                    force: true
                });
            }
        }
    });
}