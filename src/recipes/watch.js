const { gulp, Eagle, plugins: $ } = global;
const { config, tasks } = Eagle;

gulp.task('watch', ['default'], () => {
  let batchOptions = config.batchOptions;
  let watchOptions = config.watch;

  tasks.forEach(task => {
    if (task.watchers.length) {
      gulp.watch(task.watchers, watchOptions, $.batch(batchOptions, event => {
        event.on('end', gulp.start(task.name));
      }));
    }
  });
});
