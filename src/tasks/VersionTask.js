const del = require('del');
const { Task, config } = global.Eagle;
const { gulp, plugins: $ } = global;

class VersionTask extends Task {

  constructor(name, paths) {
    super(name, null, paths);

    this.versionPath = this.output.baseDir;
    this.dependentTask();
  }

  gulpTask() {
    this.deleteBuildDirectory();

    return (
      gulp
        .src(this.src.path)
        .pipe($.rev())
        .pipe(this.save(gulp))
        .pipe($.rev.manifest())
        .pipe(this.save(gulp))
    );
  }

  /**
   * Empty the last build directory.
   */
  deleteBuildDirectory() {
    del.sync(this.versionPath, { force: true });
  }

  /**
   * Update files to point to the newly versioned file name.
   */
  updateVersionedPathInFiles() {
    const versionFolder = this.versionPath.replace(config.buildPath, '').replace('\\', '/');
    const path = `/${versionFolder}/`.replace('//', '/');

    return $.revReplace({
      manifest: gulp.src(`${this.versionPath}/rev-manifest.json`),
      prefix: `${config.cdn}${path}`
    });
  }

  dependentTask() {
    gulp.task('version-replace', () => {
      return (
        gulp
          .src(`${config.buildPath}/**/*.html`)
          .pipe(this.updateVersionedPathInFiles())
          .pipe(this.save(gulp, config.buildPath))
      );
    });
  }
}

module.exports = VersionTask;
