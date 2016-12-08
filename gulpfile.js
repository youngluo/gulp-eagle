var Eagle = require('./index');

Eagle(function (mix) {
    mix
        .clean()
        .sass('./src/base/*/**/*.scss', 'css', {
            removePath: true
        })
        .merge('css/*.css', 'index.css')
        .script('./src/base/*/**/*.js', 'js', {
            removePath: true
        })
        .merge('js/*.js', 'index.js')
        .version('**/*.{js,css}')
        .html('./src/*/index.html', {
            removePath: true
        })
})