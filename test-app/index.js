global.gulp = require('gulp');
global.plugins = require('gulp-load-plugins')();
global._ = require('lodash');

const Builder = require('./utils/GulpBuilder');

function Eagle(callback) {
  // Loading all default tasks.
  require('require-dir')('./tasks');

  callback(Eagle.mixins);

  Eagle.tasks.forEach(task => {
    Builder.create(task);
  });
}

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

require('./utils/loadDependencies');

module.exports = Eagle;
