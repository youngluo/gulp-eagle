var Eagle = require('./index');

Eagle(function (mix) {
    mix
        .browserify('src/app/app.js', 'temp')
        .copy('src/base/assets', 'assets')
})