const { gulp, Eagle } = global;
const { Task } = Eagle;

Eagle.extend('task', function (name, watcher) {
  const task = new Task('task', () => gulp.start(name));

  watcher && task.watch(watcher);
});
