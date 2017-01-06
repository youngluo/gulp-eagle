var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    bs = Eagle.BS,
    config = Eagle.config;

Eagle.extend('merge', function (src, output) {
    var paths = new Eagle.GulpPaths().src(src).output(output),
        extension = paths.src.extension,
        isCss = isCssFile(extension),
        isJs = isJsFile(extension),
        isJson = isJsonFile(extension);

    new Eagle.Task('merge', function () {
            this.log(paths.src, paths.output);

            return (
                gulp
                .src(paths.src.path)
                .pipe($.if(isCss || isJs, $.concat(paths.output.name)))
                .pipe($.if(isJs && config.production, $.uglify({
                    compress: {
                        drop_console: true
                    }
                })))
                .pipe($.if(isCss && config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
                .pipe($.if(isCss && config.production, $.cssnano(config.css.cssnano.pluginOptions)))
                .pipe($.if(isJson, $.mergeJson(paths.output.name)))
                .pipe(gulp.dest(paths.output.baseDir))
                .on('end', bs.reload)
            );
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});

function isJsonFile(ext) {
    return '.json' == ext.toLowerCase();
}

function isCssFile(ext) {
    return '.css' == ext.toLowerCase();
}

function isJsFile(ext) {
    return '.js' == ext.toLowerCase();
}