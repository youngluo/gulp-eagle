var gulp = require('gulp'),
    _ = require('lodash'),
    gutils = require('gulp-util'),
    Eagle = require('../index'),
    browserSync = require('browser-sync').create(),

    config = Eagle.config;

Eagle.extend('browserSync', function () {

    var options = _.extend({}, config.browserSync, {
        files: [config.buildPath + '/**'],
        available: true,
        reloadDelay: 0,
        server: {
            baseDir: config.buildPath
        }
    });

    console.log(options)

    // Browsersync will only run during `gulp watch`.

    if (gutils.env._.indexOf('watch') > -1) {
        browserSync.init(options);
    }

    new Eagle.Task('browserSync', function () {}).watch();
});