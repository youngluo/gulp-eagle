var Eagle = require('./index');

Eagle(function (mix) {
    mix
    //      .browserify('src/app/app.js', 'temp')
    //      .copy('src/base/assets', 'assets')
//        .sass('src/base/**/*.scss', 'css', {
//            removePath: true
//        })
        //        .clean('src/temp')
        //        .image('src/base/assets/images/**/*.{jpg,jpeg,png,gif}', 'assets/images')
        //        .merge('src/base/i18n/cn/*.json', 'i18n/cn.json')
        //        .merge('src/base/i18n/en/*.json', 'i18n/en.json')
        //        .merge('src/base/*/**/*.js', 'base/app.js')
        //        .script('src/base/*/**/*.js')
        .style('build/**/*.css', 'css2')
})