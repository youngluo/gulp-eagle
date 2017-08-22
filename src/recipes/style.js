const CssTask = require('../tasks/CssTask');
const { Eagle } = global;
const { GulpPaths } = Eagle;

Eagle.extend('style', function (src, output) {
  new CssTask('style', getPaths(src, output));
});

function getPaths(src, output) {
  return new GulpPaths().src(src).output(output, 'app.css');
}
