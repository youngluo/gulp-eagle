var Eagle = require('./index'),
    config = Eagle.config;

config.browserSync.options.startPath = 'aaa.html';

Eagle(function (mix) {
    mix
        .clean()
        .sass('./src/**/*.scss', 'css')
        .script('./src/**/*.js', 'js')
        .html('./src/**/*.html')
})