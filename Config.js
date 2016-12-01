var p = require('path'),
    gutils = require('gulp-util'),
    production = gutils.env.production;

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
     * After packaging the output path
     */

    buildPath: 'build',

    /**
     * A sourcemap is a JSON mapping, which declares a relationship
     * between a minified file and its original source location.
     * Quite useful for debugging, it's turned on by default.
     */

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
                browsers: ['last 2 versions'],
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
                outputStyle: production ? 'compressed' : 'nested',
                precision: 10
            }
        }

    },

    js: {

        babel: {
            // https://www.npmjs.com/package/gulp-babel#babel-options
            options: {
                presets: ['es2015']
            }
        },

        /**
         * Browserify allows you to pull in Node modules in the browser!
         * Generally a pain to get up and running, Elixir offers many
         * sensible defaults to get you up to speed super quickly.
         */

        browserify: {
            // https://www.npmjs.com/package/browserify#usage
            options: {},

            plugins: [],

            externals: [],

            transformers: [
               /* {
                    name: 'babelify',

                    // https://www.npmjs.com/package/gulp-babel#babel-options
                    options: {
                        presets: ['es2015']
                    }
                },

                {
                    name: 'partialify',

                    // https://www.npmjs.com/package/partialify
                    options: {}
                }*/
            ],

            watchify: {
                enabled: false,

                // https://www.npmjs.com/package/watchify#usage
                options: {}
            }
        }

    },

    /**
     * Browser refresh instantly upon changing a bit
     * of sass or modifying a view or js.
     */

    browserSync: {
        // http://www.browsersync.io/docs/options/
        proxy: 'homestead.app',
        reloadOnRestart: true,
        notify: true
    }

};

module.exports = config;