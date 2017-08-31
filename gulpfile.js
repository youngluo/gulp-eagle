const Eagle = require('./src/index');

Eagle.config.removePath = false;

Eagle.define({
  API: 'a.com'
});

Eagle(mix => {
  mix
    // .babel('./test-app/babel/index.js', 'js')
    // .sass('./test-app/sass/index.scss', 'css')
    // .html('./test-app/index.html')
    // .browserSync();
    .rollup('./test-app/rollup/index.js', 'app.js', { output: { sourcemaps: false } });
});
