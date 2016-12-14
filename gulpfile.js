var Eagle = require('./index'),
    config = Eagle.config;

//config.browserSync.options.startPath = 'aaa.html';

Eagle(function (mix) {
    mix
        .clean()
        .browserify('./src/app/app.js')
        .html('./src/base/index.html')
});