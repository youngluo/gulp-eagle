const Eagle = require('./src/index');

Eagle.config.removePath = false;

Eagle(mix => {
  mix
    .sassIn([
      './test-app/*/index.scss',
      './test-app/*/demo.scss'
    ], 'sass')
    .less('./test-app/*/index.less')
    .less('./test-app/*/demo.less')
    .style('./test-app/*/index.css')
    .styleIn('./test-app/style/*.css', 'style/style.css')
    .babel('./test-app/babel/index.js', 'babel')
    .babelIn('./test-app/babel/*.js', 'babel')
    .copy('./test-app/js/index.js', 'copy/copy.js');
});
