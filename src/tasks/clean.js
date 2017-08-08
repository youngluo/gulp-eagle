var gulp = require('gulp'),
  Eagle = require('../index'),

  $ = Eagle.plugins,
  config = Eagle.config;

Eagle.extend('clean', function (src) {
  src = src || config.buildPath;

  var paths = new Eagle.GulpPaths().src(src).src.path;

  src = Array.isArray(paths) ? paths.map(removeWildcard) : removeWildcard(paths);

  new Eagle.Task('clean', function () {
    this.log(src);

    return (
      gulp
        .src(src)
        .pipe($.rimraf())
    );
  });
});


function removeWildcard(path) {
  return path.replace('/**/*', '');
}
