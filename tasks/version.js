var fs = require('fs'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    gulp = require('gulp'),
    Eagle = require('../index'),
    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('version', function (src) {
    var paths = new Eagle.GulpPaths().src(src).output(),
        files = vinylPaths(),
        manifest = config.buildPath + '/rev-manifest.json';

    new Eagle.Task('version', function () {
            this.log(paths.src, paths.output);


            delBuildHashFiles(manifest);

            return (
                gulp.src(paths.src.path, {
                    base: config.buildPath
                })
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(files)
                .pipe($.rev())
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe($.rev.manifest({
                    merge: true
                }))
                .pipe(gulp.dest(paths.output.baseDir))
                .on('end', function () {
                    del(files.paths, {
                        force: true
                    });
                })
            )
        })
        .watch(manifest)
});

function delBuildHashFiles(manifest) {
    fs.stat(manifest, function (err, stat) {
        if (!err) {
            manifest = JSON.parse(fs.readFileSync(manifest));

            for (var key in manifest) {
                del.sync(config.buildPath + '/' + manifest[key], {
                    force: true
                });
            }
        }
    });
};