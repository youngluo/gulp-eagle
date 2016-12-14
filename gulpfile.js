var Eagle = require('./index'),
    config = Eagle.config;

config.browserSync.options.startPath = 'aaa.html';

Eagle(function (mix) {
    mix
        .clean()
        .script('./src/**/*.js', 'js')
        .sass('./src/**/*.scss', 'css')
        .html('./src/**/*.html')
})