const { gulp, Eagle } = global;
const { GulpPaths, Task } = Eagle;

Eagle.extend('html', function (src, output) {
  const paths = new GulpPaths().src(src).output(output, 'index.html');

  new Task('html', function ($, config) {
    const { compress } = config.html;

    return (
      gulp
        .src(paths.src.path)
        .pipe($.if(compress.enabled, this.minify()))
        .pipe(this.removePath())
        .pipe(this.save(gulp))
    );
  }, paths)
    .watch(paths.src.path)
    .ignore(paths.output.path);
});
