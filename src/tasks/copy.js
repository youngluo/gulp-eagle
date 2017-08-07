var gulp = require('gulp'),
  Eagle = require('../index'),
  $ = Eagle.plugins,
  config = Eagle.config;

Eagle.extend('copy', function (src, output, removePath) {
  var paths = new Eagle.GulpPaths().src(src).output(output);

  removePath = typeof removePath === 'boolean' ? removePath : config.removePath;

  new Eagle.Task('copy', function () {
    this.log(paths.src, paths.output);

    return (
      gulp
        .src(paths.src.path)
        .pipe($.if(removePath, $.rename({
          dirname: ''
        })))
        .pipe(gulp.dest(paths.output.baseDir))
    );
  })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});
