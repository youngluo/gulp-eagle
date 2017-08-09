const p = require('path');
const parsePath = require('parse-filepath');
const { config } = global.Eagle;
const { util } = global.plugins;

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
      // See if we can use the name of the input file for the output name,
      // just as long as we substitute the ext name (.sass => .css).
      if (!Array.isArray(this.src.path) && this.src.name.indexOf('*') === -1) {
        defaultName = this.changeExtension(
          this.src.name,
          this.parse(defaultName).extension
        );
      }

      this.output = this.parse(p.join(output, defaultName));
    }

    return this;
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
