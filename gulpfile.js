var Eagle = require('./index'),

    prod = Eagle.config.production;

Eagle(function (mix) {
    mix
        .clean()
        .html('./src/aaa/index.html')
        .sass('./src/**/*.scss', 'css')
        //.script('./src/**/*.js', 'js')
        //.scriptIn('./src/**/*.js', 'app.js')
        .styleIn('css/*.css', 'app.css')
        //        .copy('./src/assets/fonts', 'assets/fonts')
        //        .image('./src/assets/images', 'assets/images')

    /*if (prod) {
        mix.clean(['css', 'js'])
    }*/
})