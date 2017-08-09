const Eagle = require('./src/index');

Eagle(mix => {
  mix.sass('test-app/index.scss');
  mix.sass('test-app/demo.scss');
});
