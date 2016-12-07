var Eagle = require('./index');

Eagle(function (mix) {
    mix
        .clean('build')
        .sass('src/base/*/**/*.scss', 'css', {
            removePath: true
        })
        .script('src/base/*/**/*.js', 'js', {
            removePath: true
        })
        .version('build/**/*.{js,css}', 'version')
})