const fs = require('fs');
const del = require('del');
const { Task, log } = global.Eagle;
const { gulp } = global;

class VersionTask extends Task {

  constructor(name, paths) {
    super(name, null, paths);

    this.buildPath = this.output.baseDir;

    if (this.src.baseDir === this.buildPath) {
      if (this.src.path.find(path => /\*/.test(path))) {
        log.error(
          'Because you\'ve overridden the "mix.version()" build path ' +
          'to be the same as your source path, you cannot pass a ' +
          'regular expression. Please use full file paths instead.'
        );
      }
    }
  }

  gulpTask($) {
    this.deleteManifestFiles();

    return (
      gulp
        .src(this.src.path)
        .pipe($.rev())
        .pipe(this.updateVersionedPathInFiles($))
        .pipe(gulp.dest(this.buildPath))
        .pipe($.rev.manifest())
        .pipe(this.save(gulp))
    );
  }

  /**
   * Update files to point to the newly versioned file name.
   *
   * @param {Elixir.Plugins} $
   */
  updateVersionedPathInFiles($) {
    let buildFolder = this.buildPath.replace('\\', '/');

    return $.revReplace({ prefix: buildFolder + '/' });
  }


  /**
   * Empty the last files from the build directory.
   */
  deleteFiles(ishash = true) {
    let manifest = `${this.buildPath}/rev-manifest.json`;

    if (!fs.existsSync(manifest)) return;

    manifest = JSON.parse(fs.readFileSync(manifest));

    for (let key in manifest) {
      const path = ishash ? manifest[key] : key;
      del.sync(`${this.buildPath}/${path}`, { force: true });
    }
  }
}

module.exports = VersionTask;
