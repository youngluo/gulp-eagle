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

  gulpTask($, config) {
    this.deleteBuildDirectory();

    return (
      gulp
        .src(this.src.path)
        .pipe($.rev())
        .pipe(gulp.dest(this.buildPath))
        .pipe($.rev.manifest())
        .pipe(this.save(gulp))
        .on('end', () => this.dependentTask($, config))
    );
  }

  /**
   * Update files to point to the newly versioned file name.
   */
  updateVersionedPathInFiles($, config) {
    const buildFolder = this.buildPath.replace(config.buildPath, '').replace('\\', '/');
    const path = `/${buildFolder}/`.replace('//', '/');

    return $.revReplace({
      manifest: gulp.src(`${this.buildPath}/rev-manifest.json`),
      prefix: `${config.cdn}${path}`
    });
  }


  /**
   * Empty the last build directory.
   */
  deleteBuildDirectory() {
    del.sync(this.buildPath, { force: true });
  }

  dependentTask($, config) {
    gulp.task('version-replace', () => {
      return (
        gulp
          .src(`${config.buildPath}/**/*.html`)
          .pipe(this.updateVersionedPathInFiles($, config))
          .pipe(gulp.dest(config.buildPath))
      );
    });

    gulp.start('version-replace');
  }
}

module.exports = VersionTask;
