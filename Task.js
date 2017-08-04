var _ = require('lodash');

var id = 0,
  Eagle;

/**
 * Create a Task constructor.
 *
 * @param {string}   name
 * @param {Function} description detailed task
 */
var Task = function (name, description) {
  this.id = id++;
  this.name = name;
  this.watchers = [];

  if (description) {
    this.definition = description;

    this.register();

    return this;
  }
};

Task.find = function (name) {
  var tasks = _.filter(Eagle.tasks, function (task) {
    return task.name == name;
  });

  return tasks[Eagle.config.activeTasks[name]];
};

/**
 * Set the task to be called, when firing `Gulp`.
 *
 * @return {Task}
 */
Task.prototype.register = function () {
  Eagle.tasks.push(this);

  // Make a single task can be triggered multiple times.
  Eagle.config.activeTasks = Eagle.config.activeTasks || {};
  Eagle.config.activeTasks[this.name] = 0;

  return this;
};

/**
 * Execute the task definition.
 */
Task.prototype.run = function () {
  return this.definition()
    .on('finish', Eagle.BS.reload);
};

/**
 * Set a path regex to watch for changes.
 *
 * @param  {string}      regex
 * @param  {string|null} category
 * @return {Task}
 */
Task.prototype.watch = function (regex) {
  if (regex) {
    if (Array.isArray(regex)) {
      this.watchers = _.union(this.watchers, regex);
    } else {
      this.watchers.push(regex);
    }
  }

  return this;
};

/**
 * Exclude the given path from the watcher.
 *
 * @param  {string} path
 * @return {Task}
 */
Task.prototype.ignore = function (path) {
  this.watchers.push(('!./' + path).replace('././', './'));

  return this;
};

/**
 * Log the task input and output.
 *
 * @param {string|Array} src
 * @param {string|null}  output
 */
Task.prototype.log = function (src, output) {
  var task = this.name.substr(0, 1).toUpperCase() + this.name.substr(1);

  Eagle.Log
    .heading('Fetching ' + task + ' Source Files...')
    .files(src.path ? src.path : src, true);

  if (output) {
    Eagle.Log
      .heading('Saving To...')
      .files(output.path ? output.path : output);
  }
};

module.exports = function (eagle) {
  // Make Eagle available throughout incoming the Eagle class.
  Eagle = eagle;

  return Task;
};
