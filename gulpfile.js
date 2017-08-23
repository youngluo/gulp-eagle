const Eagle = require('./src/index');

Eagle.config.removePath = false;

Eagle(mix => {
  mix
    .sass([
      './test-app/*/*.scss',
      './test-app/test.scss'
    ], 'css')
    .babel('./test-app/babel/index.js', 'js')
    .babel('./test-app/babel/*.js', 'js/concat.js')
    .html('./test-app/index.html')
    .browserSync();
});
