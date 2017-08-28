const fs = require('fs');
const { Task, config, constants } = global.Eagle;
const { gulp, _ } = global;

let buffer, rollup, buble, vue, source, replace, commonjs, nodeResolve, cache;

class RollupTask extends Task {
  /**
   *
   * @param {string} name
   * @param {object} paths
   * @param {object} rollup config
   */
  constructor(name, paths, options = {}) {
    super(name, null, paths);

    this.options = options;

    this.loadDependencies();

    if (fs.existsSync('rollup.config.js')) {
      this.rollupConfig = require(process.cwd() + '/rollup.config.js');
    }
  }

  gulpTask() {
    return (
      this.rollup()
        .on('error', this.onError())
        .pipe(source(this.output.name))
        .pipe(buffer())
        .pipe(this.initSourceMaps({ loadMaps: true }))
        .pipe(this.minify())
        .on('error', this.onError())
        .pipe(this.writeSourceMaps())
        .pipe(this.save(gulp))
    );
  }

  registerWatchers() {
    this
      .watch(this.src.path)
      .ignore(this.output.path);
  }

  loadDependencies() {
    buffer = require('vinyl-buffer');
    rollup = require('rollup-stream');
    vue = require('rollup-plugin-vue');
    buble = require('rollup-plugin-buble');
    source = require('vinyl-source-stream');
    replace = require('rollup-plugin-replace');
    commonjs = require('rollup-plugin-commonjs');
    nodeResolve = require('rollup-plugin-node-resolve');
  }

  rollup() {
    const defaultPlugins = [
      nodeResolve({ browser: true, main: true, jsnext: true }),
      commonjs({
        exclude: config.buildPath + '/**'
      }),
      replace(constants),
      vue(),
      buble()
    ];

    return rollup(
      _.merge({
        entry: this.src.path,
        cache: cache,
        sourceMap: true,
        format: 'iife',
        plugins: defaultPlugins
      }, this.rollupConfig, this.options)
    )
      .on('bundle', bundle => {
        cache = bundle;
      });
  }
}

module.exports = RollupTask;
