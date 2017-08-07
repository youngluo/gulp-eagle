const { gulp, plugins, Eagle, _ } = global;
const { includes, intersection, filter } = _;
const { env } = plugins.util;

class GulpBuilder {
  static create(task) {
    const { name } = task.name;

    if (includes(gulp.tasks, name)) return;

    gulp.task(name, () => {
      if (this.shouldRunAllTasks(name)) {
        return filter(Eagle.tasks, { name })
          .forEach(task => {
            task.run();
          });
      }

      return Eagle.Task
        .find({ name, isComplete: false })
        .run();
    });
  }

  shouldRunAllTasks(name) {
    return intersection(env._, [name, 'watch']).length;
  }
}

module.exports = GulpBuilder;
