var fs = require('fs'),
    gulp = require('gulp'),
    _ = require('lodash'),
    gutils = require('gulp-util');

/**
 * init class
 * @param {function} recipe callback
 */
function Eagle(recipe) {

    //loading all default tasks
    require('require-dir')('./tasks');

    recipe(Eagle.mixins);

}

Eagle.mixins = {};

Eagle.plugins = require('gulp-load-plugins')();

Eagle.config = require('./Config');

//Elixir.Task = require('./Task')(Elixir);

//read the init task by config
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
        if (_.contains(gulp.tasks, task.name)) return;

        gulp.task(task.name, function () {

            if (_.intersection(gutils.env._, [task.name, 'watch']).length) {
                return _.where(tasks, {
                        name: task.name
                    })
                    .forEach(function (task) {
                        task.run();
                    });
            }

            var gulp = Elixir.Task.find(task.name).run();

            Elixir.config.activeTasks[task.name]++;

            return gulp;
        });
    });
};


module.exports = Eagle;