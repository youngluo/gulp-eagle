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
    this.isConcat = isConcat || false;
  }

  gulpTask() {
    return (
      gulp
        .src(this.src.path)
        .pipe(this.initSourceMaps())
        .pipe(this.compile())
        .on('error', this.onError())
        .pipe(this.autoPrefix())
        .pipe(this.processUrls())
        .pipe($.if(this.isConcat, this.concat()))
        .pipe(this.minify())
        .on('error', this.onError())
        .pipe(this.removePath(this.options))
        .pipe(this.writeSourceMaps())
        .pipe(this.save(gulp))
    );
  }

  compile() {
    const name = this.name.replace('In', '');
    const plugin = $[name];

    if (!plugin) {
      return this.stream();
    }

    return plugin(config.css[name].pluginOptions);
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
