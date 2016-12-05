var gulp = require('gulp'),
    Eagle = require('../index'),

    $ = Eagle.plugins;

Eagle.extend('clean', function (src) {

    new Eagle.Task('clean', function () {
        this.log(src);

        return (
            gulp
            .src(src)
            .pipe($.rimraf())
        );
    });
});