const Eagle = require('./src/index');

Eagle.config.removePath = false;
Eagle.config.html.compress.enabled = true;

Eagle(mix => {
  mix
    .sass([
      './test-app/*/index.scss',
      './test-app/*/demo.scss'
    ], 'css')
    .babel('./test-app/babel/index.js', 'js')
    .babelIn('./test-app/babel/*.js', 'js')
    .html('./test-app/index.html')
    .version();
});
