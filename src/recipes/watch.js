const { gulp, Eagle, plugins: $, _ } = global;
const { config, tasks } = Eagle;

gulp.task('watch', ['default'], () => {
  let batchOptions = config.batchOptions;
  let watchOptions = config.watch;
  let mergedTasks = {};

  // Merge task watchers, if the task is the same.
  tasks.forEach(task => {
    if (task.name in mergedTasks) {
      return mergedTasks[task.name] = _.union(mergedTasks[task.name], task.watchers);
    }

    mergedTasks[task.name] = task.watchers;
  });

  _.forEach(mergedTasks, (watchers, taskName) => {
    if (watchers.length > 0) {
      $.watch(watchers, watchOptions, $.batch(batchOptions, events => {
        events.on('end', gulp.start(taskName));
      }));
    }
  });
});
