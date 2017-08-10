const bs = require('browser-sync').create();
const map = require('vinyl-map2');
const minifier = require('../utils/minifier');
const { _, Eagle, plugins } = global;
const { tasks, config, log: logger } = Eagle;

let id = 0;

class Task {
  constructor(name, gulpTask, paths) {
    this.id = id++;
    this.name = name;
    this.watchers = [];
    this.isComplete = false;
    this.src = paths.src;
    this.output = paths.output;

    if (!this.gulpTask) {
      this.gulpTask = gulpTask;
    }

    return this.register();
  }

  register() {
    tasks.push(this);

    return this;
  }

  run() {
    this.log(this.src, this.output);

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
      if (!Array.isArray(regex)) {
        regex = [regex];
      }
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

  /**
   * Initialize the sourcemaps.
   *
   * @param {object} options
   */
  initSourceMaps(options = {}) {
    if (!config.sourcemaps) {
      return this.stream();
    }

    return plugins.sourcemaps.init(options);
  }

  /**
   * Write to the sourcemaps file.
   */
  writeSourceMaps() {
    if (!config.sourcemaps) {
      return this.stream();
    }

    return plugins.sourcemaps.write('.');
  }

  /**
    * Minify the relevant CSS or JS or image files.
    */
  minify() {
    if (!config.production) {
      return this.stream();
    }

    return minifier(this.output);
  }

  /**
    * concat files.
    */
  concat() {
    return plugins.concat(this.output.name);
  }

  /**
  * Set the destination path.
  */
  save(gulp) {
    return gulp.dest(this.output.baseDir);
  }

  /**
   * remove files path.
   */
  removePath({ removePath }) {
    if (!removePath) {
      return this.stream();
    }

    return plugins.rename({ dirname: '' });
  }

  onError() {
    return e => {
      if (config.notifications) {
        new Eagle.Notification().error(
          e, `${_.capitalize(this.name)} Compilation Failed!`
        );
      }

      this.emit && this.emit('end');
    };
  }

  /**
   * Get a generic stream to return.
   */
  stream() {
    return map(function () { });
  }
}

module.exports = Task;
