var gulp = require('gulp'),
    Eagle = require('../index');

Eagle.extend('task', function (name, watcher) {
    var task = new Eagle.Task('task', function () {
        return gulp.start(name);
    });

    if (watcher) {
        task.watch(watcher);
    }
});