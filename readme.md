# Gulp Eagle

[![npm](https://img.shields.io/npm/v/gulp-eagle.svg)](https://www.npmjs.com/package/gulp-eagle)
[![npm](https://img.shields.io/npm/dm/gulp-eagle.svg)](https://www.npmjs.com/package/gulp-eagle)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/youngluo/gulp-eagle/blob/master/LICENSE)

## Introduction

Gulp Eagle is based on [Laravel Elixir](https://github.com/laravel/elixir), which provides a clean, fluent API for defining basic Gulp tasks. I'm sure you'll love it, if you've ever experienced the trouble of defining the gulp task repeatedly.

## Install

```
npm install --save-dev gulp-eagle
```

## Usage

```
var Eagle = require('gulp-eagle')

Eagle(function (mix) {
    mix
        .sass('./src/**/*.scss', 'css')
        .script('./src/**/*.js, 'js')
})
```
    
## Run

- `gulp`: run all tasks.
- `gulp watch`: run all tasks and watching assets for changes.
- `gulp --prod`: run all tasks and minify all CSS, JavaScript and image files.
    
## API

### sass(src, [output])

The `sass` method allows you to compile Sass into CSS.

```
mix.sass('./src/**/*.scss', 'css')
```

You may also combine multiple Sass files into a single CSS file by specifying a specific file name.

```
mix.sass('./src/**/*.scss', 'css/app.css')

mix.sass([
  './src/app.scss',
  './src/components/*.scss'
], 'css/app.css')
```

**By default, Gulp will rewrite and optimize any url() calls within your stylesheets.** Imagine that we want to compile Sass that includes a relative URL to an image:

```
body {
    background: url('../image/img01.jpeg')
}
```

Gulp Eagle will find img01.jpeg, copy it to your `dist/assets` folder, and then rewrite the url() within your generated stylesheet:

```
body {
  background: url('/assets/img01.jpeg?v=592f09d1fd605e1c089031cabe6eced6')
}
```

If you don't need it, you may disable url() rewriting like so:

```
var Eagle = require('gulp-eagle')

Eagle.config.css.processCssUrls.enabled = false
```

### less(src, [output])

The `less` method allows you to compile Less into CSS. The usage like the above `sass` method.

### style(src, [output])

If you would just like to process some plain CSS stylesheets, you may use the `style` method. The usage like the above `sass` method.
	
### script(src, [output])

The `script` method allows you to process JavaScript files, which provides automatic source maps, concatenation, and minification.

```
mix.script('./src/js/*.js', 'js')
```

If you have multiple JavaScript files that you would like to combine into a single file, you can specify a specific file name.

```
mix.script('./src/js/*.js', 'js/app.js')

mix.script([
  './src/js/*.js',
  './src/index.js
], 'js/app.js')
```

### babel(src, [output])

The `babel` method allows you to compile ES6 into ES5. And has the function of the above `script` method.

```
mix.babel('./src/js/*.js', 'js')

mix.babel('./src/js/*.js', 'js/app.js')
```
    
### image(src, [output])

The `image` method may be used to copy Image files and directories to new locations. And turn on Image compression in production mode automatically.

```
mix.image('./src/images/**', 'images')
```
    
### html(src, [output])

The `html` method will copy html files to new locations. 

```
mix.html('./src/**/*.html')
```

You can also turn on HTML compression in production mode：

```
var Eagle = require('gulp-eagle')

Eagle.config.html.compress.enabled = true
```
    
### copy(src, [output])

The `copy` method may be used to copy files and directories to new locations

```
mix.copy('./src/assets/fonts/**', 'assets/fonts')
```

### version(versionPath)

The `version` method accepts a path(default: `config.versionFolder: 'build'`) relative to the output directory（default: `config.buildPath: 'dist'`）. Execute only in production mode.

```
mix.version()
```

### browserSync(options)

The `browserSync` method will automatically refresh your web browser after you make changes to your assets. Which accepts a JavaScript object, See the [BrowserSync](http://www.browsersync.io/docs/options) docs for options. Then, once you run `gulp watch` you may access your web application using port 3000 (http://localhost:3000) to enjoy browser syncing.

```
mix.browserSync()
```

You can set the directory parameter to `true`, If you want to scan the directory structure.

```
mix.browserSync({
  server: {
    directory: true
  }
})
```

### rollup(src, [output], [options])

The `rollup` method supports packaging modules by using [RollupJS](https://rollupjs.org/). **And the `src` parameter must be a single file.**

```
mix.rollup('./test-app/rollup/index.js', 'app.js')
```

You can set the [RollupJS configuration](https://rollupjs.org/#configuration-files) with the `options` parameter, and you can also customize the configuration by `rollup.config.js` in the project root directory.

## ChangeLog

### 2.1.0

- Added `rollup(src, [output], [options])` method.

### 2.0.0

- Added `mix.browserSync(options)`, `mix.version()`, `mix.babel(src, [output])` methods.
- Removed `mix.browserify()`, `mix.clean()`, `mix.*In()` methods.
