const { util } = global.plugins;
const production = util.env.prod || false;

const config = {
  production,

  /**
   * After packaging the output path.
   */
  buildPath: 'dist',

  sourcemaps: !production,

  batchOptions: {
    // https://github.com/floatdrop/gulp-batch#batchoptions-callback-errorhandler
    limit: undefined,
    timeout: 1000
  },

  watch: {
    // https://www.npmjs.com/package/gulp-watch/#options
    interval: 1000,
    usePolling: true
  },

  html: {
    compress: {
      enabled: false,
      // https://github.com/kangax/html-minifier#options-quick-reference
      options: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      }
    }
  },

  css: {
    processCssUrls: true,

    autoprefix: {
      enabled: true,

      // https://www.npmjs.com/package/gulp-autoprefixer#api
      options: {
        browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4'],
        cascade: false
      }
    },

    sass: {
      // https://github.com/sass/node-sass#options
      pluginOptions: {
        outputStyle: 'expanded',
        precision: 10
      }
    },

    less: {
      // https://github.com/plus3network/gulp-less#options
      pluginOptions: {}
    },

    minifier: {
      // https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
      pluginOptions: {}
    }
  },

  js: {
    babel: {
      // https://babeljs.io/docs/usage/api/#options
      pluginOptions: {}
    },

    uglify: {
      options: {
        compress: {
          drop_console: production
        }
      }
    }
  },

  image: {
    // https://www.npmjs.com/package/gulp-imagemin
    options: {
      gif: { interlaced: true },
      png: { optimizationLevel: 5 },
      jpg: { progressive: true },
      svg: { plugins: [{ removeViewBox: false }] }
    }
  },

  // Browser refresh automatically.
  browserSync: {
    // http://www.browsersync.io/docs/options/
    port: 3000,
    reloadOnRestart: true,
    notify: true,
  },

  notifications: true,

  versionFolder: 'build',

  cdn: '',

  removePath: true,
};

module.exports = config;
