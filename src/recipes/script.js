const JsTask = require('../tasks/JsTask');
const RollupTask = require('../tasks/RollupTask');
const { Eagle } = global;
const { GulpPaths } = Eagle;

Eagle.extend('script', function (src, output) {
  new JsTask('script', getPaths(src, output));
});

Eagle.extend('babel', function (src, output) {
  new JsTask('babel', getPaths(src, output));
});

Eagle.extend('rollup', function (src, output, options) {
  new RollupTask('rollup', getPaths(src, output), options);
});

function getPaths(src, output) {
  return new GulpPaths().src(src).output(output, 'app.js');
}
