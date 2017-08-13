const map = require('vinyl-map2');
const CleanCSS = require('clean-css');
const { log, config } = global.Eagle;
const { plugins: $ } = global;

/**
 * Minify the src files.
*/
function minifier(output, taskName) {
  const { extension } = output;

  if (extension === '.css') {
    return minifyCss();
  }

  if (extension === '.js') {
    return minifyJs();
  }

  if (taskName === 'image') {
    return minifyImage();
  }

  log.error('Oops, not sure how to compress this type of file.');
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
  return $.uglify(config.js.uglify.options);
}

/**
 * Minify the image files.
 */
function minifyImage() {
  const { gif, jpg, png, svg } = config.image.options;

  return $.imagemin([
    $.imagemin.gifsicle(gif),
    $.imagemin.jpegtran(jpg),
    $.imagemin.optipng(png),
    $.imagemin.svgo(svg)
  ]);
}

module.exports = minifier;
