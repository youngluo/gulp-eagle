const p = require('path');
const glob = require('glob');
const parsePath = require('parse-filepath');
const { _, Eagle, plugins } = global;
const { config } = Eagle;
const { util } = plugins;

class GulpPaths {
  /**
   * Set the Gulp src file(s).
   *
   * @param  {string|Array} src
   */
  src(src) {
    this.src = Array.isArray(src) ? { path: src } : this.parse(src);

    return this;
  }

  /**
   * Set the Gulp output path.
   *
   * @param  {string} output
   */
  output(output, defaultName) {
    output = output ? p.join(config.buildPath, output) : config.buildPath;

    this.output = this.parse(output);

    if (!this.output.name && defaultName) {
      const { extension } = this.parse(defaultName);

      // See if we can use the name of the input file for the output name,
      // just as long as we substitute the ext name (.scss => .css).
      if (!Array.isArray(this.src.path) && this.src.name.indexOf('*') === -1) {
        defaultName = this.changeExtension(this.src.name, extension);

        this.output = this.parse(p.join(output, defaultName));
      } else {
        const outputPaths = this.getOutputPath().map(path => {
          path = this.changeExtension(path, extension);

          return p.join(this.output.baseDir, path);
        });

        this.output.path = config.removePath ?
          outputPaths.map(path => p.join(output, this.parse(path).name)) : outputPaths;

        this.output.extension = extension;
      }
    }

    return this;
  }

  getOutputPath() {
    let { path } = this.src;
    path = Array.isArray(path) ? path : [path];

    return _.flatten(
      path.map(src => {
        const base = src.indexOf('*') > -1 ? src.split('*')[0] : this.parse(src).baseDir;

        return glob.sync(src).map(path => p.relative(base, path));
      })
    );
  }

  changeExtension(path, newExtension) {
    return util.replaceExtension(path, newExtension);
  }

  /**
   * Parse the file path.
   *
   * @param  {string} path
   * @return {object}
   */
  parse(path) {
    const segments = parsePath(path);

    return {
      path: path,
      name: segments.extname ? segments.basename : '',
      extension: segments.extname,
      isDir: !segments.extname,
      baseDir: segments.extname ? segments.dirname : p.join(segments.dirname, segments.basename)
    };
  }
}

module.exports = GulpPaths;
