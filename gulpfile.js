var Eagle = require('./index');

Eagle(function (mix) {
    mix
    /*  .browserify('src/app/app.js', 'temp')
      .copy('src/base/assets', 'assets')*/
    //        .sass('src/base/**/*.scss')
    //        .clean('src/temp')
    //        .image('src/base/assets/images/**/*.{jpg,jpeg,png,gif}', 'assets/images')
        .jsonIn('src/base/i18n/**/*.json', 'i18n')
})