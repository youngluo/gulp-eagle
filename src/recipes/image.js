const { gulp, Eagle } = global;
const { GulpPaths, Task } = Eagle;

Eagle.extend('image', function (src, output) {
  const paths = new GulpPaths().src(src).output(output);

  new Task('image', function () {
    return (
      gulp
        .src(paths.src.path)
        .pipe(this.minify())
        .pipe(this.removePath())
        .pipe(this.save(gulp))
    );
  }, paths)
    .watch(paths.src.path)
    .ignore(paths.output.path);
});
