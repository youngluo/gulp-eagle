# Gulp Eagle

## 介绍

Gulp Eagle 是基于 Laravel Elixir 改写的gulp构建工具。

## 使用

	Eagle = require('gulp-eagle')

	Eagle(function (mix) {
	    mix
	        .clean()
	        .sass('./src/**/*.scss', 'css')
	        .script('./src/**/*.js', 'js')
	        .image('./src/image', 'image')
	        .html('./src/**/*.html')
	});

##任务



