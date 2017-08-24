const Eagle = require('./src/index');

Eagle.config.removePath = false;

Eagle(mix => {
  mix
    .babel('./test-app/babel/index.js', 'js')
    .sass('./test-app/sass/index.scss', 'css');
});
