const through2 = require('through2');
const { Task, config, constants } = global.Eagle;
const { gulp, plugins: $, _ } = global;

class JsTask extends Task {
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
        .pipe(this.replaceConstants())
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

    return plugin(config.js[this.name].pluginOptions);
  }

  replaceConstants() {
    return through2
      .obj(function (file, enc, callback) {
        let content = file.contents.toString();

        _.forEach(constants, (value, constant) => {
          content = content
            .replace(new RegExp(constant, 'g'), `'${value}'`)
            .replace(/''/g, '\'');
        });

        file.contents = new Buffer(content);

        this.push(file);

        callback();
      });
  }
}

module.exports = JsTask;
