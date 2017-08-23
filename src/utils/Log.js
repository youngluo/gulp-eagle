const fs = require('fs');
const { util } = global.plugins;


class Log {
  /**
   * Log a heading to the console.
   *
   * @param  {string} heading
   * @return {Log}
   */
  heading(heading) {
    return this
      .break()
      .message(util.colors.black(util.colors.bgGreen(heading)));
  }

  /**
   * Log a set of files to the console.
   *
   * @param  {string|Array} files
   * @param  {boolean}      checkForFiles
   * @return {Log}
   */
  filesPath(files, checkForFiles) {
    files = Array.isArray(files) ? files : [files];
    const spacer = '   - ';

    files.forEach(file => {
      if (!checkForFiles || this.isFileExist(file)) {
        this.message(spacer + file);
      } else {
        this.message(spacer + util.colors.bgRed(file) + ' <-- Not Found');
      }
    });

    return this.break();
  }

  error(message) {
    return this.break().message(util.colors.bgRed(message));
  }

  message(message) {
    console.log(message);

    return this;
  }

  break() {
    console.log('');

    return this;
  }

  /**
   * Assert that the given file exists.
   *
   * @param  {string} file
   * @return {boolean}
   */
  isFileExist(file) {
    // ignore this file begins with a !
    if (file.indexOf('!') === 0) return true;

    return file.match(/\*/) || fs.existsSync(file);
  }
}

module.exports = Log;
