const CssTask = require('../tasks/CssTask');
const { Eagle } = global;
const { GulpPaths } = Eagle;

Eagle.extend('less', function (src, output) {
  new CssTask('less', getPaths(src, output));
});

function getPaths(src, output) {
  return new GulpPaths().src(src).output(output, 'app.css');
}

