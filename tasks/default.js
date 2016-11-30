var gulp = require('gulp'),
    _ = require('lodash'),
    Eagle = require('../index'),
    sequence = require('gulp-sequence');

gulp.task('default', function (cb) {
    var tasks = _.map(Eagle.tasks, function (task) {
        return task.name;
    }).join(',');

    sequence(tasks)(cb);
});