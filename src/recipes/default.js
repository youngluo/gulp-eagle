const { gulp, Eagle, plugins: $, _ } = global;
const { config } = Eagle;

gulp.task('default', function (cb) {
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
