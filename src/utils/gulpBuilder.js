const { gulp, plugins, Eagle, _ } = global;
const { includes, intersection, filter, find } = _;
const { env } = plugins.util;

class GulpBuilder {
  create(task) {
    const { name } = task;

    if (includes(gulp.tasks, name)) return;

    gulp.task(name, () => {
      if (this.shouldRunAllTasks(name)) {
        return filter(Eagle.tasks, { name })
          .forEach(task => {
            task.run();
          });
      }

      return find(Eagle.tasks, { name, isComplete: false }).run();
    });
  }

  shouldRunAllTasks(name) {
    return intersection(env._, [name, 'watch']).length;
  }
}

module.exports = new GulpBuilder;
