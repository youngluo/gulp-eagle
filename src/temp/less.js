const CssTask = require('../tasks/CssTask');
const { Eagle } = global;
const { GulpPaths, checkOptions } = Eagle;

Eagle.extend('less', function (src, output, options) {
  new CssTask('less', getPaths(src, output), checkOptions(options), false);
});

Eagle.extend('lessIn', function (src, output, options) {
  new CssTask('less', getPaths(src, output), checkOptions(options), true);
});

function getPaths(src, output) {
  return new GulpPaths().src(src).output(output, 'app.css');
}

