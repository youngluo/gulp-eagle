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
  constructor(name, paths, options) {
    super(name, null, paths);

    this.options = options;
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
    // this
    //   .watch(this.src.path)
    //   .ignore(this.output.path);
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
    if (!config.css.processCssUrls) {
      return this.stream();
    }

    return $.cssProcessor({
      dist: config.buildPath,
      assets: config.buildPath + '/assets'
    });
  }
}

module.exports = CssTask;
