const JsTask = require('../tasks/JsTask');
const { Eagle } = global;
const { GulpPaths, checkOptions } = Eagle;

Eagle.extend('script', function (src, output, options) {
  new JsTask('script', getPaths(src, output), checkOptions(options));
});

Eagle.extend('scriptIn', function (src, output, options) {
  new JsTask('scriptIn', getPaths(src, output), checkOptions(options), true);
});

Eagle.extend('babel', function (src, output, options) {
  new JsTask('babel', getPaths(src, output), checkOptions(options));
});

Eagle.extend('babelIn', function (src, output, options) {
  new JsTask('babelIn', getPaths(src, output), checkOptions(options), true);
});

function getPaths(src, output) {
  return new GulpPaths().src(src).output(output, 'app.js');
}
