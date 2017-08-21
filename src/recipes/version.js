const VersionTask = require('../tasks/VersionTask');
const { Eagle } = global;
const { GulpPaths, config } = Eagle;

Eagle.extend('version', function (buildPath) {
  new VersionTask('version', getPaths(buildPath));
});

function getPaths(buildPath = config.versionFolder) {
  const src = config.buildPath + '/**/*.{js,css}';

  return new GulpPaths().src(src).output(buildPath);
}
