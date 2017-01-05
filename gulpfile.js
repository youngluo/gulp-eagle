Eagle = require('./index');

Eagle(function (mix) {
    mix
        .clean()
        .html('./src/aaa/index.html')
        .sass('./src/**/*.scss', 'css')
        .script('./src/**/*.js', 'js')
        .merge('js/*.js', 'app.js')
        .merge('css/*.css', 'app.css')
        .clean(['css', 'js'])
        .copy('./src/assets/fonts', 'assets/fonts')
        .image('./src/assets/images', 'assets/images')
})