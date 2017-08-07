var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watchify = require('watchify'),
    buffer = require('vinyl-buffer'),
    Eagle = require('../index'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    bundle,
    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('browserify', function (src, output) {
    var paths = prepGulpPaths(src, output);

    new Eagle.Task('browserify', function () {
            var stream = config.js.browserify.watchify.enabled ? watchifyStream : browserifyStream;

            bundle = function (stream, paths) {
                this.log(paths.src, paths.output);

                return (
                    stream
                    .bundle()
                    .on('error', function (e) {
                        new Eagle.Notification().error(e, 'Browserify Failed!');

                        this.emit('end');
                    })
                    .pipe(source(paths.output.name))
                    .pipe(buffer())
                    .pipe($.if(config.sourcemaps, $.sourcemaps.init({
                        loadMaps: true
                    })))
                    .pipe($.if(config.production, $.uglify()))
                    .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                    .pipe(gulp.dest(paths.output.baseDir))
                );
            }.bind(this);

            return bundle(
                stream({
                    paths: paths,
                    options: config.js.browserify.options
                }),
                paths
            );
        })
        // We'll add this task to be watched, but Watchify
        // will handle the process, to speed things up.
        .watch();
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function (src, output) {
    return new Eagle.GulpPaths()
        .src(src)
        .output(output, 'bundle.js');
};

/**
 * Get a standard Browserify stream.
 *
 * @param {object} data
 */
var browserifyStream = function (data) {
    var stream = browserify(data.paths.src.path, data.options),
        browserifyConfig = config.js.browserify;

    browserifyConfig.transformers.forEach(function (transformer) {
        if (!config.js.babel.enabled && transformer.name == 'babelify') return;

        stream.transform(
            require(transformer.name), transformer.options || {}
        );
    });

    browserifyConfig.plugins.forEach(function (plugin) {
        stream.plugin(
            require(plugin.name), plugin.options || {}
        );
    });

    if (browserifyConfig.externals.length) {
        stream.external(browserifyConfig.externals);
    }

    return stream;
};

/**
 * Get a Browserify stream, wrapped in Watchify.
 *
 * @param {object} data
 */
var watchifyStream = function (data) {
    var browserify = watchify(
        browserifyStream(data),
        config.js.browserify.watchify.options
    );

    browserify.on('log', gutil.log);
    browserify.on('update', function () {
        bundle(browserify, data.paths);
    });

    return browserify;
};