const { gulp, Eagle } = global;
const { GulpPaths, checkOptions, Task } = Eagle;

Eagle.extend('html', function (src, output, options) {
  const paths = new GulpPaths().src(src).output(output, 'index.html');

  new Task('html', function ($, config) {
    const { compress, hash } = config.html;
    console.log(hash.enabled);
    return (
      gulp
        .src(paths.src.path)
        .pipe($.if(hash.enabled, $.revHash(hash.options)))
        .pipe($.if(compress.enabled, this.minify()))
        .pipe(this.removePath(checkOptions(options)))
        .pipe(this.save(gulp))
    );
  }, paths)
    .watch(paths.src.path)
    .ignore(paths.output.path);
});
