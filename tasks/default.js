var gulp = require('gulp'),
    _ = require('lodash'),
    sequence = require('gulp-sequence'),
    Eagle = require('../index'),

    config = Eagle.config;

gulp.task('default', function (cb) {
    var tasks = _.map(Eagle.tasks, function (task) {
        return task.name;
    });

    if (config.version.enabled && config.production) {
        tasks.push('version');
    }

    sequence.apply(this, tasks)(cb);
});