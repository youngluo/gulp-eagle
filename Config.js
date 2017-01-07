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

    html: {
        compress: {
            enabled: false,
            //https://github.com/kangax/html-minifier#options-quick-reference
            options: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            }
        },
        include: {
            enabled: true,
            //https://www.npmjs.com/package/gulp-file-include#options
            options: {
                prefix: '@@',
                basepath: '@file'
            }
        }
    },

    css: {

        autoprefix: {
            enabled: true,

            // https://www.npmjs.com/package/gulp-autoprefixer#api
            options: {
                browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4'],
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

    removePath: true,

    version: ['js', 'css', 'png', 'gif', 'jpg', 'jpeg']
};

module.exports = config;