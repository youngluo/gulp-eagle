var Eagle = require('./index'),
    config = Eagle.config;

config.browserSync.options.startPath = 'aaa.html';

Eagle(function (mix) {
    mix
        .clean()
        .sass('./src/**/*.scss', 'css', {
            removePath: true
        })
        //.merge('**/*.css', 'index.css')
        .script('./src/**/*.js', 'js', {
            removePath: true
        })
        // .merge('**/*.js', 'index.js')
        .version('**/*.{js,css}')
        .html('./src/**/*.html', {
            removePath: true
        })
})