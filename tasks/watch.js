var gulp = require('gulp'),
    _ = require('lodash'),
    batch = require('gulp-batch'),
    Eagle = require('../index');


gulp.task('watch', function () {
    var tasks = _.sortBy(Eagle.tasks, 'name');

    var mergedTasks = {};

    if (isWatchingBrowserify(tasks)) {
        Eagle.config.js.browserify.watchify.enabled = true;

        gulp.start('browserify');
    }

    tasks.forEach(function (task) {

        // Merge task watchers, if the task is the same.
        if (task.name in mergedTasks) {
            return mergedTasks[task.name].watchers = _.union(mergedTasks[task.name].watchers, task.watchers);
        }

        mergedTasks[task.name] = {
            name: task.name,
            watchers: Array.isArray(task.watchers) ? task.watchers : [task.watchers]
        };
    });

    _.sortBy(mergedTasks, 'name').forEach(function (task) {
        if (task.watchers.length) {
            gulp.watch(task.watchers, batch(Eagle.config.batchOptions, function (events) {
                events.on('end', gulp.start(task.name));
            }));
        }
    });
});

/**
 * Determine if Browserify is included in the list.
 *
 * @param  {object} tasks
 * @return {boolean}
 */
var isWatchingBrowserify = function (tasks) {
    return _.contains(_.pluck(tasks, 'name'), 'browserify');
};