var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watchify = require('watchify'),
    buffer = require('vinyl-buffer'),
    Eagle = require('../index'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    bs = require('browser-sync').create(),

    bundle,
    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('browserify', function (src, output, options) {
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
                    .pipe(new Eagle.Notification('Browserify Compiled!'))
                );
            }.bind(this);

            return bundle(
                stream({
                    paths: paths,
                    options: options || config.js.browserify.options
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
    var stream = browserify(data.paths.src.path, data.options);

    config.js.browserify.transformers.forEach(function (transformer) {
        stream.transform(
            require(transformer.name), transformer.options || {}
        );
    });

    config.js.browserify.plugins.forEach(function (plugin) {
        stream.plugin(
            require(plugin.name), plugin.options || {}
        );
    });

    config.js.browserify.externals.forEach(function (external) {
        stream.external(external);
    });

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