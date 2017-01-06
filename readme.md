# Gulp Eagle

## 介绍

Gulp Eagle 是基于 Laravel Elixir 改写的gulp构建工具。

## 使用

	Eagle = require('gulp-eagle')

	Eagle(function (mix) {
	    mix
	        .clean()
	        .sass('./src/**/*.scss', 'css')
	});

## 更新日志

#### version 1.1.0 (2017-1-6)

* 增加压缩html代码功能；

* html文件中可include公共文件。
    


