const { Eagle, _ } = global;
const { Task, BS } = Eagle;

Eagle.extend('browserSync', function (options) {
  new Task('browserSync', ($, config) => {
    let defaultOptions = {
      server: {
        baseDir: config.buildPath,
        directory: false
      }
    };

    options = _.merge({}, defaultOptions, config.browserSync, options);

    BS.init(options);
  });
});
