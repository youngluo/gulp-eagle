var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('merge', function (src, output) {
    var paths = new Eagle.GulpPaths().src(src).output(output),
        extension = paths.src.extension;

    new Eagle.Task('merge', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path)
                .pipe($.if(isStaticResource(extension), $.concat(paths.output.name)))
                .pipe($.if(isJosn(extension), $.mergeJson(paths.output.name)))
                .pipe(gulp.dest(paths.output.baseDir))
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});

function isJosn(ext) {
    return '.json' == ext;
}


function isStaticResource(ext) {
    return ['.js', '.css'].indexOf(ext) > -1 ? true : false;
}