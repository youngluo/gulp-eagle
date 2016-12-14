var path = require('path'),
    gulp = require('gulp'),
    _ = require('lodash'),
    batch = require('gulp-batch'),
    bs = require('browser-sync').create(),
    Eagle = require('../index'),

    $ = Eagle.plugins,
    config = Eagle.config;


gulp.task('watch', function () {
    var tasks = _.sortBy(Eagle.tasks, 'name'),
        mergedTasks = {};

    if (isWatchingBrowserify(tasks)) {
        Eagle.config.js.browserify.watchify.enabled = true;

        gulp.start('browserify');
    }

    // Merge task watchers, if the task is the same.

    tasks.forEach(function (task) {
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
            $.watch(task.watchers, batch(Eagle.config.batchOptions, function (events) {
                events.on('end', gulp.start(task.name));
            }));
        }
    });

    if (config.browserSync.enabled) {
        browserSync();
    }
});


function isWatchingBrowserify(tasks) {
    return _.find(tasks, function (task) {
        return task.name == 'browserify';
    });
}


function browserSync() {
    var baseDir = config.browserSync.baseDir,

        options = _.extend({}, config.browserSync.options, {
            files: [config.buildPath + '/**/*', '!' + config.buildPath + '/**/*.map'],
            available: true,
            reloadDelay: 0,
            server: {
                baseDir: baseDir ? path.join(config.buildPath, baseDir) : config.buildPath
            }
        });

    bs.init(options);
}