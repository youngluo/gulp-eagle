var Eagle = require('./index');

Eagle(function (mix) {
    mix
    /*  .browserify('src/app/app.js', 'temp')
      .copy('src/base/assets', 'assets')*/
    //        .sass('src/base/**/*.scss')
    //        .clean('src/temp')
    //        .image('src/base/assets/images/**/*.{jpg,jpeg,png,gif}', 'assets/images')
    /*  .jsonIn('src/base/i18n/cn/*.json', 'i18n/cn.json')
      .jsonIn('src/base/i18n/en/*.json', 'i18n/en.json')*/
        .script('src/base/*/**/*.js', 'base')
})