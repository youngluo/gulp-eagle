const { Task, config } = global.Eagle;
const { gulp, plugins: $ } = global;

class CssTask extends Task {
  /**
   *
   * @param {string} name
   * @param {object} paths
   */
  constructor(name, paths) {
    super(name, null, paths);
  }

  gulpTask() {
    return (
      gulp
        .src(this.src.path)
        .pipe(this.initSourceMaps())
        .pipe(this.compile())
        .on('error', this.onError())
        .pipe(this.processUrls())
        .pipe(this.autoPrefix())
        .pipe(this.concat())
        .pipe(this.minify())
        .on('error', this.onError())
        .pipe(this.removePath())
        .pipe(this.writeSourceMaps())
        .pipe(this.save(gulp))
    );
  }

  registerWatchers() {
    this
      .watch(this.src.path)
      .ignore(this.output.path);
  }

  compile() {
    const plugin = $[this.name];

    if (!plugin) {
      return this.stream();
    }

    return plugin(config.css[this.name].pluginOptions);
  }

  autoPrefix() {
    if (!config.css.autoprefix.enabled) {
      return this.stream();
    }

    return $.autoprefixer(config.css.autoprefix.options);
  }

  processUrls() {
    const { enabled, options } = config.css.processCssUrls;

    if (!enabled) {
      return this.stream();
    }

    if (!options.prefix && config.cdn) {
      options.prefix = config.cdn;
    }

    return $.cssProcessor(options);
  }
}

module.exports = CssTask;
