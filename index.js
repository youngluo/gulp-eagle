var fs = require('fs'),
    gulp = require('gulp'),
    _ = require('lodash'),
    gutils = require('gulp-util');

/**
 * init class
 * @param {function} recipe callback
 */
var Eagle = function (recipe) {

    // Loading all default tasks
    require('require-dir')('./tasks');

    recipe(Eagle.mixins);

    createGulpTasks.call(Eagle);
}

Eagle.mixins = {};

Eagle.plugins = require('gulp-load-plugins')();

// Get Logger class 
Eagle.Log = require('./Logger');

// Get Notification class
Eagle.Notification = require('./Notification');

// Get GulpPaths class
Eagle.GulpPaths = require('./GulpPaths');

// Read config info
Eagle.config = require('./Config');

// Get Task class
Eagle.Task = require('./Task')(Eagle);

// Read the init task by config
Eagle.tasks = Eagle.config.tasks;

Eagle.extend = function (name, callback) {
    this.mixins[name] = function () {
        callback.apply(this, arguments);

        return this.mixins;
    }.bind(this);
};


function createGulpTasks() {
    var tasks = this.tasks;

    tasks.forEach(function (task) {
        if (_.includes(gulp.tasks, task.name)) return;

        gulp.task(task.name, function () {

            if (_.intersection(gutils.env._, [task.name, 'watch']).length) {
                return _.where(tasks, {
                        name: task.name
                    })
                    .forEach(function (task) {
                        task.run();
                    });
            }

            return Eagle.Task.find(task.name).run();
        });
    });
};

module.exports = Eagle;

Eagle(function (mix) {
    mix.copy('a', 'b');
})