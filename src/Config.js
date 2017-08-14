const gutils = require('gulp-util');
const production = gutils.env.prod || false;

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

  html: {
    compress: {
      enabled: false,
      // https://github.com/kangax/html-minifier#options-quick-reference
      options: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      }
    },
    hash: {
      enabled: true,
      // https://www.npmjs.com/package/gulp-rev-hash#custom-options
      options: {
        assetsDir: ''
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
    options: {
      port: 8080,
      startPath: 'index.html'
    },

    // Server baseDir
    baseDir: '',
    notify: {
      enabled: true,
      backgroundColor: '#339966',
      color: '#fff'
    }
  },

  notifications: true,

  cdn: false,

  removePath: true,
};

module.exports = config;
