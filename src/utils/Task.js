const { _, Eagle, plugins } = global;
const bs = require('browser-sync').create();
const { tasks, config, log: logger } = Eagle;

let id = 0;

class Task {
  constructor(name, gulpTask, paths) {
    this.id = id++;
    this.name = name;
    this.watchers = [];
    this.isComplete = false;
    this.gulpTask = gulpTask;
    this.paths = paths;

    return this.register();
  }

  register() {
    tasks.push(this);

    return this;
  }

  run() {
    this.log(this.paths.src, this.paths.output);

    let stream = this.gulpTask(plugins, config).on('finish', bs.reload);

    this.isComplete = true;

    return stream;
  }

  /**
   * Log the task input and output.
   */
  log(src, output) {
    logger
      .heading(`Fetching ${_.capitalize(this.name)} Source Files...`)
      .filesPath(src.path || src, true);

    if (output) {
      logger
        .heading('Saving To...')
        .filesPath(output.path || output);
    }
  }

  /**
   * Set a path regex to watch for changes.
   */
  watch(regex) {
    if (regex) {
      this.watchers = _.union(this.watchers, regex);
    }

    return this;
  }

  /**
   * Exclude the given path from the watcher.
   */
  ignore(path) {
    this.watchers.push((`!./${path}`).replace('././', './'));

    return this;
  }
}

module.exports = Task;
