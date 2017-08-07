var gulp = require('gulp'),
  Eagle = require('../index'),
  $ = Eagle.plugins,
  config = Eagle.config;

Eagle.extend('sass', function (src, output, removePath) {
  var paths = new Eagle.GulpPaths().src(src).output(output);

  removePath = typeof removePath === 'boolean' ? removePath : config.removePath;

  new Eagle.Task('sass', function () {
    return gulpTask.call(this, paths)
      .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
      .pipe($.if(removePath, $.rename({
        dirname: ''
      })))
      .pipe(gulp.dest(paths.output.baseDir))
  })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});

Eagle.extend('sassIn', function (src, output) {
  var paths = new Eagle.GulpPaths().src(src).output(output);

  new Eagle.Task('sassIn', function () {
    return gulpTask.call(this, paths)
      .pipe($.concat(paths.output.name))
      .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
      .pipe(gulp.dest(paths.output.baseDir))
  })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});

function gulpTask(paths) {
  this.log(paths.src, paths.output);

  return (
    gulp.src(paths.src.path)
      .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
      .pipe($.sass(config.css.sass.pluginOptions))
      .on('error', function (e) {
        new Eagle.Notification().error(e, 'Sass Compile Failed');
        this.emit('end');
      })
      .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
  )
}
