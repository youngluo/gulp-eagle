global.gulp = require('gulp');
global.plugins = require('gulp-load-plugins')();
global._ = require('lodash');

const Builder = require('./utils/gulpBuilder');

function Eagle(callback) {
  // Loading all default tasks.
  require('require-dir')('./tasks');

  callback(Eagle.mixins);

  Eagle.tasks.forEach(task => {
    Builder.create(task);
  });
}

// This object stores all of the various gulp tasks.
Eagle.mixins = {};

/**
 * The tasks array stores all tasks that should be executed each time
 * you trigger Gulp from the command line.
 */
Eagle.tasks = [];

Eagle.config = require('./Config');

/**
* Register a new task with Eagle.
*
* @param {string} gulp-eagle task name
* @param {Function} callback
*/
Eagle.extend = function (name, callback) {
  this.mixins[name] = function () {
    callback.apply(this, arguments);

    return this.mixins;
  }.bind(this);
};

global.Eagle = Eagle;

module.exports = Eagle;
