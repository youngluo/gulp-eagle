const { gulp, Eagle, plugins } = global;
const { config, tasks } = Eagle;

gulp.task('watch', ['default'], () => {
  tasks.forEach(task => {
    let batchOptions = config.batchOptions;
    let watchOptions = config.watch;

    if (task.watchers.length) {
      gulp.watch(task.watchers, watchOptions, plugins.batch(batchOptions, event => {
        event.on('end', gulp.start(task.name));
      }));
    }
  });
});
