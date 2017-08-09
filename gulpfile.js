const Eagle = require('./src/index');

Eagle.config.removePath = false;

Eagle(mix => {
  mix
    .sassIn([
      './test-app/*/index.scss',
      './test-app/*/demo.scss'
    ], 'sass')
    .less('./test-app/*/index.less');
});
