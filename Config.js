var p = require('path'),
    gutils = require('gulp-util'),
    production = gutils.env.prod || false;

var config = {

    /**
     * The tasks array stores all tasks that should be executed each
     * time you trigger Gulp from the command line. Generally you
     * won't need to modify this but it's an option if needed.
     */

    tasks: [],

    /**
     * You may "turn on" this mode by triggering "gulp --production".
     * This will enable such things, like CSS and JS minification.
     */

    production: production,

    /**
     * After packaging the output path.
     */

    buildPath: 'build',

    sourcemaps: !production,

    /**
     * You likely won't need to modify this object. That said, should
     * you need to, these settings are exclusive to the watch task.
     * They set the limit and timeout for running batch-updates.
     */

    batchOptions: {
        // https://github.com/floatdrop/gulp-batch#batchoptions-callback-errorhandler
        limit: undefined,
        timeout: 1000
    },

    css: {

        autoprefix: {
            enabled: true,

            // https://www.npmjs.com/package/gulp-autoprefixer#api
            options: {
                browsers: ['last 2 versions', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
                cascade: false
            }
        },

        cssnano: {
            // http://cssnano.co/options
            pluginOptions: {
                safe: true
            }
        },

        sass: {
            // https://github.com/sass/node-sass#options
            pluginOptions: {
                outputStyle: production ? 'compressed' : 'expanded',
                precision: 10
            }
        }

    },

    js: {

        babel: {
            enabled: false,
            // https://www.npmjs.com/package/gulp-babel#babel-options
            options: {
                presets: ['es2015']
            }
        },

        browserify: {
            // https://www.npmjs.com/package/browserify#usage
            options: {},

            plugins: [],

            externals: [],

            transformers: [
                {
                    name: 'babelify',

                    // https://www.npmjs.com/package/gulp-babel#babel-options
                    options: {
                        presets: ['es2015']
                    }
                }
            ],

            watchify: {
                enabled: false,

                // https://www.npmjs.com/package/watchify#usage
                options: {}
            }
        }

    },

    //Browser refresh automatically.

    browserSync: {
        enabled: true,
        options: {
            port: 8080,
            startPath: 'index.html'
        },

        // Server baseDir
        baseDir: '',
    },

    cdn: '',

    version: ['js', 'css', 'png', 'gif', 'jpg', 'jpeg'],

    spa: {
        enabled: false,

        // Support multiple subprojects.
        //multiple: false,

        translate: {
            languages: []
        }
    }
};

module.exports = config;