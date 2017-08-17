const { gulp, Eagle } = global;
const { GulpPaths, checkOptions, Task } = Eagle;

Eagle.extend('image', function (src, output, options) {
  const paths = new GulpPaths().src(src).output(output);

  new Task('image', function () {
    return (
      gulp
        .src(paths.src.path)
        .pipe(this.minify())
        .pipe(this.removePath(checkOptions(options)))
        .pipe(this.save(gulp))
    );
  }, paths)
    .watch(paths.src.path)
    .ignore(paths.output.path);
});
