const CssTask = require('../tasks/CssTask');
const { Eagle } = global;
const { GulpPaths, checkOptions } = Eagle;

Eagle.extend('sass', function (src, output, options) {
  new CssTask('sass', getPaths(src, output), checkOptions(options), false);
});

Eagle.extend('sassIn', function (src, output, options) {
  new CssTask('sassIn', getPaths(src, output), checkOptions(options), true);
});

function getPaths(src, output) {
  return new GulpPaths().src(src).output(output, 'app.css');
}
