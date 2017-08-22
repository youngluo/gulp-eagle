const { gulp, Eagle, plugins: $, _ } = global;

gulp.task('default', function (cb) {
  let tasks = Eagle.tasks.map(task => task.name);

  if (_.includes(tasks, 'version')) {
    tasks.push('version-replace');
  }

  $.sequence.apply(this, tasks)(cb);
});
