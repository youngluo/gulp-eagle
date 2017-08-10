const { gulp, Eagle } = global;
const { GulpPaths, checkOptions, Task } = Eagle;

Eagle.extend('copy', function (src, output, options) {
  const paths = new GulpPaths().src(src).output(output);

  new Task('copy', function ($) {
    return (
      gulp
        .src(paths.src.path, { dot: true })
        .pipe($.if(!paths.output.isDir, $.rename(paths.output.name)))
        .pipe(this.removePath(checkOptions(options)))
        .pipe(this.save(gulp))
    );
  }, paths)
    .watch(paths.src.path)
    .ignore(paths.output.path);
});
