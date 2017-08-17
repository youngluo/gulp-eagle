const CssTask = require('../tasks/CssTask');
const { Eagle } = global;
const { GulpPaths, checkOptions } = Eagle;

Eagle.extend('style', function (src, output, options) {
  new CssTask('style', getPaths(src, output), checkOptions(options), false);
});

Eagle.extend('styleIn', function (src, output, options) {
  new CssTask('styleIn', getPaths(src, output), checkOptions(options), true);
});

function getPaths(src, output) {
  return new GulpPaths().src(src).output(output, 'app.css');
}
