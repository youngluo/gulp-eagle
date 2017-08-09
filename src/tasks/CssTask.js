const { Task, config } = global.Eagle;
const { gulp, plugins: $ } = global;

class CssTask extends Task {
  /**
   *
   * @param {string} name
   * @param {object} paths
   * @param {object} options
   * @param {boolen} isConcat Decide whether to concat files
   */
  constructor(name, paths, options, isConcat) {
    super(name, null, paths);
    this.options = options;
    this.isConcat = isConcat;
  }

  gulpTask() {
    return (
      gulp
        .src(this.src.path)
        .pipe(this.initSourceMaps())
        .pipe(this.compile())
        .on('error', this.onError())
        .pipe(this.autoPrefix())
        .pipe(this.minify())
        .pipe($.if(this.isConcat, this.concat()))
        .on('error', this.onError())
        .pipe(this.removePath(this.options))
        .pipe(this.writeSourceMaps())
        .pipe(this.save(gulp))
    );
  }

  compile() {
    return $[this.name](config.css[this.name].pluginOptions);
  }

  autoPrefix() {
    if (!config.css.autoprefix.enabled) {
      return this.stream();
    }

    return $.autoprefixer(config.css.autoprefix.options);
  }
}

module.exports = CssTask;
