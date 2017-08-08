const map = require('vinyl-map2');
const CleanCSS = require('clean-css');
const { log, config } = global.Eagle;
const { plugins } = global;

/**
 * Minify the src files.
*/
function minifier(output) {
  switch (output.extension) {
    case '.css':
      return minifyCss();
    case '.js':
      return minifyJs();
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return minifyImage();
    default:
      log.error('Oops, not sure how to compress this type of file.');
  }
}

/**
 * Minify css files.
 */
function minifyCss() {
  return map(buff => {
    return new CleanCSS(config.css.minifier.pluginOptions)
      .minify(buff.toString())
      .styles;
  });
}

/**
 * Minify js files.
 */
function minifyJs() {
  return plugins.uglify(config.js.uglify.options);
}

/**
 * Minify the image files.
 */
function minifyImage() {
  const { plugins, options } = config.image;
  return plugins.imagemin(plugins, options);
}

module.exports = minifier;
