# Gulp Eagle

## 简介

Gulp Eagle 是基于 Laravel Elixir 改造的 gulp 构建工具。它提供了简洁的 API ，方便我们快速的使用 gulp 构建前端项目。

## 安装

	npm install --save-dev gulp-eagle

## 使用

	var Eagle = require('gulp-eagle');
	Eagle(function (mix) {
	    mix
	        .sass('./src/**/*.scss', 'css')
            .script('./src/**/*.js, 'js')
	});
    
## 运行

- `gulp`：运行所有任务。
- `gulp watch`：监控前端资源的改变。
- `gulp --prod`：运行所有任务，自动压缩任务中的 css 、js 和图片文件。
    
## API

### sass(src[, output])

The sass method allows you to compile Sass into CSS.

```
mix.sass('./src/**/*.scss', 'css')
```

You may also combine multiple Sass files into a single CSS file By specifying a specific file name.

```
mix.sass('./src/**/*.scss', 'css/app.css')

mix.sass([
  './src/app.scss',
  './src/components/*.scss'
], 'css/app.css')
```

### less(src[, output])

The less method allows you to compile Less into CSS. The usage like the `sass` method above.

### style(src[, output])

If you would just like to combine some plain CSS stylesheets into a single file, you may use the `style` method. The usage like the `sass` method above.
	
### script(src[, output])

The script method allows you to process JavaScript files, which provides automatic source maps, concatenation, and minification.

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

### babel(src[, output])

The babel method allows you to compile ES6 into ES5. And has the function of the above `script` method.

```
mix.babel('./src/js/*.js', 'js')

mix.babel('./src/js/*.js', 'js/app.js')
```
    
### image(src[, output])

The image method may be used to copy image files and directories to new locations. And open image compression in production mode.

```
mix.image('./src/images/**', 'images')
```
    
### html(src[, output])

```
mix.html('./src/**/*.html')
```
    
### copy(src[, output])

```
mix.copy('./src/assets/fonts/**', 'assets/fonts')
```

## 更新日志
    


