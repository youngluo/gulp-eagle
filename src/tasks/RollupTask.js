const fs = require('fs');
const { Task, config, constants, fail } = global.Eagle;
const { gulp, _ } = global;

let rollup, eagleRollup, babel, replace, commonjs, nodeResolve, cache;

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

    this.exit();

    this.loadDependencies();

    if (fs.existsSync('rollup.config.js')) {
      this.rollupConfig = require(process.cwd() + '/rollup.config.js');
    }
  }

  gulpTask() {
    return (
      gulp
        .src(this.src.path)
        .pipe(this.initSourceMaps())
        .pipe(this.rollup())
        .on('error', this.onError())
        .pipe(this.minify())
        .on('error', this.onError())
        .pipe(this.writeSourceMaps())
        .pipe(this.save(gulp))
    );
  }

  registerWatchers() {
    this
      .watch(this.src.baseDir + '/**/*.{js,vue}')
      .ignore(this.output.path);
  }

  loadDependencies() {
    rollup = require('rollup');
    eagleRollup = require('gulp-eagle-rollup');
    babel = require('rollup-plugin-babel');
    replace = require('rollup-plugin-replace');
    commonjs = require('rollup-plugin-commonjs');
    nodeResolve = require('rollup-plugin-node-resolve');
  }

  rollup() {
    let defaultPlugins = [
      nodeResolve({ browser: true, main: true, jsnext: true }),
      commonjs({
        exclude: config.buildPath + '/**'
      }),
      babel()
    ];

    if (constants && _.isObject(constants)) {
      defaultPlugins.push(replace({
        values: _.mapValues(constants, value => JSON.stringify(value))
      }));
    }

    let options = _.merge({}, this.rollupConfig, this.options);

    // Filter external parameters.
    delete options.cache;
    delete options.rollup;

    if (!options.plugins) {
      options.plugins = defaultPlugins;
    }

    return eagleRollup(
      _.merge({
        rollup: rollup,
        cache: cache,
        output: {
          format: 'iife'
        }
      }, options),
      this.output.name
    )
      .on('bundle', bundle => {
        cache = bundle;
      });
  }

  exit() {
    const { path } = this.src;

    if (Array.isArray(path) || _.includes(path, '*')) {
      fail(`${JSON.stringify(path)}\nThe rollup method can only match a single file.`);
    }
  }
}

module.exports = RollupTask;
