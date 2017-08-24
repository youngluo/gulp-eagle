const { gulp, Eagle, plugins: $, _ } = global;
const { config, define } = Eagle;

gulp.task('default', function (cb) {
  define && define();

  let tasks = Eagle.tasks.map(task => task.name);

  if (_.includes(tasks, 'version')) {
    if (config.production) {
      tasks.push('version-replace');
    } else {
      _.pull(tasks, 'version');
    }
  }

  $.sequence.apply(this, tasks)(cb);
});
