const CssTask = require('../tasks/CssTask');
const { Eagle } = global;
const { GulpPaths } = Eagle;

Eagle.extend('sass', function (src, output) {
  new CssTask('sass', getPaths(src, output));
});

function getPaths(src, output) {
  return new GulpPaths().src(src).output(output, 'app.css');
}
