const { gulp, Eagle, plugins } = global;
const { sequence } = plugins;

gulp.task('default', function (cb) {
  const tasks = Eagle.tasks.map(task => task.name);

  sequence.apply(this, tasks)(cb);
});
